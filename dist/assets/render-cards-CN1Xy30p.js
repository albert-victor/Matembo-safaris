import{_,p}from"./paths-BeSZcpY7.js";function t(a){const r=document.createElement("div");return r.textContent=a,r.innerHTML}function v(a){return String(a+1).padStart(2,"0")}function $(a){return(a.matemboPitch?[a.matemboPitch,...a.highlights||[]]:a.highlights||[]).slice(0,3).map(e=>`<li class="safari-card__highlight">${t(e)}</li>`).join("")}function u(a){return!!(a.priceLabel&&!a.priceOnRequest)}function y(a=""){const r=String(a).match(/^From\s+(€[\d,]+)\s*(?:\/\s*person)?$/i);return r?r[1]:null}function P(a){if(!u(a))return"";const r=y(a.priceLabel);return r?`
    <p class="safari-card__price" aria-label="Price">
      <span class="safari-card__price-lead">From</span>
      <span class="safari-card__price-amount">${t(r)}</span>
      <span class="safari-card__price-note">per person</span>
    </p>
  `:`<p class="safari-card__price" aria-label="Price">${t(a.priceLabel)}</p>`}function g(a,r=[]){if(!(a!=null&&a.id)||u(a))return a;const e=r.find(d=>d.id===a.id);return e!=null&&e.priceLabel?{...a,priceLabel:e.priceLabel,priceOnRequest:e.priceOnRequest}:a}function L(a,r,e={}){const d=e.viewLabel||"View Safari",o=a.matemboLabel||a.title,l=!!e.inCarousel,i=l?0:r%3,c=a.badge?`<span class="safari-card__badge">${t(a.badge)}</span>`:"",s=P(a),n=a.objectPosition||"center center",h=r%2===0?"green":"gold",m=v(r),f=r<3,b=f?`src="${t(a.image)}" class="safari-card__image is-loaded"${r===0?' fetchpriority="high"':""}`:`data-src="${t(a.image)}" src="" class="safari-card__image"`;return`
    <article
      class="safari-card${l?" safari-card--carousel":""}"
      ${l?"":"data-reveal"}
      data-accent="${h}"
      ${!l&&i?`data-reveal-delay="${i}"`:""}
      aria-labelledby="pkg-title-${a.id}"
    >
      <div class="safari-card__glow" aria-hidden="true"></div>
      <div class="safari-card__frame"${l?"":" data-tilt"}>
        <div class="safari-card__inner">
          <span class="safari-card__index" aria-hidden="true">${m}</span>

          <div class="safari-card__media">
            <span class="safari-card__bracket safari-card__bracket--tl" aria-hidden="true"></span>
            <span class="safari-card__bracket safari-card__bracket--br" aria-hidden="true"></span>

            <div class="safari-card__motion">
              <img
                ${b}
                data-img-preset="card"
                alt="${t(a.alt)}"
                width="560"
                height="350"
                decoding="async"
                ${f?"":'loading="lazy"'}
                style="object-position: ${n}"
              />
            </div>

            <div class="safari-card__overlay safari-card__overlay--gold" aria-hidden="true"></div>
            <div class="safari-card__overlay safari-card__overlay--green" aria-hidden="true"></div>
            ${c}
            <span class="safari-card__duration-stamp">${t(a.duration)}</span>
            <span class="safari-card__circuit-script">${t(a.circuit)}</span>
          </div>

          <div class="safari-card__perforation" aria-hidden="true"></div>

          <div class="safari-card__body">
            <div class="safari-card__title-block">
              <span class="safari-card__accent-mark" aria-hidden="true"></span>
              <h3 class="safari-card__title" id="pkg-title-${a.id}">
                ${t(o)}
              </h3>
            </div>

            ${s}

            <ul class="safari-card__highlights">
              ${$(a)}
            </ul>

            <div class="safari-card__actions">
              <a href="${p(a)}" class="btn btn--primary btn--card">${t(d)}</a>
              <a href="/contact.html" class="btn btn--secondary btn--card">Enquire</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  `}async function E(a,r={}){const e=typeof a=="string"?document.querySelector(a):a;if(!e)return;const{ids:d,packages:o,viewLabel:l}=r;let i=o;if(!(i!=null&&i.length)){const{safariPackages:c}=await _(async()=>{const{safariPackages:s}=await import("./safari-packages-CU_z_aDq.js").then(n=>n.d);return{safariPackages:s}},[]);i=c}if(d!=null&&d.length){const{safariPackages:c}=await _(async()=>{const{safariPackages:s}=await import("./safari-packages-CU_z_aDq.js").then(n=>n.d);return{safariPackages:s}},[]);i=d.map(s=>c.find(n=>n.id===s)).filter(Boolean)}if(i!=null&&i.length){const{safariPackages:c}=await _(async()=>{const{safariPackages:s}=await import("./safari-packages-CU_z_aDq.js").then(n=>n.d);return{safariPackages:s}},[]);i=i.map(s=>g(s,c))}e.innerHTML=i.map((c,s)=>L(c,s,{viewLabel:l})).join("")}export{L as a,g as e,E as r};
