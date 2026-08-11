import{k as b,l as m,r as f,a as y,i as x,o as $}from"./render-home-miLWeeLX.js";import{p as w,d as k,s as E}from"./content-utils-B_0c1a9b.js";import{i as S}from"./slideshow-BaSkx9Wz.js";import{i as _}from"./scroll-reveal-B17FauD6.js";import{r as P}from"./render-cards-lSM9ICI4.js";import{a as L,g as C}from"./activity-packages-BVj30N7Q.js";import{i as A}from"./card-tilt-DGI_hcNQ.js";function r(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}function v(t){return w(t,4)}function q(t,e=3){const a=[],i=new Set([t]);for(const s of b){if(a.length>=e)break;i.has(s.id)||(a.push(s),i.add(s.id))}return a}function T(t,e=3){return t!=null&&t.length?`
    <ul class="dest-page__pills" aria-label="Highlights">
      ${t.slice(0,e).map(a=>`<li>${r(a)}</li>`).join("")}
    </ul>
  `:""}function I(t){var a;return((a=t.descriptions)!=null&&a.length?t.descriptions.filter(Boolean).slice(0,5):E(t.description)).map((i,s)=>s===0?`<p class="dest-page__lead">${r(i)}</p>`:`<p class="dest-page__text">${r(i)}</p>`).join("")}function N(t,e){const a=k(t,{excludeSrc:e,max:4});return a.length?`
    <div class="dest-page__photo-grid dest-page__photo-grid--compact">
      ${a.map((i,s)=>`
            <button type="button" class="dest-page__photo" data-reveal data-lightbox-index="${s+1}" aria-label="View photo ${s+1}"${s%3?` data-reveal-delay="${s%3}"`:""}>
              <img src="${r(i.src)}" alt="${r(i.alt)}" loading="lazy" decoding="async" width="480" height="320" />
            </button>
          `).join("")}
    </div>
  `:""}function M(t,e=2){return t!=null&&t.length?`
    <ul class="dest-card__tags">
      ${t.slice(0,e).map(a=>`<li>${r(a)}</li>`).join("")}
    </ul>
  `:""}function B(t){return t.map(e=>{var a,i;return`
        <article class="dest-card dest-card--b dest-card--teaser dest-card--related" data-reveal>
          <div class="dest-card__cinema dest-card__cinema--related">
            <div class="dest-slideshow__track dest-slideshow__track--cinema">
              <div class="dest-slideshow__slide is-active" data-slide>
                <img src="${r((a=e.images[0])==null?void 0:a.src)}" alt="${r(((i=e.images[0])==null?void 0:i.alt)||e.name)}" loading="lazy" width="640" height="400" />
              </div>
            </div>
            <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
            <div class="dest-card__overlay dest-card__overlay--green" aria-hidden="true"></div>
            <div class="dest-card__cinema-caption">
              <span class="dest-card__script">${r(e.scriptLabel)}</span>
              <h3 class="dest-card__name">${r(e.name)}</h3>
            </div>
          </div>
          <a class="dest-card__cinema-body dest-card__cinema-body--teaser" href="${m(e)}">
            ${M(e.highlights,2)}
            <span class="dest-card__link">Explore ${r(e.name)} →</span>
          </a>
        </article>
      `}).join("")}function H(t,e){const a=document.querySelector(t);if(!a||!e)return!1;const i=v(e),s=i[0]||e.images[0],n=q(e.id,3);document.title=`${e.fullName} | Matembo Safari & Tours`;const d=document.querySelector('meta[name="description"]');return d&&d.setAttribute("content",e.description),a.innerHTML=`
    <article class="dest-page">
      <header class="dest-page__hero" data-hero>
        <div class="dest-page__hero-media">
          <img
            src="${r(s.src)}"
            alt="${r(s.alt)}"
            width="1600"
            height="680"
            loading="eager"
            decoding="async"
          />
          <div class="dest-page__hero-shade" aria-hidden="true"></div>
        </div>
        <div class="container dest-page__hero-inner section-reveal">
          <p class="dest-page__eyebrow">${r(e.category)} · ${r(e.region)}</p>
          <h1 class="dest-page__title">${r(e.fullName)}</h1>
          <p class="dest-page__script">${r(e.scriptLabel)}</p>
          ${T(e.highlights)}
          <div class="dest-page__hero-actions">
            <a href="/contact.html" class="btn btn--on-media">Plan Your Safari</a>
            ${e.id==="bird-watching"?'<a href="/bird-watching.html" class="btn btn--secondary btn--ghost-light">Birding Packages</a>':e.id==="cultural-visits"?'<a href="/cultural-visits.html" class="btn btn--secondary btn--ghost-light">Cultural Packages</a>':'<a href="/experiences.html" class="btn btn--secondary btn--ghost-light">All Experiences</a>'}
          </div>
        </div>
      </header>

      ${i.length>1?`
      <section class="dest-page__gallery-band" aria-labelledby="gallery-title">
        <div class="container">
          <div class="dest-page__gallery-head section-reveal">
            <h2 id="gallery-title" class="dest-page__section-title">More views</h2>
          </div>
          ${N(i,s.src)}
        </div>
      </section>
      `:""}

      <section class="dest-page__content">
        <div class="container">
          <aside class="dest-page__plan-bar section-reveal" aria-label="Plan your visit">
            <div class="dest-page__plan-bar-copy">
              <p class="dest-page__plan-bar-label">Good to know</p>
              <p class="dest-page__plan-bar-text">
                Best season <strong>${r(e.bestSeason)}</strong>
              </p>
            </div>
            <div class="dest-page__plan-bar-actions">
              <a href="/contact.html" class="btn btn--primary">Plan This Experience</a>
              <a href="/experiences.html" class="dest-page__aside-link">All experiences</a>
            </div>
          </aside>

          <div class="dest-page__main section-reveal">
            <h2 class="dest-page__section-title">About ${r(e.name)}</h2>
            <div class="dest-page__copy">${I(e)}</div>
          </div>
        </div>
      </section>

      <section class="dest-page__related" aria-labelledby="related-title">
        <div class="container">
          <div class="dest-page__related-head section-reveal">
            <h2 id="related-title" class="dest-page__section-title">More to explore</h2>
          </div>
          <div class="dest-page__related-grid">${B(n)}</div>
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
  `,!0}function R(t){const e=document.querySelector(t);e&&(e.innerHTML=`
    <div class="container dest-page-empty">
      <h1 class="dest-page__title">Experience not found</h1>
      <p class="dest-page__text">Browse our <a href="/experiences.html">Where to Go experiences</a>.</p>
    </div>
  `)}const j={"bird-watching":"bird-watching","cultural-visits":"cultural-visits"};function F(){const t=document.body.dataset.experienceId;if(t)return t;const e=new URLSearchParams(window.location.search);return e.get("id")||e.get("experience")||""}function G(t){var l,o,g;const e=document.querySelector("[data-lightbox]"),a=document.querySelectorAll("[data-lightbox-index]");if(!e||!a.length||!t.length)return;const i=e.querySelector(".dest-lightbox__img");let s=0;function n(c){var p;s=(c+t.length)%t.length;const h=t[s];i.src=h.src,i.alt=((p=h.alt)==null?void 0:p.replace(/\s*[––-]\s*view \d+$/i,""))||"",e.hidden=!1,e.setAttribute("aria-hidden","false"),document.body.classList.add("dest-lightbox-open")}function d(){e.hidden=!0,e.setAttribute("aria-hidden","true"),document.body.classList.remove("dest-lightbox-open")}a.forEach(c=>{c.addEventListener("click",()=>n(Number(c.dataset.lightboxIndex)))}),(l=e.querySelector("[data-lightbox-close]"))==null||l.addEventListener("click",d),(o=e.querySelector("[data-lightbox-prev]"))==null||o.addEventListener("click",()=>n(s-1)),(g=e.querySelector("[data-lightbox-next]"))==null||g.addEventListener("click",()=>n(s+1)),e.addEventListener("click",c=>{c.target===e&&d()}),document.addEventListener("keydown",c=>{e.hidden||(c.key==="Escape"&&d(),c.key==="ArrowLeft"&&n(s-1),c.key==="ArrowRight"&&n(s+1))})}async function z(t){const e=j[t];if(!e)return;const a=C(e),i=L(e).slice(0,6),s=document.querySelector("#experience-view-root");if(!a||!i.length||!s)return;const n=document.createElement("section");n.className="dest-listing-grid-section dest-page__packages-band",n.setAttribute("aria-labelledby","experience-packages-title"),n.innerHTML=`
    <div class="container">
      <header class="home-section__header section-reveal">
        <span class="home-section__label">Safari Packages</span>
        <h2 id="experience-packages-title" class="home-section__title">Curated ${a.label} Itineraries</h2>
        <p class="home-section__desc">
          Real routes from Tanzania Tourism — view full details or enquire to tailor dates and lodges.
        </p>
      </header>
      <div id="experience-packages-grid" class="safari-cards-grid"></div>
      <p class="home-section__desc section-reveal" style="margin-top: 2rem; text-align: center;">
        <a href="${a.pagePath}" class="btn btn--secondary">View all ${i.length<6?i.length:a.packageIds.length} packages →</a>
      </p>
    </div>
  `;const d=s.querySelector(".dest-page__related");d?s.insertBefore(n,d):s.appendChild(n),await P("#experience-packages-grid",{packages:i,viewLabel:"View Safari"}),A(),_()}async function u(){try{f(),y(),x();const t=F(),e=$(t);if(!e){R("#experience-view-root");return}if(!H("#experience-view-root",e))return;await z(t),S(),G(v(e))}catch(t){console.error("Matembo experience view init failed:",t)}finally{_()}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",u):u();
