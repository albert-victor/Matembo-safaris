import{_ as f,p as v}from"./paths-BeSZcpY7.js";function e(a){const i=document.createElement("div");return i.textContent=a,i.innerHTML}function m(a){return String(a+1).padStart(2,"0")}function b(a){return(a.matemboPitch?[a.matemboPitch,...a.highlights||[]]:a.highlights||[]).slice(0,3).map(t=>`<li class="safari-card__highlight">${e(t)}</li>`).join("")}function g(a,i,t={}){const l=t.viewLabel||"View Safari",o=a.matemboLabel||a.title,c=!!t.inCarousel,r=c?0:i%3,d=a.badge?`<span class="safari-card__badge">${e(a.badge)}</span>`:"",s=a.objectPosition||"center center",n=i%2===0?"green":"gold",h=m(i),_=i<3,u=_?`src="${e(a.image)}" class="safari-card__image is-loaded"${i===0?' fetchpriority="high"':""}`:`data-src="${e(a.image)}" src="" class="safari-card__image"`;return`
    <article
      class="safari-card${c?" safari-card--carousel":""}"
      ${c?"":"data-reveal"}
      data-accent="${n}"
      ${!c&&r?`data-reveal-delay="${r}"`:""}
      aria-labelledby="pkg-title-${a.id}"
    >
      <div class="safari-card__glow" aria-hidden="true"></div>
      <div class="safari-card__frame"${c?"":" data-tilt"}>
        <div class="safari-card__inner">
          <span class="safari-card__index" aria-hidden="true">${h}</span>

          <div class="safari-card__media">
            <span class="safari-card__bracket safari-card__bracket--tl" aria-hidden="true"></span>
            <span class="safari-card__bracket safari-card__bracket--br" aria-hidden="true"></span>

            <div class="safari-card__motion">
              <img
                ${u}
                data-img-preset="card"
                alt="${e(a.alt)}"
                width="560"
                height="350"
                decoding="async"
                ${_?"":'loading="lazy"'}
                style="object-position: ${s}"
              />
            </div>

            <div class="safari-card__overlay safari-card__overlay--gold" aria-hidden="true"></div>
            <div class="safari-card__overlay safari-card__overlay--green" aria-hidden="true"></div>
            ${d}
            <span class="safari-card__duration-stamp">${e(a.duration)}</span>
            <span class="safari-card__circuit-script">${e(a.circuit)}</span>
          </div>

          <div class="safari-card__perforation" aria-hidden="true"></div>

          <div class="safari-card__body">
            <div class="safari-card__title-block">
              <span class="safari-card__accent-mark" aria-hidden="true"></span>
              <h3 class="safari-card__title" id="pkg-title-${a.id}">
                ${e(o)}
              </h3>
            </div>

            <ul class="safari-card__highlights">
              ${b(a)}
            </ul>

            <div class="safari-card__actions">
              <a href="${v(a)}" class="btn btn--primary btn--card">${e(l)}</a>
              <a href="/contact.html" class="btn btn--secondary btn--card">Enquire</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  `}async function p(a,i={}){const t=typeof a=="string"?document.querySelector(a):a;if(!t)return;const{ids:l,packages:o,viewLabel:c}=i;let r=o;if(!(r!=null&&r.length)){const{safariPackages:d}=await f(async()=>{const{safariPackages:s}=await import("./safari-packages-B2QcG3ea.js").then(n=>n.b);return{safariPackages:s}},[]);r=d}if(l!=null&&l.length){const{safariPackages:d}=await f(async()=>{const{safariPackages:s}=await import("./safari-packages-B2QcG3ea.js").then(n=>n.b);return{safariPackages:s}},[]);r=l.map(s=>d.find(n=>n.id===s)).filter(Boolean)}t.innerHTML=r.map((d,s)=>g(d,s,{viewLabel:c})).join("")}export{g as a,p as r};
