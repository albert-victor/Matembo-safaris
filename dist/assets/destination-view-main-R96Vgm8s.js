import{a as g,b as y}from"./destinations-data-DBODsxHG.js";import{r as $,a as k,i as p}from"./render-home-DlUWSJjl.js";import{initSlideshows as w}from"./slideshow-BEvNnOa7.js";import{a as x,i as E}from"./scroll-reveal-BxdqyS58.js";function s(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}function S(t){return`/destinations/${encodeURIComponent(t.id)}.html`}const m=["serengeti","ngorongoro","kilimanjaro","tarangire","manyara","arusha"],A=["ruaha","nyerere","katavi","kitulo","lake-nyasa","matema-beach","isimila","mikumi"],R=["mikumi","udzungwa","saadani","kilwa-kisiwani","bagamoyo","pangani"],D=["mahale","gombe","rubondo","lake-tanganyika","saanane"],L=["zanzibar","stone-town","jozani-forest","nungwi-beach","changuu-island","kizimkazi"],T=["mafia","chole-bay","juani-island","jibondo-island","kua-ruins","mafia-marine"],N=["pemba","misali-island","fanjove-island","chumbe-island","mnemba-island","thanda-island"],P={southern:A,eastern:R,western:D,northern:m,zanzibar:L,mafia:T,oceanic:N};function U(t,e=3){const a=g(t),i=(a==null?void 0:a.circuit)||"northern",n=P[i]||m,o=y.filter(d=>d.circuit===i),r=[],c=new Set([t]);for(const d of n){if(r.length>=e)break;if(c.has(d))continue;const h=g(d);h&&h.circuit===i&&(r.push(h),c.add(d))}for(const d of o){if(r.length>=e)break;c.has(d.id)||(r.push(d),c.add(d.id))}return r}function v(t){var n;const e=(n=t.gallery)!=null&&n.length?t.gallery:t.images,a=new Set,i=[];for(const o of e)if(!(!(o!=null&&o.src)||a.has(o.src))&&(a.add(o.src),i.push(o),i.length>=12))break;return i}function z(t,e){return t.map((a,i)=>`
        <div class="dest-slideshow__slide ${i===0?"is-active":""}" data-slide>
          <img
            src="${s(a.src)}"
            alt="${s(a.alt)}"
            width="1200"
            height="675"
            loading="${i===0?"eager":"lazy"}"
            decoding="async"
          />
        </div>
      `).join("")}function f(t,e=3,a="dest-page__pills"){return t!=null&&t.length?`
    <ul class="${a}" aria-label="Highlights">
      ${t.slice(0,e).map(i=>`<li>${s(i)}</li>`).join("")}
    </ul>
  `:""}function j(t){var a;return((a=t.descriptions)!=null&&a.length?t.descriptions:[t.description]).filter(Boolean).map((i,n)=>n===0?`<p class="dest-page__lead">${s(i)}</p>`:`<p class="dest-page__text">${s(i)}</p>`).join("")}function F(t){return t.length?`
    <div class="dest-page__photo-grid">
      ${t.map((e,a)=>`
            <button type="button" class="dest-page__photo" data-reveal data-lightbox-index="${a}" aria-label="View photo ${a+1}"${a%3?` data-reveal-delay="${a%3}"`:""}>
              <img src="${s(e.src)}" alt="${s(e.alt)}" loading="lazy" decoding="async" width="480" height="320" />
            </button>
          `).join("")}
    </div>
  `:""}function I(t){return t.map(e=>`
        <article class="dest-card dest-card--b dest-card--teaser dest-card--related" data-reveal>
          <div class="dest-card__cinema dest-card__cinema--related" data-slideshow data-interval="5000">
            <div class="dest-slideshow__track dest-slideshow__track--cinema">
              ${z(e.images)}
            </div>
            <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
            <div class="dest-card__overlay dest-card__overlay--green" aria-hidden="true"></div>
            <div class="dest-card__cinema-caption">
              <span class="dest-card__script">${s(e.scriptLabel)}</span>
              <h3 class="dest-card__name">${s(e.name)}</h3>
            </div>
            <div class="dest-slideshow__filmstrip" role="tablist" aria-label="Slideshow images">
              ${e.images.map((a,i)=>`<button type="button" class="dest-slideshow__frame-mark ${i===0?"is-active":""}" data-slide-dot aria-label="Show image ${i+1}"></button>`).join("")}
            </div>
          </div>
          <a class="dest-card__cinema-body dest-card__cinema-body--teaser" href="${S(e)}">
            ${f(e.highlights,2,"dest-card__tags")}
            <span class="dest-card__link">Explore ${s(e.name)} →</span>
          </a>
        </article>
      `).join("")}function q(t,e){const a=document.querySelector(t);if(!a||!e)return!1;const i=v(e),n=i[0],o=U(e.id,3);document.title=`${e.fullName} | Matembo Safari & Tours`;const r=document.querySelector('meta[name="description"]');return r&&r.setAttribute("content",e.description),a.innerHTML=`
    <article class="dest-page">
      <header class="dest-page__hero" data-hero>
        <div class="dest-page__hero-media">
          <img
            src="${s(n.src)}"
            alt="${s(n.alt)}"
            width="1600"
            height="680"
            loading="eager"
            decoding="async"
          />
          <div class="dest-page__hero-shade" aria-hidden="true"></div>
        </div>
        <div class="container dest-page__hero-inner section-reveal">
          <p class="dest-page__eyebrow">${s(e.circuitLabel)} · ${s(e.region)}</p>
          <h1 class="dest-page__title">${s(e.fullName)}</h1>
          <p class="dest-page__script">${s(e.scriptLabel)}</p>
          ${f(e.highlights)}
          <div class="dest-page__hero-actions">
            <a href="/contact.html" class="btn btn--on-media">Plan Your Safari</a>
            <a href="/destinations.html" class="btn btn--secondary btn--ghost-light">All Destinations</a>
          </div>
        </div>
      </header>

      <section class="dest-page__gallery-band" aria-labelledby="gallery-title">
        <div class="container">
          <div class="dest-page__gallery-head section-reveal">
            <h2 id="gallery-title" class="dest-page__section-title">In pictures</h2>
          </div>
          ${F(i)}
        </div>
      </section>

      <section class="dest-page__content">
        <div class="container">
          <aside class="dest-page__plan-bar section-reveal" aria-label="Plan your visit">
            <div class="dest-page__plan-bar-copy">
              <p class="dest-page__plan-bar-label">Good to know</p>
              <p class="dest-page__plan-bar-text">
                Best season <strong>${s(e.bestSeason)}</strong>
              </p>
            </div>
            <div class="dest-page__plan-bar-actions">
              <a href="/contact.html" class="btn btn--primary">Plan This Destination</a>
              <a href="/destinations.html" class="dest-page__aside-link">All destinations</a>
            </div>
          </aside>

          <div class="dest-page__main section-reveal">
            <h2 class="dest-page__section-title">About ${s(e.name)}</h2>
            <div class="dest-page__copy">${j(e)}</div>
          </div>
        </div>
      </section>

      <section class="dest-page__related" aria-labelledby="related-title">
        <div class="container">
          <div class="dest-page__related-head section-reveal">
            <h2 id="related-title" class="dest-page__section-title">You may also like</h2>
          </div>
          <div class="dest-page__related-grid">${I(o)}</div>
        </div>
      </section>
    </article>

    <div class="dest-lightbox" data-lightbox hidden aria-hidden="true" role="dialog" aria-modal="true" aria-label="Photo gallery">
      <button type="button" class="dest-lightbox__close" data-lightbox-close aria-label="Close">×</button>
      <button type="button" class="dest-lightbox__prev" data-lightbox-prev aria-label="Previous">‹</button>
      <figure class="dest-lightbox__figure">
        <img class="dest-lightbox__img" src="" alt="" width="1200" height="800" />
      </figure>
      <button type="button" class="dest-lightbox__next" data-lightbox-next aria-label="Next">›</button>
    </div>
  `,!0}function C(t){const e=document.querySelector(t);e&&(e.innerHTML=`
    <div class="container dest-page-empty">
      <h1 class="dest-page__title">Destination not found</h1>
      <p class="dest-page__text">Browse our <a href="/destinations.html">Northern Circuit destinations</a>.</p>
    </div>
  `)}function H(){const t=document.body.dataset.destinationId;if(t)return t;const e=new URLSearchParams(window.location.search);return e.get("id")||e.get("destination")||""}function B(t){var c,d,h;const e=document.querySelector("[data-lightbox]"),a=document.querySelectorAll("[data-lightbox-index]");if(!e||!a.length||!t.length)return;const i=e.querySelector(".dest-lightbox__img");let n=0;function o(l){var _;n=(l+t.length)%t.length;const u=t[n];i.src=u.src,i.alt=((_=u.alt)==null?void 0:_.replace(/\s*[––-]\s*Tanzania Tourism.*$/i,""))||"",e.hidden=!1,e.setAttribute("aria-hidden","false"),document.body.classList.add("dest-lightbox-open")}function r(){e.hidden=!0,e.setAttribute("aria-hidden","true"),document.body.classList.remove("dest-lightbox-open")}a.forEach(l=>{l.addEventListener("click",()=>o(Number(l.dataset.lightboxIndex)))}),(c=e.querySelector("[data-lightbox-close]"))==null||c.addEventListener("click",r),(d=e.querySelector("[data-lightbox-prev]"))==null||d.addEventListener("click",()=>o(n-1)),(h=e.querySelector("[data-lightbox-next]"))==null||h.addEventListener("click",()=>o(n+1)),e.addEventListener("click",l=>{l.target===e&&r()}),document.addEventListener("keydown",l=>{e.hidden||(l.key==="Escape"&&r(),l.key==="ArrowLeft"&&o(n-1),l.key==="ArrowRight"&&o(n+1))})}function b(){try{$(),k();const t=H(),e=g(t);if(!e){C("#destination-view-root"),p();return}if(!q("#destination-view-root",e))return;p(),x(),w(),B(v(e))}catch(t){console.error("Matembo destination view init failed:",t)}finally{E()}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",b):b();
