// WWE Legacy v1.1.48 animation layout hotfix.
// Keeps the approved Card Studio base-plate plaque visible while masking only the artwork bay.
(function(){
  "use strict";
  if(typeof document==="undefined"||document.getElementById("wwe-v1148-animation-layering-hotfix"))return;
  const style=document.createElement("style");
  style.id="wwe-v1148-animation-layering-hotfix";
  style.textContent=`
    .ccg-card.has-active-animation .ccg-animated-set-background{
      left:4.8%!important;right:4.8%!important;top:4.8%!important;bottom:22.8%!important;
      border-radius:0!important;overflow:hidden!important;z-index:2!important;
    }
    .ccg-card.type-move.has-active-animation .ccg-animated-set-background{bottom:26%!important}
    .ccg-card.type-superstar.has-active-animation .ccg-animated-set-background,
    .ccg-card.type-entrance.has-active-animation .ccg-animated-set-background,
    .ccg-card.type-action.has-active-animation .ccg-animated-set-background,
    .ccg-card.type-manager.has-active-animation .ccg-animated-set-background,
    .ccg-card.type-variant.has-active-animation .ccg-animated-set-background,
    .ccg-card.type-merch.has-active-animation .ccg-animated-set-background{bottom:22.8%!important}
    .ccg-card.has-active-animation .ccg-animated-card-surface{
      left:4.8%!important;right:4.8%!important;top:4.8%!important;bottom:22.8%!important;
      display:grid!important;place-items:center!important;overflow:hidden!important;
      background:transparent!important;border-radius:0!important;clip-path:none!important;
      -webkit-clip-path:none!important;z-index:3!important;
    }
    .ccg-card.type-move.has-active-animation .ccg-animated-card-surface{bottom:26%!important}
    .ccg-card.has-active-animation .ccg-animated-card-plate{
      position:relative!important;inset:auto!important;width:100%!important;height:100%!important;
      max-width:100%!important;max-height:100%!important;object-fit:contain!important;
      object-position:center center!important;opacity:1!important;border-radius:0!important;background:transparent!important;
    }
    .ccg-card.has-active-animation .ccg-card-studio-ink{z-index:4!important}
    .ccg-card.has-active-animation .ccg-animated-set-logo{display:block!important;z-index:5!important}
  `;
  document.head.appendChild(style);
})();
