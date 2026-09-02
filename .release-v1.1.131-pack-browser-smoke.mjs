import { chromium, webkit, devices } from 'playwright';
import { createProfile } from './js/data/profile.js';
import { grantBooster } from './js/data/boosters.js';

const BASE = 'http://127.0.0.1:4173/wwe-legacy/?build=1.1.131';
const PROFILE_KEY = 'wa-modern-profile-v3';
const starters = ['liv-morgan','rhea-ripley','kendal-grey'];

function freshProfile() {
  const profile = createProfile(starters);
  if (!profile) throw new Error('Unable to create browser-smoke profile');
  return profile;
}

async function assertPackFlow(page, label) {
  const errors = [];
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(`console: ${msg.text()}`); });

  const rip = page.locator('#rip-pack');
  await rip.waitFor({ state: 'visible', timeout: 15000 });
  const ripText = (await rip.innerText()).replace(/\s+/g, ' ').trim();
  if (!ripText.includes('TAP TO RIP') || !ripText.includes('Open the pack and reveal all five cards')) {
    throw new Error(`${label}: original sealed-pack copy missing: ${ripText}`);
  }

  await rip.click({ timeout: 5000 });
  await page.locator('.sealed-pack-stage.is-ripping').waitFor({ state: 'attached', timeout: 1500 }).catch(() => {});
  await page.locator('.single-card-reveal-stage').waitFor({ state: 'visible', timeout: 15000 });
  await page.waitForTimeout(1400);

  for (let index = 0; index < 5; index += 1) {
    const expected = `CARD ${index + 1} OF 5`;
    await page.locator('.booster-card-progress span').filter({ hasText: expected }).waitFor({ state: 'visible', timeout: 10000 });
    const progress = (await page.locator('.reveal-progress').innerText()).trim();
    if (index < 4 && !progress.includes('NEXT CARD') && !progress.includes('CONVERTING')) {
      throw new Error(`${label}: original reveal instruction missing on card ${index + 1}: ${progress}`);
    }
    if (progress.includes('CONVERTING')) await page.waitForTimeout(1300);
    const next = page.locator('[data-booster-next]').first();
    await next.waitFor({ state: 'visible', timeout: 5000 });
    await next.click({ timeout: 5000 });
    if (index < 4) await page.waitForTimeout(100);
  }

  await page.getByText('PACK COMPLETE', { exact: true }).waitFor({ state: 'visible', timeout: 10000 });
  if (errors.length) throw new Error(`${label}: browser errors: ${errors.join(' | ')}`);
}

async function runBrowser(browserType, browserName) {
  const browser = await browserType.launch({ headless: true });
  try {
    // Test the launch-poster daily reward path that originally exposed the freeze.
    {
      const profile = freshProfile();
      const context = await browser.newContext({ ...devices['iPhone 13'], viewport: { width: 390, height: 844 } });
      const page = await context.newPage();
      await page.addInitScript(({ key, value }) => localStorage.setItem(key, value), { key: PROFILE_KEY, value: JSON.stringify(profile) });
      await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.locator('#launch-poster-play').waitFor({ state: 'visible', timeout: 15000 });
      await page.locator('#launch-poster-play').click();
      await assertPackFlow(page, `${browserName} launch reward`);
      await context.close();
    }

    // Test a normal NXT reward booster from the Packs vault.
    {
      const profile = freshProfile();
      profile.season ??= {};
      profile.season.freePackLastClaimAt = new Date().toISOString();
      grantBooster(profile, 1, 'nxt-series-1');
      const context = await browser.newContext({ ...devices['iPhone 13'], viewport: { width: 390, height: 844 } });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
      await page.addInitScript(({ key, value }) => localStorage.setItem(key, value), { key: PROFILE_KEY, value: JSON.stringify(profile) });
      await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.locator('#launch-poster-play').waitFor({ state: 'visible', timeout: 15000 });
      await page.locator('#launch-poster-play').click();
      await page.locator('[data-mobile-nav="boosters"]').waitFor({ state: 'visible', timeout: 15000 });
      await page.locator('[data-mobile-nav="boosters"]').click();
      const nxtPack = page.locator('[data-open-vault-pack]').filter({ has: page.locator('text=NXT') }).first();
      if (await nxtPack.count()) {
        await nxtPack.click();
      } else {
        const byData = page.locator('[data-open-vault-pack^="nxt-series-1:"]').first();
        await byData.waitFor({ state: 'visible', timeout: 10000 });
        await byData.click();
      }
      await assertPackFlow(page, `${browserName} NXT vault`);
      if (errors.length) throw new Error(`${browserName} NXT vault errors: ${errors.join(' | ')}`);
      await context.close();
    }
  } finally {
    await browser.close();
  }
}

await runBrowser(chromium, 'Chromium iPhone viewport');
await runBrowser(webkit, 'WebKit iPhone viewport');
console.log('Pack browser certification passed: original Tap to Rip + animated five-card reveal works in Chromium and WebKit iPhone viewports.');
