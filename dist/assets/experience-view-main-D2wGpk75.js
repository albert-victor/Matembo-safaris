import{k as b,l as f,r as m,a as y,o as x,i as _}from"./render-home-XFWJLOTR.js";import{p as $,d as w,s as S}from"./content-utils-B_0c1a9b.js";import{i as E}from"./slideshow-DONQcubt.js";import{i as k}from"./scroll-reveal-DRkjB4s9.js";function i(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}function v(t){return $(t,4)}function L(t,e=3){const a=[],r=new Set([t]);for(const s of b){if(a.length>=e)break;r.has(s.id)||(a.push(s),r.add(s.id))}return a}function P(t,e=3){return t!=null&&t.length?`
    <ul class="dest-page__pills" aria-label="Highlights">
      ${t.slice(0,e).map(a=>`<li>${i(a)}</li>`).join("")}
    </ul>
  `:""}function q(t){var a;return((a=t.descriptions)!=null&&a.length?t.descriptions.filter(Boolean).slice(0,5):S(t.description)).map((r,s)=>s===0?`<p class="dest-page__lead">${i(r)}</p>`:`<p class="dest-page__text">${i(r)}</p>`).join("")}function A(t,e){const a=w(t,{excludeSrc:e,max:4});return a.length?`
    <div class="dest-page__photo-grid dest-page__photo-grid--compact">
      ${a.map((r,s)=>`
            <button type="button" class="dest-page__photo" data-reveal data-lightbox-index="${s+1}" aria-label="View photo ${s+1}"${s%3?` data-reveal-delay="${s%3}"`:""}>
              <img src="${i(r.src)}" alt="${i(r.alt)}" loading="lazy" decoding="async" width="480" height="320" />
            </button>
          `).join("")}
    </div>
  `:""}function M(t,e=2){return t!=null&&t.length?`
    <ul class="dest-card__tags">
      ${t.slice(0,e).map(a=>`<li>${i(a)}</li>`).join("")}
    </ul>
  `:""}function N(t){return t.map(e=>{var a,r;return`
        <article class="dest-card dest-card--b dest-card--teaser dest-card--related" data-reveal>
          <div class="dest-card__cinema dest-card__cinema--related">
            <div class="dest-slideshow__track dest-slideshow__track--cinema">
              <div class="dest-slideshow__slide is-active" data-slide>
                <img src="${i((a=e.images[0])==null?void 0:a.src)}" alt="${i(((r=e.images[0])==null?void 0:r.alt)||e.name)}" loading="lazy" width="640" height="400" />
              </div>
            </div>
            <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
            <div class="dest-card__overlay dest-card__overlay--green" aria-hidden="true"></div>
            <div class="dest-card__cinema-caption">
              <span class="dest-card__script">${i(e.scriptLabel)}</span>
              <h3 class="dest-card__name">${i(e.name)}</h3>
            </div>
          </div>
          <a class="dest-card__cinema-body dest-card__cinema-body--teaser" href="${f(e)}">
            ${M(e.highlights,2)}
            <span class="dest-card__link">Explore ${i(e.name)} →</span>
          </a>
        </article>
      `}).join("")}function H(t,e){const a=document.querySelector(t);if(!a||!e)return!1;const r=v(e),s=r[0]||e.images[0],d=L(e.id,3);document.title=`${e.fullName} | Matembo Safari & Tours`;const o=document.querySelector('meta[name="description"]');return o&&o.setAttribute("content",e.description),a.innerHTML=`
    <article class="dest-page">
      <header class="dest-page__hero" data-hero>
        <div class="dest-page__hero-media">
          <img
            src="${i(s.src)}"
            alt="${i(s.alt)}"
            width="1600"
            height="680"
            loading="eager"
            decoding="async"
          />
          <div class="dest-page__hero-shade" aria-hidden="true"></div>
        </div>
        <div class="container dest-page__hero-inner section-reveal">
          <p class="dest-page__eyebrow">${i(e.category)} · ${i(e.region)}</p>
          <h1 class="dest-page__title">${i(e.fullName)}</h1>
          <p class="dest-page__script">${i(e.scriptLabel)}</p>
          ${P(e.highlights)}
          <div class="dest-page__hero-actions">
            <a href="/#contact" class="btn btn--on-media">Plan Your Safari</a>
            <a href="/experiences.html" class="btn btn--secondary btn--ghost-light">All Experiences</a>
          </div>
        </div>
      </header>

      ${r.length>1?`
      <section class="dest-page__gallery-band" aria-labelledby="gallery-title">
        <div class="container">
          <div class="dest-page__gallery-head section-reveal">
            <h2 id="gallery-title" class="dest-page__section-title">More views</h2>
          </div>
          ${A(r,s.src)}
        </div>
      </section>
      `:""}

      <section class="dest-page__content">
        <div class="container">
          <aside class="dest-page__plan-bar section-reveal" aria-label="Plan your visit">
            <div class="dest-page__plan-bar-copy">
              <p class="dest-page__plan-bar-label">Good to know</p>
              <p class="dest-page__plan-bar-text">
                Best season <strong>${i(e.bestSeason)}</strong>
              </p>
            </div>
            <div class="dest-page__plan-bar-actions">
              <a href="/#contact" class="btn btn--primary">Plan This Experience</a>
              <a href="/experiences.html" class="dest-page__aside-link">All experiences</a>
            </div>
          </aside>

          <div class="dest-page__main section-reveal">
            <h2 class="dest-page__section-title">About ${i(e.name)}</h2>
            <div class="dest-page__copy">${q(e)}</div>
          </div>
        </div>
      </section>

      <section class="dest-page__related" aria-labelledby="related-title">
        <div class="container">
          <div class="dest-page__related-head section-reveal">
            <h2 id="related-title" class="dest-page__section-title">More to explore</h2>
          </div>
          <div class="dest-page__related-grid">${N(d)}</div>
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
  `,!0}function T(t){const e=document.querySelector(t);e&&(e.innerHTML=`
    <div class="container dest-page-empty">
      <h1 class="dest-page__title">Experience not found</h1>
      <p class="dest-page__text">Browse our <a href="/experiences.html">Where to Go experiences</a>.</p>
    </div>
  `)}function j(){const t=document.body.dataset.experienceId;if(t)return t;const e=new URLSearchParams(window.location.search);return e.get("id")||e.get("experience")||""}function B(t){var l,c,h;const e=document.querySelector("[data-lightbox]"),a=document.querySelectorAll("[data-lightbox-index]");if(!e||!a.length||!t.length)return;const r=e.querySelector(".dest-lightbox__img");let s=0;function d(n){var p;s=(n+t.length)%t.length;const g=t[s];r.src=g.src,r.alt=((p=g.alt)==null?void 0:p.replace(/\s*[––-]\s*view \d+$/i,""))||"",e.hidden=!1,e.setAttribute("aria-hidden","false"),document.body.classList.add("dest-lightbox-open")}function o(){e.hidden=!0,e.setAttribute("aria-hidden","true"),document.body.classList.remove("dest-lightbox-open")}a.forEach(n=>{n.addEventListener("click",()=>d(Number(n.dataset.lightboxIndex)))}),(l=e.querySelector("[data-lightbox-close]"))==null||l.addEventListener("click",o),(c=e.querySelector("[data-lightbox-prev]"))==null||c.addEventListener("click",()=>d(s-1)),(h=e.querySelector("[data-lightbox-next]"))==null||h.addEventListener("click",()=>d(s+1)),e.addEventListener("click",n=>{n.target===e&&o()}),document.addEventListener("keydown",n=>{e.hidden||(n.key==="Escape"&&o(),n.key==="ArrowLeft"&&d(s-1),n.key==="ArrowRight"&&d(s+1))})}function u(){try{m(),y();const t=j(),e=x(t);if(!e){T("#experience-view-root"),_();return}if(!H("#experience-view-root",e))return;_(),E(),B(v(e))}catch(t){console.error("Matembo experience view init failed:",t)}finally{k()}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",u):u();
