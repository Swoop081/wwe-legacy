// v1.1.178 — reliable Championship Road Superstar selection before entering the road.
let allowDetail = false;
let selectorOpen = false;

function buildSelector(screen){
  if(!screen || selectorOpen || allowDetail) return;
  const originalButtons=[...screen.querySelectorAll('.champ-superstar-road[data-champ-superstar]')];
  if(!originalButtons.length) return;
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
  selector.innerHTML=`<header class="champ-select-header"><span>CHAMPIONSHIP ROAD</span><h1>CHOOSE YOUR<br>SUPERSTAR</h1><p>Every unlocked Superstar has their own saved Championship Road progress.</p></header><div class="champ-select-grid">${cards}</div><button type="button" class="champ-select-back">‹ BACK TO PLAY</button>`;
  screen.parentElement?.insertBefore(selector,screen);

  selector.querySelectorAll('[data-champ-select-pick]').forEach(choice=>choice.addEventListener('click',()=>{
    const target=screen.querySelector(`.champ-superstar-road[data-champ-superstar="${choice.dataset.champSelectPick}"]`);
    if(!target) return;
    allowDetail=true;
    selectorOpen=false;
    target.click();
  }));
  selector.querySelector('.champ-select-back')?.addEventListener('click',()=>{
    allowDetail=false;
    selectorOpen=false;
    document.querySelector('[data-mobile-nav="play-menu"]')?.click();
  });
}

function apply(root=document){
  const screen=root.matches?.('.championship-map-screen')?root:root.querySelector?.('.championship-map-screen');
  if(!screen) return;
  if(allowDetail){
    screen.classList.remove('champ-detail-hidden-for-select');
    screen.querySelector('.champ-superstar-roads')?.classList.add('champ-superstar-roads-detail-hidden');
    document.querySelector('.championship-superstar-select')?.remove();
    return;
  }
  buildSelector(screen);
}

// Any fresh entry from the Play menu must show the selector first.
document.addEventListener('click',event=>{
  if(event.target.closest?.('#play-championship')){
    allowDetail=false;
    selectorOpen=false;
  } else if(event.target.closest?.('[data-mobile-nav]')){
    // Leaving Championship Road resets the entry gate so the next visit selects again.
    allowDetail=false;
    selectorOpen=false;
  }
},true);

const start=()=>{
  apply(document);
  new MutationObserver(records=>{
    for(const record of records){
      for(const node of record.addedNodes){
        if(node.nodeType===1) apply(node);
      }
    }
  }).observe(document.documentElement,{childList:true,subtree:true});
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
