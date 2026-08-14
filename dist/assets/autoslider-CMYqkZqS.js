import{l as N}from"./scroll-reveal-BPEmY50i.js";function k(s,o,e){for(let r=o;r<Math.min(o+e,s.length);r++)N(s[r],{priority:r===o})}function P(s){const o=Number(s.dataset.visible)||3;return window.matchMedia("(min-width: 1200px)").matches?o:window.matchMedia("(min-width: 768px)").matches?Math.min(2,o):1}function O(s=document){if(!(s!=null&&s.querySelectorAll))return;const o=window.matchMedia("(prefers-reduced-motion: reduce)").matches;s.querySelectorAll("[data-autoslider]").forEach(e=>{if(e.dataset.autosliderInit==="true")return;e.dataset.autosliderInit="true";const r=e.querySelector("[data-autoslider-track]"),n=e.querySelector("[data-autoslider-dots]"),w=e.querySelector("[data-autoslider-count]"),v=e.querySelector("[data-autoslider-prev]"),f=e.querySelector("[data-autoslider-next]"),u=r?[...r.children]:[];if(!u.length)return;let i=0,c=1,d=0,g=null,E=!1,L=!1,m=null,p=null;const C=Number(e.dataset.autoplay||5e3),I=42,S=()=>{c=P(e),d=Math.max(0,u.length-c),i>d&&(i=0),r.style.setProperty("--autoslider-visible",String(c))},X=()=>{var l;const t=parseFloat(getComputedStyle(r).gap)||16,a=((l=u[0])==null?void 0:l.getBoundingClientRect().width)||0;return i*(a+t)},x=()=>{if(!n)return;const t=d+1;n.innerHTML=Array.from({length:t},(a,l)=>`
        <button
          type="button"
          class="autoslider__dot ${l===i?"is-active":""}"
          data-autoslider-dot="${l}"
          role="tab"
          aria-selected="${l===i?"true":"false"}"
          aria-label="Go to slide ${l+1}"
        ></button>
      `).join(""),n.querySelectorAll("[data-autoslider-dot]").forEach(a=>{a.addEventListener("click",()=>{h(Number(a.dataset.autosliderDot)),_()})})},z=()=>{if(!w)return;const t=i+1,a=Math.min(i+c,u.length);w.textContent=`${t}–${a} of ${u.length}`},h=t=>{i=(t%(d+1)+(d+1))%(d+1),L=!0,e.classList.add("is-advancing"),r.style.transform=`translate3d(-${X()}px, 0, 0)`,n==null||n.querySelectorAll("[data-autoslider-dot]").forEach((a,l)=>{const T=l===i;a.classList.toggle("is-active",T),a.setAttribute("aria-selected",T?"true":"false")}),z(),k(u,i,c),window.setTimeout(()=>{L=!1,e.classList.remove("is-advancing")},320)},D=()=>{S(),x(),E&&requestAnimationFrame(()=>h(i))};let M=null;const q=()=>{clearTimeout(M),M=window.setTimeout(()=>{D()},120)},$=()=>h(i+1),A=()=>h(i-1),b=()=>{g&&(clearInterval(g),g=null)},y=()=>{o||d<=0||(b(),g=setInterval($,C))},_=()=>{b(),y()};v==null||v.addEventListener("click",()=>{A(),_()}),f==null||f.addEventListener("click",()=>{$(),_()}),e.addEventListener("mouseenter",b),e.addEventListener("mouseleave",y),e.addEventListener("focusin",b),e.addEventListener("focusout",t=>{e.contains(t.relatedTarget)||y()}),e.addEventListener("pointerdown",t=>{m={x:t.clientX,y:t.clientY},(t.pointerType==="touch"||t.pointerType==="pen")&&(p=t.clientX,b())},{passive:!0}),e.addEventListener("pointermove",t=>{p!=null&&t.clientX-p},{passive:!0}),e.addEventListener("pointerup",t=>{if(p==null)return;const a=t.clientX-p;p=null,Math.abs(a)>=I?(a<0?$():A(),_()):y()},{passive:!0}),e.addEventListener("click",t=>{if(L){t.preventDefault(),t.stopPropagation();return}if(m){const a=Math.abs(t.clientX-m.x)>8||Math.abs(t.clientY-m.y)>8;m=null,a&&(t.preventDefault(),t.stopPropagation())}},!0),window.addEventListener("resize",q,{passive:!0}),"ResizeObserver"in window&&new ResizeObserver(q).observe(r),S(),x(),requestAnimationFrame(()=>{h(0),k(u,0,c),E=!0,setTimeout(y,600)})})}function R(s={}){const{id:o="",label:e="Carousel",autoplay:r=5e3,visible:n="",showArrows:w=!0,showCount:v=!0,trackHtml:f=""}=s;return`
    <div
      class="autoslider"
      data-autoslider
      data-autoplay="${r}"
      ${n?`data-visible="${n}"`:""}
      ${o?`id="${o}"`:""}
    >
      ${w?`
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
        <div class="autoslider__track" data-autoslider-track>${f}</div>
      </div>
      <div class="autoslider__footer">
        <div class="autoslider__dots" data-autoslider-dots role="tablist" aria-label="Carousel pages"></div>
        ${v?'<p class="autoslider__count" data-autoslider-count aria-live="polite"></p>':""}
      </div>
    </div>
  `}export{O as initAutoslider,R as renderAutosliderShell};
