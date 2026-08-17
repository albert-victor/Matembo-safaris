import{g as v,h as b,r as m,a as f,i as y,j as x}from"./render-home-BvSrwE3U.js";import{p as $,d as w,s as k}from"./content-utils-YZbAt33H.js";import{initSlideshows as E}from"./slideshow-BEvNnOa7.js";import{i as S}from"./scroll-reveal-BxdqyS58.js";import{r as P}from"./render-cards-CN1Xy30p.js";import{a as L,g as C}from"./activity-packages-DNtWlWFj.js";import{initCardTilt as A}from"./card-tilt-C-GpDV49.js";import{initCardMotion as q}from"./card-motion-gKtUt7p7.js";function r(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}function _(t){return $(t,4)}function T(t,e=3){const a=[],s=new Set([t]);for(const i of v){if(a.length>=e)break;s.has(i.id)||(a.push(i),s.add(i.id))}return a}function I(t,e=3){return t!=null&&t.length?`
    <ul class="dest-page__pills" aria-label="Highlights">
      ${t.slice(0,e).map(a=>`<li>${r(a)}</li>`).join("")}
    </ul>
  `:""}function M(t){var a;return((a=t.descriptions)!=null&&a.length?t.descriptions.filter(Boolean).slice(0,5):k(t.description)).map((s,i)=>i===0?`<p class="dest-page__lead">${r(s)}</p>`:`<p class="dest-page__text">${r(s)}</p>`).join("")}function N(t,e){const a=w(t,{excludeSrc:e,max:4});return a.length?`
    <div class="dest-page__photo-grid dest-page__photo-grid--compact">
      ${a.map((s,i)=>`
            <button type="button" class="dest-page__photo" data-reveal data-lightbox-index="${i+1}" aria-label="View photo ${i+1}"${i%3?` data-reveal-delay="${i%3}"`:""}>
              <img src="${r(s.src)}" alt="${r(s.alt)}" loading="lazy" decoding="async" width="480" height="320" />
            </button>
          `).join("")}
    </div>
  `:""}function B(t,e=2){return t!=null&&t.length?`
    <ul class="dest-card__tags">
      ${t.slice(0,e).map(a=>`<li>${r(a)}</li>`).join("")}
    </ul>
  `:""}function H(t){return t.map(e=>{var a,s;return`
        <article class="dest-card dest-card--b dest-card--teaser dest-card--related" data-reveal>
          <div class="dest-card__cinema dest-card__cinema--related">
            <div class="dest-slideshow__track dest-slideshow__track--cinema">
              <div class="dest-slideshow__slide is-active" data-slide>
                <img src="${r((a=e.images[0])==null?void 0:a.src)}" alt="${r(((s=e.images[0])==null?void 0:s.alt)||e.name)}" loading="lazy" width="640" height="400" />
              </div>
            </div>
            <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
            <div class="dest-card__overlay dest-card__overlay--green" aria-hidden="true"></div>
            <div class="dest-card__cinema-caption">
              <span class="dest-card__script">${r(e.scriptLabel)}</span>
              <h3 class="dest-card__name">${r(e.name)}</h3>
            </div>
          </div>
          <a class="dest-card__cinema-body dest-card__cinema-body--teaser" href="${b(e)}">
            ${B(e.highlights,2)}
            <span class="dest-card__link">Explore ${r(e.name)} →</span>
          </a>
        </article>
      `}).join("")}function R(t,e){const a=document.querySelector(t);if(!a||!e)return!1;const s=_(e),i=s[0]||e.images[0],n=T(e.id,3);document.title=`${e.fullName} | Matembo Safari & Tours`;const c=document.querySelector('meta[name="description"]');return c&&c.setAttribute("content",e.description),a.innerHTML=`
    <article class="dest-page">
      <header class="dest-page__hero" data-hero>
        <div class="dest-page__hero-media">
          <img
            src="${r(i.src)}"
            alt="${r(i.alt)}"
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
          ${I(e.highlights)}
          <div class="dest-page__hero-actions">
            <a href="/contact.html" class="btn btn--on-media">Plan Your Safari</a>
            ${e.id==="bird-watching"?'<a href="/bird-watching.html" class="btn btn--secondary btn--ghost-light">Birding Packages</a>':e.id==="cultural-visits"?'<a href="/cultural-visits.html" class="btn btn--secondary btn--ghost-light">Cultural Packages</a>':'<a href="/experiences.html" class="btn btn--secondary btn--ghost-light">All Experiences</a>'}
          </div>
        </div>
      </header>

      ${s.length>1?`
      <section class="dest-page__gallery-band" aria-labelledby="gallery-title">
        <div class="container">
          <div class="dest-page__gallery-head section-reveal">
            <h2 id="gallery-title" class="dest-page__section-title">More views</h2>
          </div>
          ${N(s,i.src)}
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
            <div class="dest-page__copy">${M(e)}</div>
          </div>
        </div>
      </section>

      <section class="dest-page__related" aria-labelledby="related-title">
        <div class="container">
          <div class="dest-page__related-head section-reveal">
            <h2 id="related-title" class="dest-page__section-title">More to explore</h2>
          </div>
          <div class="dest-page__related-grid">${H(n)}</div>
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
  `,!0}function j(t){const e=document.querySelector(t);e&&(e.innerHTML=`
    <div class="container dest-page-empty">
      <h1 class="dest-page__title">Experience not found</h1>
      <p class="dest-page__text">Browse our <a href="/experiences.html">Where to Go experiences</a>.</p>
    </div>
  `)}const F={"bird-watching":"bird-watching","cultural-visits":"cultural-visits"};function G(){const t=document.body.dataset.experienceId;if(t)return t;const e=new URLSearchParams(window.location.search);return e.get("id")||e.get("experience")||""}function z(t){var l,o,g;const e=document.querySelector("[data-lightbox]"),a=document.querySelectorAll("[data-lightbox-index]");if(!e||!a.length||!t.length)return;const s=e.querySelector(".dest-lightbox__img");let i=0;function n(d){var p;i=(d+t.length)%t.length;const h=t[i];s.src=h.src,s.alt=((p=h.alt)==null?void 0:p.replace(/\s*[––-]\s*view \d+$/i,""))||"",e.hidden=!1,e.setAttribute("aria-hidden","false"),document.body.classList.add("dest-lightbox-open")}function c(){e.hidden=!0,e.setAttribute("aria-hidden","true"),document.body.classList.remove("dest-lightbox-open")}a.forEach(d=>{d.addEventListener("click",()=>n(Number(d.dataset.lightboxIndex)))}),(l=e.querySelector("[data-lightbox-close]"))==null||l.addEventListener("click",c),(o=e.querySelector("[data-lightbox-prev]"))==null||o.addEventListener("click",()=>n(i-1)),(g=e.querySelector("[data-lightbox-next]"))==null||g.addEventListener("click",()=>n(i+1)),e.addEventListener("click",d=>{d.target===e&&c()}),document.addEventListener("keydown",d=>{e.hidden||(d.key==="Escape"&&c(),d.key==="ArrowLeft"&&n(i-1),d.key==="ArrowRight"&&n(i+1))})}async function D(t){const e=F[t];if(!e)return;const a=C(e),s=L(e).slice(0,6),i=document.querySelector("#experience-view-root");if(!a||!s.length||!i)return;const n=document.createElement("section");n.className="dest-listing-grid-section dest-page__packages-band",n.setAttribute("aria-labelledby","experience-packages-title"),n.innerHTML=`
    <div class="container">
      <header class="home-section__header section-reveal">
        <span class="home-section__label">Safari Packages</span>
        <h2 id="experience-packages-title" class="home-section__title">Curated ${a.label} Itineraries</h2>
        <p class="home-section__desc">
          Real routes from Tanzania Tourism – view full details or enquire to tailor dates and lodges.
        </p>
      </header>
      <div id="experience-packages-grid" class="safari-cards-grid"></div>
      <p class="home-section__desc section-reveal" style="margin-top: 2rem; text-align: center;">
        <a href="${a.pagePath}" class="btn btn--secondary">View all ${s.length<6?s.length:a.packageIds.length} packages →</a>
      </p>
    </div>
  `;const c=i.querySelector(".dest-page__related");c?i.insertBefore(n,c):i.appendChild(n),await P("#experience-packages-grid",{packages:s,viewLabel:"View Safari"}),A(),q()}async function u(){try{m(),f(),y();const t=G(),e=x(t);if(!e){j("#experience-view-root");return}if(!R("#experience-view-root",e))return;await D(t),E(),z(_(e))}catch(t){console.error("Matembo experience view init failed:",t)}finally{S()}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",u):u();
