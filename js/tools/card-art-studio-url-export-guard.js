// WWE Legacy Card Art Studio — production URL export safety v1.1.206
(() => {
  const cleanText = value => String(value || '').replace(/Darby[’']s\s+/gi,'').replace(/Darby\s*·\s*/gi,'').replace(/\bDarby\b/gi,'');
  const scrub = root => { if(!root)return; const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n=[]; while(w.nextNode())n.push(w.currentNode); for(const x of n){const v=cleanText(x.nodeValue);if(v!==x.nodeValue)x.nodeValue=v;} };
  scrub(document.body);
  new MutationObserver(rs=>{for(const r of rs){if(r.type==='characterData'){const v=cleanText(r.target.nodeValue);if(v!==r.target.nodeValue)r.target.nodeValue=v;}for(const n of r.addedNodes||[]){if(n.nodeType===Node.TEXT_NODE){const v=cleanText(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v;}else if(n.nodeType===Node.ELEMENT_NODE)scrub(n);}}}).observe(document.body,{subtree:true,childList:true,characterData:true});

  // Hard export-safety boundary: a remote HTMLImageElement must never be drawn
  // into the Studio canvas. URL artwork below is first converted to a local
  // blob/File, while normal templates/logos already use same-origin paths.
  const nativeDrawImage=CanvasRenderingContext2D.prototype.drawImage;
  CanvasRenderingContext2D.prototype.drawImage=function(source,...args){
    try{
      if(source instanceof HTMLImageElement){
        const src=String(source.currentSrc||source.src||'');
        if(/^https?:/i.test(src)){
          const u=new URL(src,location.href);
          if(u.origin!==location.origin){
            console.warn('[Card Studio] blocked cross-origin canvas layer',src);
            return;
          }
        }
      }
    }catch(error){console.warn('[Card Studio] image safety check',error);}
    return nativeDrawImage.call(this,source,...args);
  };

  const urlInput=document.getElementById('art-url'),loadButton=document.getElementById('load-art-url'),fileInput=document.getElementById('art-file'),urlStatus=document.getElementById('url-status');
  const setStatus=(text,state='')=>{if(!urlStatus)return;urlStatus.textContent=text;if(state)urlStatus.dataset.exportSafety=state;};
  const proxyCandidates=sourceUrl=>{const raw=String(sourceUrl||'').trim(),noScheme=raw.replace(/^https?:\/\//i,'');return [`https://images.weserv.nl/?url=${encodeURIComponent(noScheme)}&output=webp`,`https://images.weserv.nl/?url=${encodeURIComponent(raw)}&output=webp`];};
  async function fetchExportSafeBlob(sourceUrl){let lastError=null;for(const proxyUrl of proxyCandidates(sourceUrl)){try{const response=await fetch(proxyUrl,{mode:'cors',credentials:'omit',cache:'no-store'});if(!response.ok)throw new Error(`proxy HTTP ${response.status}`);const blob=await response.blob();if(!blob.size||!String(blob.type||'').startsWith('image/'))throw new Error('proxy did not return an image');return blob;}catch(error){lastError=error;}}throw lastError||new Error('URL artwork proxy failed');}
  async function loadUrlAsLocalArtwork(event){const sourceUrl=String(urlInput?.value||'').trim();if(!/^https?:\/\//i.test(sourceUrl)||!fileInput)return;event.preventDefault();event.stopImmediatePropagation();loadButton.disabled=true;setStatus('Preparing URL artwork for export…','checking');try{const blob=await fetchExportSafeBlob(sourceUrl),file=new File([blob],`url-artwork-${Date.now()}.webp`,{type:blob.type||'image/webp'}),transfer=new DataTransfer();transfer.items.add(file);fileInput.files=transfer.files;fileInput.dispatchEvent(new Event('change',{bubbles:true}));setStatus('URL artwork loaded as an export-safe local copy.','safe');}catch(error){console.error('[Card Studio] URL artwork proxy failed',error);setStatus('URL artwork could not be converted for export. Try the URL again or choose the image file directly.','error');}finally{loadButton.disabled=false;}}
  if(urlInput&&loadButton&&fileInput)loadButton.addEventListener('click',loadUrlAsLocalArtwork,true);
  globalThis.WWE_LEGACY_CARD_STUDIO_PRODUCTION_HOTFIX=Object.freeze({version:'1.1.206',urlArtworkConvertedToLocalBlob:true,crossOriginCanvasLayersBlocked:true,personalWorkflowNamesRemoved:true});
})();
