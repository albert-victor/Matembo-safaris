import{b as _,s as h}from"./safari-packages-CU_z_aDq.js";import{t as v,l as u,u as m,r as k,a as f,i as d}from"./render-home-DkvHZ7K0.js";import{initSlideshows as $}from"./slideshow-B52kY28T.js";import{i as y}from"./scroll-reveal-6DLuizO8.js";import{initCardTilt as b}from"./card-tilt-hVmWyP2d.js";function i(a){const e=document.createElement("div");return e.textContent=a??"",e.innerHTML}function w(a){const e=typeof a=="string"?a:a.id;return`/packages/${encodeURIComponent(e)}.html`}function S(a){return a.safariType||a.circuit||"Safari Package"}function x(a){var o;const e=u(a.overview),t=m(a.overview,a.activities),n=e.slice(0,3).map((s,r)=>r===0?`<p class="pkg-section__text pkg-section__text--lead">${i(s)}</p>`:`<p class="pkg-section__text">${i(s)}</p>`).join(""),l=t.length>0?`
        <div class="pkg-activities">
          <h3 class="pkg-activities__title">What you can do</h3>
          <div class="pkg-activities__grid">
            ${t.map(s=>`
                  <article class="pkg-activity-card">
                    <h4 class="pkg-activity-card__title">${i(s.title)}</h4>
                    ${s.body?`<p class="pkg-activity-card__text">${i(s.body)}</p>`:""}
                  </article>
                `).join("")}
          </div>
        </div>
      `:(o=a.activities)!=null&&o.length?`
        <div class="pkg-activities">
          <h3 class="pkg-activities__title">Activities</h3>
          <ul class="pkg-activity-tags">
            ${a.activities.map(s=>`<li>${i(s)}</li>`).join("")}
          </ul>
        </div>
      `:"";return`${n}${l}`}function P(a){return a!=null&&a.length?`
    <ol class="pkg-itinerary-timeline">
      ${a.map((e,t)=>`
            <li class="pkg-itinerary-timeline__item">
              <div class="pkg-itinerary-timeline__marker" aria-hidden="true">
                <span class="pkg-itinerary-timeline__dot"></span>
                ${t<a.length-1?'<span class="pkg-itinerary-timeline__line"></span>':""}
              </div>
              <article class="pkg-itinerary-timeline__card">
                <header class="pkg-itinerary-timeline__head">
                  <span class="pkg-itinerary-timeline__day">${i(e.day)}</span>
                  <h3 class="pkg-itinerary-timeline__title">${i(e.title)}</h3>
                </header>
                <p class="pkg-itinerary-timeline__text">${i(e.summary)}</p>
              </article>
            </li>
          `).join("")}
    </ol>
  `:'<p class="pkg-section__text">Share your travel dates and we will confirm the day-by-day route, lodges, and park order for this safari.</p>'}function p(a,e){return(a??[]).map(t=>`<li class="${e}">${i(t)}</li>`).join("")}function q(a){return(a??[]).map(e=>`
        <div class="pkg-facts__item">
          <span class="pkg-facts__label">${i(e.label)}</span>
          <span class="pkg-facts__value">${i(e.value)}</span>
        </div>
      `).join("")}function L(a){return a.length?`
    <section class="pkg-page__extras" aria-label="Additional photos">
      <div class="container">
        <div class="pkg-page__extras-grid">
          ${a.map(e=>`
                <figure class="pkg-page__extra-photo">
                  <img src="${i(e.src)}" alt="${i(e.alt)}" loading="lazy" decoding="async" width="480" height="320" />
                </figure>
              `).join("")}
        </div>
      </div>
    </section>
  `:""}function j(a,e=3){const t=_(a),n=t==null?void 0:t.circuit,l=h.filter(r=>r.id!==a);return[...l.filter(r=>r.circuit===n),...l.filter(r=>r.circuit!==n)].slice(0,e)}function I(a,e){var r;const t=document.querySelector(a);if(!t||!e)return!1;const{hero:n,extras:l}=v(e,3),o=j(e.id,3);document.title=`${e.title} | Matembo Safari & Tours`;const s=document.querySelector('meta[name="description"]');return s&&s.setAttribute("content",((r=u(e.overview)[0])==null?void 0:r.slice(0,155))||`${e.title} – ${e.duration} safari with Matembo Safari & Tours.`),t.innerHTML=`
    <article class="pkg-page">
      <header class="pkg-page__hero">
        <div class="pkg-page__hero-media">
          <img src="${i(n.src)}" alt="${i(n.alt)}" width="1920" height="820" loading="eager" decoding="async" fetchpriority="high" />
          <div class="pkg-page__hero-shade" aria-hidden="true"></div>
        </div>
        <div class="container pkg-page__hero-inner">
          <p class="pkg-page__eyebrow">${i(e.circuit)} · ${i(e.duration)}</p>
          <h1 class="pkg-page__title">${i(e.title)}</h1>
          <p class="pkg-page__script">${i(S(e))}</p>
          ${e.priceLabel&&!e.priceOnRequest?`<p class="pkg-page__price-stamp" aria-label="Price">${i(e.priceLabel)}</p>`:e.priceOnRequest?'<p class="pkg-page__price-stamp pkg-page__price-stamp--on-request">Price on request</p>':""}
          ${e.badge?`<span class="pkg-page__badge">${i(e.badge)}</span>`:""}
          <ul class="pkg-page__pills" aria-label="Highlights">
            ${e.highlights.slice(0,3).map(c=>`<li>${i(c)}</li>`).join("")}
          </ul>
          <div class="pkg-page__hero-actions">
            <a href="/contact.html" class="btn btn--on-media">Enquire</a>
            <a href="/safaris.html" class="btn btn--secondary btn--ghost-light">All Safaris</a>
          </div>
        </div>
      </header>

      ${L(l)}

      <section class="pkg-page__content">
        <div class="container pkg-page__layout">
          <main class="pkg-page__main section-reveal">
            <section class="pkg-section">
              <h2 class="pkg-section__title">Overview</h2>
              <div class="pkg-prose">${x(e)}</div>
            </section>

            <section class="pkg-section">
              <h2 class="pkg-section__title">Highlights</h2>
              <ul class="pkg-list">${p(e.highlights,"pkg-list__item")}</ul>
            </section>

            <section class="pkg-section pkg-section--itinerary">
              <h2 class="pkg-section__title">Day-by-Day Itinerary</h2>
              ${P(e.itinerary)}
            </section>

            <section class="pkg-section pkg-section--split">
              <div>
                <h2 class="pkg-section__title">Included</h2>
                <ul class="pkg-list">${p(e.inclusions,"pkg-list__item")}</ul>
              </div>
              <div>
                <h2 class="pkg-section__title">Not Included</h2>
                <ul class="pkg-list">${p(e.exclusions,"pkg-list__item")}</ul>
              </div>
            </section>
          </main>

          <aside class="pkg-page__sidebar section-reveal">
            <div class="pkg-sidebar-card">
              <h2 class="pkg-sidebar-card__title">${i(e.title)}</h2>
              ${e.priceLabel?`<div class="pkg-sidebar-card__price-box${e.priceOnRequest?" pkg-sidebar-card__price-box--on-request":""}">
                      <span class="pkg-sidebar-card__price-label">${e.priceOnRequest?"Tailor-made quote":"Indicative price"}</span>
                      <p class="pkg-sidebar-card__price">${i(e.priceLabel)}</p>
                      <span class="pkg-sidebar-card__price-note">Per person · private safari</span>
                    </div>`:""}
              <p class="pkg-sidebar-card__duration">${i(e.duration)}</p>
              <div class="pkg-facts">${q(e.quickFacts)}</div>
              <div class="pkg-sidebar-card__actions">
                <a href="/contact.html" class="btn btn--primary">Enquire</a>
                <a href="/safaris.html" class="btn btn--secondary">Browse Safaris</a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      ${o.length?`
        <section class="pkg-page__related" aria-labelledby="related-safaris-title">
          <div class="container">
            <h2 id="related-safaris-title" class="pkg-section__title section-reveal">You may also like</h2>
            <div class="pkg-page__related-grid">
              ${o.map(c=>`
                <a class="pkg-page__related-card section-reveal" href="${w(c)}">
                  <img src="${i(c.image)}" alt="${i(c.alt||c.title)}" loading="lazy" width="400" height="260" />
                  <span class="pkg-page__related-body">
                    <span class="pkg-page__related-meta">${i(c.duration)}</span>
                    <span class="pkg-page__related-title">${i(c.title)}</span>
                  </span>
                </a>
              `).join("")}
            </div>
          </div>
        </section>
      `:""}
    </article>
  `,!0}function H(a){const e=document.querySelector(a);e&&(e.innerHTML=`
    <div class="container pkg-page-empty">
      <h1 class="pkg-page__title">Safari package not found</h1>
      <p class="pkg-section__text">Browse our <a href="/safaris.html">safari packages</a> or <a href="/contact.html">send an enquiry</a>.</p>
    </div>
  `)}function R(){const a=document.body.dataset.packageId;return a||new URLSearchParams(window.location.search).get("id")||""}function g(){try{k(),f();const a=R(),e=_(a);if(!e){H("#package-view-root"),d();return}I("#package-view-root",e),d(),$(),b()}catch(a){console.error("Matembo package page init failed:",a)}finally{y()}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",g):g();
