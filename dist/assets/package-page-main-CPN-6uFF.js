import{getSafariPackageById as _,safariPackages as u}from"./safari-packages-Bwk-a-Z1.js";import{a as v,s as h,e as k}from"./content-utils-B_0c1a9b.js";import{r as m,a as f,i as p}from"./render-home-XFWJLOTR.js";import{i as y}from"./slideshow-DONQcubt.js";import{i as $}from"./scroll-reveal-DRkjB4s9.js";import{i as b}from"./card-tilt-DGI_hcNQ.js";function i(e){const a=document.createElement("div");return a.textContent=e??"",a.innerHTML}function w(e){const a=typeof e=="string"?e:e.id;return`/packages/${encodeURIComponent(a)}.html`}function S(e){return e.safariType||e.circuit||"Safari Package"}function x(e){var o;const a=h(e.overview),t=k(e.overview,e.activities),n=a.slice(0,3).map((s,r)=>r===0?`<p class="pkg-section__text pkg-section__text--lead">${i(s)}</p>`:`<p class="pkg-section__text">${i(s)}</p>`).join(""),l=t.length>0?`
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
      `:(o=e.activities)!=null&&o.length?`
        <div class="pkg-activities">
          <h3 class="pkg-activities__title">Activities</h3>
          <ul class="pkg-activity-tags">
            ${e.activities.map(s=>`<li>${i(s)}</li>`).join("")}
          </ul>
        </div>
      `:"";return`${n}${l}`}function P(e){return e!=null&&e.length?`
    <ol class="pkg-itinerary-timeline">
      ${e.map((a,t)=>`
            <li class="pkg-itinerary-timeline__item">
              <div class="pkg-itinerary-timeline__marker" aria-hidden="true">
                <span class="pkg-itinerary-timeline__dot"></span>
                ${t<e.length-1?'<span class="pkg-itinerary-timeline__line"></span>':""}
              </div>
              <article class="pkg-itinerary-timeline__card">
                <header class="pkg-itinerary-timeline__head">
                  <span class="pkg-itinerary-timeline__day">${i(a.day)}</span>
                  <h3 class="pkg-itinerary-timeline__title">${i(a.title)}</h3>
                </header>
                <p class="pkg-itinerary-timeline__text">${i(a.summary)}</p>
              </article>
            </li>
          `).join("")}
    </ol>
  `:'<p class="pkg-section__text">Share your travel dates and we will confirm the day-by-day route, lodges, and park order for this safari.</p>'}function d(e,a){return(e??[]).map(t=>`<li class="${a}">${i(t)}</li>`).join("")}function j(e){return(e??[]).map(a=>`
        <div class="pkg-facts__item">
          <span class="pkg-facts__label">${i(a.label)}</span>
          <span class="pkg-facts__value">${i(a.value)}</span>
        </div>
      `).join("")}function H(e){return e.length?`
    <section class="pkg-page__extras" aria-label="Additional photos">
      <div class="container">
        <div class="pkg-page__extras-grid">
          ${e.map(a=>`
                <figure class="pkg-page__extra-photo">
                  <img src="${i(a.src)}" alt="${i(a.alt)}" loading="lazy" decoding="async" width="480" height="320" />
                </figure>
              `).join("")}
        </div>
      </div>
    </section>
  `:""}function I(e,a=3){const t=_(e),n=t==null?void 0:t.circuit,l=u.filter(r=>r.id!==e);return[...l.filter(r=>r.circuit===n),...l.filter(r=>r.circuit!==n)].slice(0,a)}function L(e,a){var r;const t=document.querySelector(e);if(!t||!a)return!1;const{hero:n,extras:l}=v(a,3),o=I(a.id,3);document.title=`${a.title} | Matembo Safari & Tours`;const s=document.querySelector('meta[name="description"]');return s&&s.setAttribute("content",((r=h(a.overview)[0])==null?void 0:r.slice(0,155))||`${a.title} – ${a.duration} safari with Matembo Safari & Tours.`),t.innerHTML=`
    <article class="pkg-page">
      <header class="pkg-page__hero">
        <div class="pkg-page__hero-media">
          <img src="${i(n.src)}" alt="${i(n.alt)}" width="1600" height="680" loading="eager" decoding="async" />
          <div class="pkg-page__hero-shade" aria-hidden="true"></div>
        </div>
        <div class="container pkg-page__hero-inner section-reveal">
          <p class="pkg-page__eyebrow">${i(a.circuit)} · ${i(a.duration)}</p>
          <h1 class="pkg-page__title">${i(a.title)}</h1>
          <p class="pkg-page__script">${i(S(a))}</p>
          ${a.badge?`<span class="pkg-page__badge">${i(a.badge)}</span>`:""}
          <ul class="pkg-page__pills" aria-label="Highlights">
            ${a.highlights.slice(0,3).map(c=>`<li>${i(c)}</li>`).join("")}
          </ul>
          <div class="pkg-page__hero-actions">
            <a href="/#contact" class="btn btn--on-media">Enquire</a>
            <a href="/safaris.html" class="btn btn--secondary btn--ghost-light">All Safaris</a>
          </div>
        </div>
      </header>

      ${H(l)}

      <section class="pkg-page__content">
        <div class="container pkg-page__layout">
          <main class="pkg-page__main section-reveal">
            <section class="pkg-section">
              <h2 class="pkg-section__title">Overview</h2>
              <div class="pkg-prose">${x(a)}</div>
            </section>

            <section class="pkg-section">
              <h2 class="pkg-section__title">Highlights</h2>
              <ul class="pkg-list">${d(a.highlights,"pkg-list__item")}</ul>
            </section>

            <section class="pkg-section pkg-section--itinerary">
              <h2 class="pkg-section__title">Day-by-Day Itinerary</h2>
              ${P(a.itinerary)}
            </section>

            <section class="pkg-section pkg-section--split">
              <div>
                <h2 class="pkg-section__title">Included</h2>
                <ul class="pkg-list">${d(a.inclusions,"pkg-list__item")}</ul>
              </div>
              <div>
                <h2 class="pkg-section__title">Not Included</h2>
                <ul class="pkg-list">${d(a.exclusions,"pkg-list__item")}</ul>
              </div>
            </section>
          </main>

          <aside class="pkg-page__sidebar section-reveal">
            <div class="pkg-sidebar-card">
              <h2 class="pkg-sidebar-card__title">${i(a.title)}</h2>
              <p class="pkg-sidebar-card__duration">${i(a.duration)}</p>
              <div class="pkg-facts">${j(a.quickFacts)}</div>
              <div class="pkg-sidebar-card__actions">
                <a href="/#contact" class="btn btn--primary">Enquire</a>
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
  `,!0}function q(e){const a=document.querySelector(e);a&&(a.innerHTML=`
    <div class="container pkg-page-empty">
      <h1 class="pkg-page__title">Safari package not found</h1>
      <p class="pkg-section__text">Browse our <a href="/safaris.html">safari packages</a> or <a href="/#contact">send an enquiry</a>.</p>
    </div>
  `)}function M(){const e=document.body.dataset.packageId;return e||new URLSearchParams(window.location.search).get("id")||""}function g(){try{m(),f();const e=M(),a=_(e);if(!a){q("#package-view-root"),p();return}L("#package-view-root",a),p(),y(),b()}catch(e){console.error("Matembo package page init failed:",e)}finally{$()}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",g):g();
