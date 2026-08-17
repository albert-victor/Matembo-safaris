import{l as H}from"./scroll-reveal-BxdqyS58.js";import{syncCarouselCardMotion as W}from"./card-motion-gKtUt7p7.js";function D(s,n,e){for(let i=n;i<Math.min(n+e,s.length);i++)H(s[i],{priority:i===n});W(s,n,e)}function Y(s){const n=Number(s.dataset.visible)||3;return window.matchMedia("(min-width: 1200px)").matches?n:window.matchMedia("(min-width: 768px)").matches?Math.min(2,n):1}function R(s=document){if(!(s!=null&&s.querySelectorAll))return;const n=window.matchMedia("(prefers-reduced-motion: reduce)").matches;s.querySelectorAll("[data-autoslider]").forEach(e=>{if(e.dataset.autosliderInit==="true")return;e.dataset.autosliderInit="true";const i=e.querySelector("[data-autoslider-track]"),o=e.querySelector("[data-autoslider-dots]"),m=e.querySelector("[data-autoslider-count]"),b=e.querySelector("[data-autoslider-prev]"),y=e.querySelector("[data-autoslider-next]"),l=i?[...i.children]:[];if(!l.length)return;let a=0,p=1,c=0,L=null,S=!1,$=!1,w=null,f=null,x=!0,g=0;const X=Number(e.dataset.autoplay||5e3),N=Number(e.dataset.autoplayDelay||600),O=42,A=()=>{p=Y(e),c=Math.max(0,l.length-p),a>c&&(a=0),i.style.setProperty("--autoslider-visible",String(p))},z=()=>{var d;if(g&&S)return g*a;const t=parseFloat(getComputedStyle(i).gap)||16;return g=(((d=l[0])==null?void 0:d.getBoundingClientRect().width)||0)+t,a*g},P=()=>{o==null||o.querySelectorAll("[data-autoslider-dot]").forEach(t=>{t.addEventListener("click",()=>{_(Number(t.dataset.autosliderDot)),E()})})},q=()=>{if(!o)return;const t=c+1,r=[...o.querySelectorAll("[data-autoslider-dot]")];if(r.length!==t){o.innerHTML=Array.from({length:t},(d,u)=>`
        <button
          type="button"
          class="autoslider__dot ${u===a?"is-active":""}"
          data-autoslider-dot="${u}"
          role="tab"
          aria-selected="${u===a?"true":"false"}"
          aria-label="Go to slide ${u+1}"
        ></button>
      `).join(""),P();return}r.forEach((d,u)=>{const C=u===a;d.classList.toggle("is-active",C),d.setAttribute("aria-selected",C?"true":"false")})},V=()=>{if(!m)return;const t=a+1,r=Math.min(a+p,l.length);m.textContent=`${t}–${r} of ${l.length}`},_=t=>{a=(t%(c+1)+(c+1))%(c+1),$=!0,e.classList.add("is-advancing"),i.style.transform=`translate3d(-${z()}px, 0, 0)`,o==null||o.querySelectorAll("[data-autoslider-dot]").forEach((r,d)=>{const u=d===a;r.classList.toggle("is-active",u),r.setAttribute("aria-selected",u?"true":"false")}),V(),D(l,a,p),window.setTimeout(()=>{$=!1,e.classList.remove("is-advancing")},320)},F=()=>{g=0,A(),q(),S&&requestAnimationFrame(()=>_(a))};let I=null;const T=()=>{clearTimeout(I),I=window.setTimeout(()=>{F()},120)},M=()=>_(a+1),k=()=>_(a-1),v=()=>{L&&(clearInterval(L),L=null)},h=()=>{n||c<=0||!x||(v(),L=setInterval(M,X))},E=()=>{v(),h()};b==null||b.addEventListener("click",()=>{k(),E()}),y==null||y.addEventListener("click",()=>{M(),E()}),e.addEventListener("mouseenter",v),e.addEventListener("mouseleave",h),e.addEventListener("focusin",v),e.addEventListener("focusout",t=>{e.contains(t.relatedTarget)||h()}),e.addEventListener("pointerdown",t=>{w={x:t.clientX,y:t.clientY},(t.pointerType==="touch"||t.pointerType==="pen")&&(f=t.clientX,v())},{passive:!0}),e.addEventListener("pointermove",t=>{f!=null&&t.clientX-f},{passive:!0}),e.addEventListener("pointerup",t=>{if(f==null)return;const r=t.clientX-f;f=null,Math.abs(r)>=O?(r<0?M():k(),E()):h()},{passive:!0}),e.addEventListener("click",t=>{if($){t.preventDefault(),t.stopPropagation();return}if(w){const r=Math.abs(t.clientX-w.x)>8||Math.abs(t.clientY-w.y)>8;w=null,r&&(t.preventDefault(),t.stopPropagation())}},!0),window.addEventListener("resize",T,{passive:!0}),"ResizeObserver"in window&&new ResizeObserver(T).observe(i),"IntersectionObserver"in window&&new IntersectionObserver(t=>{t.forEach(r=>{x=r.isIntersecting,x?h():v()})},{threshold:.05,rootMargin:"40px 0px"}).observe(e),A(),q(),requestAnimationFrame(()=>{_(0),D(l,0,p),S=!0,setTimeout(h,N)})})}function J(s={}){const{id:n="",label:e="Carousel",autoplay:i=5e3,autoplayDelay:o=600,visible:m="",showArrows:b=!0,showCount:y=!0,trackHtml:l=""}=s;return`
    <div
      class="autoslider"
      data-autoslider
      data-autoplay="${i}"
      data-autoplay-delay="${o}"
      ${m?`data-visible="${m}"`:""}
      ${n?`id="${n}"`:""}
    >
      ${b?`
        <div class="autoslider__controls">
          <button type="button" class="autoslider__arrow autoslider__arrow--prev" data-autoslider-prev aria-label="Previous">
            <span aria-hidden="true">‹</span>
          </button>
          <button type="button" class="autoslider__arrow autoslider__arrow--next" data-autoslider-next aria-label="Next">
            <span aria-hidden="true">›</span>
          </button>
        </div>
      `:""}
      <div class="autoslider__viewport" tabindex="0" aria-roledescription="carousel" aria-label="${e}">
        <div class="autoslider__track" data-autoslider-track>${l}</div>
      </div>
      <div class="autoslider__footer">
        <div class="autoslider__dots" data-autoslider-dots role="tablist" aria-label="Carousel pages"></div>
        ${y?'<p class="autoslider__count" data-autoslider-count aria-live="polite"></p>':""}
      </div>
    </div>
  `}export{R as initAutoslider,J as renderAutosliderShell};
