import{p as v}from"./paths-pBgruvT_.js";import{safariPackages as o}from"./safari-packages-Bwk-a-Z1.js";function r(a){const i=document.createElement("div");return i.textContent=a,i.innerHTML}function h(a){return String(a+1).padStart(2,"0")}function u(a){return(a.matemboPitch?[a.matemboPitch,...a.highlights||[]]:a.highlights||[]).slice(0,3).map(s=>`<li class="safari-card__highlight">${r(s)}</li>`).join("")}function b(a,i,s={}){const c=s.viewLabel||"View Safari",l=a.matemboLabel||a.title,e=!!s.inCarousel,t=e?0:i%3,d=a.badge?`<span class="safari-card__badge">${r(a.badge)}</span>`:"",n=a.objectPosition||"center center",_=i%2===0?"green":"gold",f=h(i);return`
    <article
      class="safari-card${e?" safari-card--carousel":""}"
      ${e?"":"data-reveal"}
      data-accent="${_}"
      ${!e&&t?`data-reveal-delay="${t}"`:""}
      aria-labelledby="pkg-title-${a.id}"
    >
      <div class="safari-card__glow" aria-hidden="true"></div>
      <div class="safari-card__frame"${e?"":" data-tilt"}>
        <div class="safari-card__inner">
          <span class="safari-card__index" aria-hidden="true">${f}</span>

          <div class="safari-card__media">
            <span class="safari-card__bracket safari-card__bracket--tl" aria-hidden="true"></span>
            <span class="safari-card__bracket safari-card__bracket--br" aria-hidden="true"></span>

            <div class="safari-card__motion">
              <img
                class="safari-card__image"
                src="${r(a.image)}"
                alt="${r(a.alt)}"
                width="560"
                height="350"
                loading="lazy"
                decoding="async"
                style="object-position: ${n}"
              />
            </div>

            <div class="safari-card__overlay safari-card__overlay--gold" aria-hidden="true"></div>
            <div class="safari-card__overlay safari-card__overlay--green" aria-hidden="true"></div>
            ${d}
            <span class="safari-card__duration-stamp">${r(a.duration)}</span>
            <span class="safari-card__circuit-script">${r(a.circuit)}</span>
          </div>

          <div class="safari-card__perforation" aria-hidden="true"></div>

          <div class="safari-card__body">
            <div class="safari-card__title-block">
              <span class="safari-card__accent-mark" aria-hidden="true"></span>
              <h3 class="safari-card__title" id="pkg-title-${a.id}">
                ${r(l)}
              </h3>
            </div>

            <ul class="safari-card__highlights">
              ${u(a)}
            </ul>

            <div class="safari-card__actions">
              <a href="${v(a)}" class="btn btn--primary btn--card">${r(c)}</a>
              <a href="/#contact" class="btn btn--secondary btn--card">Enquire</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  `}function $(a,i={}){const s=document.querySelector(a);if(!s)return;const{ids:c,packages:l,viewLabel:e}=i;let t=l||o;c!=null&&c.length&&(t=c.map(d=>o.find(n=>n.id===d)).filter(Boolean)),s.innerHTML=t.map((d,n)=>b(d,n,{viewLabel:e})).join("")}export{$ as a,b as r};
