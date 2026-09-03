// v1.1.179 — self-healing Championship Road Superstar selector routing.
let allowDetail = false;
let selectorOpen = false;
let lastPlayChampionshipAt = 0;

function detailScreen(){ return document.querySelector('.championship-map-screen'); }
function selectorScreen(){ return document.querySelector('.championship-superstar-select'); }

function buildSelector(screen){
  if(!screen || selectorOpen || allowDetail) return false;
  const originalButtons=[...screen.querySelectorAll('.champ-superstar-road[data-champ-superstar]')];
  if(!originalButtons.length) return false;

  selectorScreen()?.remove();
  selectorOpen=true;
  screen.classList.add('champ-detail-hidden-for-select');

  const cards=originalButtons.map(btn=>{
    const id=btn.dataset.champSuperstar;
    const name=btn.querySelector('strong')?.textContent?.trim()||id;
    const progress=btn.querySelector('span')?.textContent?.trim()||'0/72';
    const status=btn.querySelector('small')?.textContent?.trim()||'NEW ROAD';
    return `<button type="button" class="champ-select-card" data-champ-select-pick="${id}"><span class="champ-select-name">${name}</span><b>${progress}</b><small>${status}</small><i>SELECT ›</i></button>`;
  }).join('');

  const selector=document.createElement('section');
  selector.className='championship-superstar-select premium-screen';
  selector.innerHTML=`<header class="champ-select-header"><span>CHAMPIONSHIP ROAD</span><h1>CHOOSE YOUR<br>SUPERSTAR</h1><p>Choose from your unlocked roster. Every Superstar keeps separate Championship Road progress.</p></header><div class="champ-select-grid">${cards}</div><button type="button" class="champ-select-back">‹ BACK TO PLAY</button>`;
  screen.parentElement?.insertBefore(selector,screen);

  selector.querySelectorAll('[data-champ-select-pick]').forEach(choice=>choice.addEventListener('click',()=>{
    const id=choice.dataset.champSelectPick;
    const target=screen.querySelector(`.champ-superstar-road[data-champ-superstar="${id}"]`);
    if(!target) return;
    allowDetail=true;
    selectorOpen=false;
    selector.remove();
    screen.classList.remove('champ-detail-hidden-for-select');
    screen.querySelector('.champ-superstar-roads')?.classList.add('champ-superstar-roads-detail-hidden');
    target.click();
    requestAnimationFrame(()=>reconcile());
  }));

  selector.querySelector('.champ-select-back')?.addEventListener('click',()=>{
    allowDetail=false;
    selectorOpen=false;
    selector.remove();
    document.querySelector('[data-mobile-nav="play-menu"]')?.click();
  });
  window.scrollTo(0,0);
  return true;
}

function reconcile(){
  const screen=detailScreen();
  if(!screen){
    selectorOpen=false;
    return;
  }
  if(allowDetail){
    screen.classList.remove('champ-detail-hidden-for-select');
    screen.querySelector('.champ-superstar-roads')?.classList.add('champ-superstar-roads-detail-hidden');
    selectorScreen()?.remove();
    return;
  }
  buildSelector(screen);
}

// Capture the actual Play-card activation before app.js replaces the Play screen.
document.addEventListener('click',event=>{
  if(event.target.closest?.('#play-championship')){
    lastPlayChampionshipAt=Date.now();
    allowDetail=false;
    selectorOpen=false;
    queueMicrotask(()=>reconcile());
    requestAnimationFrame(()=>reconcile());
    setTimeout(reconcile,0);
    setTimeout(reconcile,60);
  } else if(event.target.closest?.('[data-mobile-nav]')){
    allowDetail=false;
    selectorOpen=false;
  }
},true);

const observer=new MutationObserver(()=>reconcile());
observer.observe(document.documentElement,{childList:true,subtree:true});

// iOS Safari safety net: DOM replacement order from the large app module can vary.
// While Championship Road is visible, keep the entry gate reconciled.
setInterval(()=>{
  if(detailScreen()) reconcile();
  else if(Date.now()-lastPlayChampionshipAt>1500) selectorOpen=false;
},150);

reconcile();
