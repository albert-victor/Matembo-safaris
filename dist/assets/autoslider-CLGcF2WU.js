import{l as F}from"./scroll-reveal-6DLuizO8.js";import{syncCarouselCardMotion as H}from"./card-motion-CgCTZbYj.js";function X(s,n,e){for(let i=n;i<Math.min(n+e,s.length);i++)F(s[i],{priority:i===n});H(s,n,e)}function W(s){const n=Number(s.dataset.visible)||3;return window.matchMedia("(min-width: 1200px)").matches?n:window.matchMedia("(min-width: 768px)").matches?Math.min(2,n):1}function G(s=document){if(!(s!=null&&s.querySelectorAll))return;const n=window.matchMedia("(prefers-reduced-motion: reduce)").matches;s.querySelectorAll("[data-autoslider]").forEach(e=>{if(e.dataset.autosliderInit==="true")return;e.dataset.autosliderInit="true";const i=e.querySelector("[data-autoslider-track]"),o=e.querySelector("[data-autoslider-dots]"),_=e.querySelector("[data-autoslider-count]"),m=e.querySelector("[data-autoslider-prev]"),b=e.querySelector("[data-autoslider-next]"),d=i?[...i.children]:[];if(!d.length)return;let a=0,p=1,c=0,L=null,S=!1,x=!1,w=null,f=null,$=!0,y=0;const D=Number(e.dataset.autoplay||5e3),O=42,A=()=>{p=W(e),c=Math.max(0,d.length-p),a>c&&(a=0),i.style.setProperty("--autoslider-visible",String(p))},z=()=>{var u;if(y&&S)return y*a;const t=parseFloat(getComputedStyle(i).gap)||16;return y=(((u=d[0])==null?void 0:u.getBoundingClientRect().width)||0)+t,a*y},N=()=>{o==null||o.querySelectorAll("[data-autoslider-dot]").forEach(t=>{t.addEventListener("click",()=>{g(Number(t.dataset.autosliderDot)),E()})})},q=()=>{if(!o)return;const t=c+1,r=[...o.querySelectorAll("[data-autoslider-dot]")];if(r.length!==t){o.innerHTML=Array.from({length:t},(u,l)=>`
        <button
          type="button"
          class="autoslider__dot ${l===a?"is-active":""}"
          data-autoslider-dot="${l}"
          role="tab"
          aria-selected="${l===a?"true":"false"}"
          aria-label="Go to slide ${l+1}"
        ></button>
      `).join(""),N();return}r.forEach((u,l)=>{const C=l===a;u.classList.toggle("is-active",C),u.setAttribute("aria-selected",C?"true":"false")})},P=()=>{if(!_)return;const t=a+1,r=Math.min(a+p,d.length);_.textContent=`${t}–${r} of ${d.length}`},g=t=>{a=(t%(c+1)+(c+1))%(c+1),x=!0,e.classList.add("is-advancing"),i.style.transform=`translate3d(-${z()}px, 0, 0)`,o==null||o.querySelectorAll("[data-autoslider-dot]").forEach((r,u)=>{const l=u===a;r.classList.toggle("is-active",l),r.setAttribute("aria-selected",l?"true":"false")}),P(),X(d,a,p),window.setTimeout(()=>{x=!1,e.classList.remove("is-advancing")},320)},V=()=>{y=0,A(),q(),S&&requestAnimationFrame(()=>g(a))};let I=null;const T=()=>{clearTimeout(I),I=window.setTimeout(()=>{V()},120)},M=()=>g(a+1),k=()=>g(a-1),v=()=>{L&&(clearInterval(L),L=null)},h=()=>{n||c<=0||!$||(v(),L=setInterval(M,D))},E=()=>{v(),h()};m==null||m.addEventListener("click",()=>{k(),E()}),b==null||b.addEventListener("click",()=>{M(),E()}),e.addEventListener("mouseenter",v),e.addEventListener("mouseleave",h),e.addEventListener("focusin",v),e.addEventListener("focusout",t=>{e.contains(t.relatedTarget)||h()}),e.addEventListener("pointerdown",t=>{w={x:t.clientX,y:t.clientY},(t.pointerType==="touch"||t.pointerType==="pen")&&(f=t.clientX,v())},{passive:!0}),e.addEventListener("pointermove",t=>{f!=null&&t.clientX-f},{passive:!0}),e.addEventListener("pointerup",t=>{if(f==null)return;const r=t.clientX-f;f=null,Math.abs(r)>=O?(r<0?M():k(),E()):h()},{passive:!0}),e.addEventListener("click",t=>{if(x){t.preventDefault(),t.stopPropagation();return}if(w){const r=Math.abs(t.clientX-w.x)>8||Math.abs(t.clientY-w.y)>8;w=null,r&&(t.preventDefault(),t.stopPropagation())}},!0),window.addEventListener("resize",T,{passive:!0}),"ResizeObserver"in window&&new ResizeObserver(T).observe(i),"IntersectionObserver"in window&&new IntersectionObserver(t=>{t.forEach(r=>{$=r.isIntersecting,$?h():v()})},{threshold:.05,rootMargin:"40px 0px"}).observe(e),A(),q(),requestAnimationFrame(()=>{g(0),X(d,0,p),S=!0,setTimeout(h,600)})})}function R(s={}){const{id:n="",label:e="Carousel",autoplay:i=5e3,visible:o="",showArrows:_=!0,showCount:m=!0,trackHtml:b=""}=s;return`
    <div
      class="autoslider"
      data-autoslider
      data-autoplay="${i}"
      ${o?`data-visible="${o}"`:""}
      ${n?`id="${n}"`:""}
    >
      ${_?`
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
        <div class="autoslider__track" data-autoslider-track>${b}</div>
      </div>
      <div class="autoslider__footer">
        <div class="autoslider__dots" data-autoslider-dots role="tablist" aria-label="Carousel pages"></div>
        ${m?'<p class="autoslider__count" data-autoslider-count aria-live="polite"></p>':""}
      </div>
    </div>
  `}export{G as initAutoslider,R as renderAutosliderShell};
