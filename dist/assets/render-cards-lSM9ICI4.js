import{_,p as u}from"./preload-helper-DsQV4sYi.js";function e(a){const i=document.createElement("div");return i.textContent=a,i.innerHTML}function v(a){return String(a+1).padStart(2,"0")}function h(a){return(a.matemboPitch?[a.matemboPitch,...a.highlights||[]]:a.highlights||[]).slice(0,3).map(t=>`<li class="safari-card__highlight">${e(t)}</li>`).join("")}function m(a,i,t={}){const n=t.viewLabel||"View Safari",l=a.matemboLabel||a.title,c=!!t.inCarousel,r=c?0:i%3,d=a.badge?`<span class="safari-card__badge">${e(a.badge)}</span>`:"",s=a.objectPosition||"center center",o=i%2===0?"green":"gold",f=v(i);return`
    <article
      class="safari-card${c?" safari-card--carousel":""}"
      ${c?"":"data-reveal"}
      data-accent="${o}"
      ${!c&&r?`data-reveal-delay="${r}"`:""}
      aria-labelledby="pkg-title-${a.id}"
    >
      <div class="safari-card__glow" aria-hidden="true"></div>
      <div class="safari-card__frame"${c?"":" data-tilt"}>
        <div class="safari-card__inner">
          <span class="safari-card__index" aria-hidden="true">${f}</span>

          <div class="safari-card__media">
            <span class="safari-card__bracket safari-card__bracket--tl" aria-hidden="true"></span>
            <span class="safari-card__bracket safari-card__bracket--br" aria-hidden="true"></span>

            <div class="safari-card__motion">
              <img
                class="safari-card__image"
                data-src="${e(a.image)}"
                data-img-preset="card"
                src=""
                alt="${e(a.alt)}"
                width="560"
                height="350"
                loading="lazy"
                decoding="async"
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
                ${e(l)}
              </h3>
            </div>

            <ul class="safari-card__highlights">
              ${h(a)}
            </ul>

            <div class="safari-card__actions">
              <a href="${u(a)}" class="btn btn--primary btn--card">${e(n)}</a>
              <a href="/contact.html" class="btn btn--secondary btn--card">Enquire</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  `}async function g(a,i={}){const t=typeof a=="string"?document.querySelector(a):a;if(!t)return;const{ids:n,packages:l,viewLabel:c}=i;let r=l;if(!(r!=null&&r.length)){const{safariPackages:d}=await _(async()=>{const{safariPackages:s}=await import("./safari-packages-Bwk-a-Z1.js");return{safariPackages:s}},[]);r=d}if(n!=null&&n.length){const{safariPackages:d}=await _(async()=>{const{safariPackages:s}=await import("./safari-packages-Bwk-a-Z1.js");return{safariPackages:s}},[]);r=n.map(s=>d.find(o=>o.id===s)).filter(Boolean)}t.innerHTML=r.map((d,s)=>m(d,s,{viewLabel:c})).join("")}export{m as a,g as r};
