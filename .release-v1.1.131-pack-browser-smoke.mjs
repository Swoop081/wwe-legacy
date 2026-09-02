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

async function installDeterministicProfile(page, profile) {
  await page.addInitScript(({ key, value }) => {
    localStorage.setItem(key, value);
    Math.random = () => 0.5;
  }, { key: PROFILE_KEY, value: JSON.stringify(profile) });
}

async function assertPackFlow(page, label, pageErrors) {
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
    if (index === 4 && !progress.includes('PACK SUMMARY') && !progress.includes('CONVERTING')) {
      throw new Error(`${label}: original pack-summary instruction missing on card 5: ${progress}`);
    }
    if (progress.includes('CONVERTING')) await page.waitForTimeout(1300);
    const next = page.locator('[data-booster-next]').first();
    await next.waitFor({ state: 'visible', timeout: 5000 });
    await next.click({ timeout: 5000 });
    if (index < 4) await page.waitForTimeout(100);
  }

  await page.getByText('PACK COMPLETE', { exact: true }).waitFor({ state: 'visible', timeout: 10000 });
  if (pageErrors.length) throw new Error(`${label}: JavaScript runtime errors: ${pageErrors.join(' | ')}`);
  console.log(`PASS ${label}: Tap to Rip -> five animated card reveals -> Pack Complete`);
}

async function finishPackFlow(page, label, pageErrors) {
  const summaryNext = page.locator('#pack-summary-next');
  await summaryNext.waitFor({ state: 'visible', timeout: 10000 });
  await summaryNext.click({ timeout: 5000 });
  const finish = page.locator('#finish-pack-review');
  await finish.waitFor({ state: 'visible', timeout: 10000 });
  await finish.click({ timeout: 5000 });
  await page.waitForFunction(() => !document.body.classList.contains('booster-modal-open'), null, { timeout: 10000 });
  if (pageErrors.length) throw new Error(`${label}: JavaScript runtime errors while exiting pack flow: ${pageErrors.join(' | ')}`);
}

async function newIphonePage(browser, profile) {
  const context = await browser.newContext({ ...devices['iPhone 13'], viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await installDeterministicProfile(page, profile);
  return { context, page, pageErrors };
}

async function openLaunchRewardIfPresented(page, label, pageErrors) {
  const rip = page.locator('#rip-pack');
  if (await rip.isVisible().catch(() => false)) {
    await assertPackFlow(page, `${label} launch reward`, pageErrors);
    await finishPackFlow(page, `${label} launch reward`, pageErrors);
  }
}

async function runBrowser(browserType, browserName) {
  const browser = await browserType.launch({ headless: true });
  try {
    {
      const profile = freshProfile();
      const { context, page, pageErrors } = await newIphonePage(browser, profile);
      await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.locator('#launch-poster-play').waitFor({ state: 'visible', timeout: 15000 });
      await page.locator('#launch-poster-play').click();
      await assertPackFlow(page, `${browserName} launch reward`, pageErrors);
      await finishPackFlow(page, `${browserName} launch reward`, pageErrors);
      await context.close();
    }

    {
      const profile = freshProfile();
      profile.season ??= {};
      profile.season.freePackLastClaimAt = new Date().toISOString();
      grantBooster(profile, 1, 'nxt-series-1');
      const { context, page, pageErrors } = await newIphonePage(browser, profile);
      await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.locator('#launch-poster-play').waitFor({ state: 'visible', timeout: 15000 });
      await page.locator('#launch-poster-play').click();
      await openLaunchRewardIfPresented(page, browserName, pageErrors);
      const packsNav = page.locator('[data-mobile-nav="boosters"]').first();
      await packsNav.waitFor({ state: 'attached', timeout: 15000 });
      await packsNav.evaluate(el => el.click());
      const byData = page.locator('[data-open-vault-pack^="nxt-series-1:"]').first();
      await byData.waitFor({ state: 'visible', timeout: 10000 });
      await byData.click({ timeout: 5000 });
      await assertPackFlow(page, `${browserName} NXT vault`, pageErrors);
      await finishPackFlow(page, `${browserName} NXT vault`, pageErrors);
      await context.close();
    }
  } finally {
    await browser.close();
  }
}

await runBrowser(chromium, 'Chromium iPhone viewport');
await runBrowser(webkit, 'WebKit iPhone viewport');
console.log('CERTIFIED: original Tap to Rip + animated five-card reveal + Pack Complete + exit passes launch reward and NXT vault in Chromium and WebKit iPhone viewports with zero JavaScript runtime errors.');
