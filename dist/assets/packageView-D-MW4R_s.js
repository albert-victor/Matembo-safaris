import"./tokens-9OgEy3cj.js";/* empty css                *//* empty css             */import{a as h,g as d}from"./safari-packages-CU_z_aDq.js";import{initSlideshows as y}from"./slideshow-BEvNnOa7.js";import{i as m}from"./scroll-reveal-BxdqyS58.js";const o="2-days-to-tarangire-national-park-ngorongoro-crater";function _(a){return d(a)??d(o)??h[0]}_(o);function e(a){const t=document.createElement("div");return t.textContent=a??"",t.innerHTML}function b(){const a=new URLSearchParams(window.location.search).get("id");return _(a)}function v(a){return a.safariType||a.circuit||"Safari Package"}function p(a,t="",s){return a!=null&&a.length?a.map((i,l)=>`
        <div class="pkg-slideshow__slide ${t} ${l===0?"is-active":""}" data-slide>
          <img src="${e(i.src)}" alt="${e(i.alt)}" width="1200" height="700" loading="${l===0?"eager":"lazy"}" decoding="async" />
        </div>
      `).join(""):`
      <div class="pkg-slideshow__slide ${t} is-active" data-slide>
        <img src="${e(s==null?void 0:s.src)}" alt="${e(s==null?void 0:s.alt)}" width="1200" height="700" loading="eager" decoding="async" />
      </div>
    `}function g(a){const t=Math.max(a,1);return Array.from({length:t},(s,i)=>`<button type="button" class="dest-slideshow__dot ${i===0?"is-active":""}" data-slide-dot aria-label="Slide ${i+1}"></button>`).join("")}function u(a){return a!=null&&a.length?a.map((t,s)=>`
        <details class="pkg-itinerary__day" ${s===0?"open":""}>
          <summary class="pkg-itinerary__summary">
            <span class="pkg-itinerary__day-label">${e(t.day)}</span>
            <span class="pkg-itinerary__day-title">${e(t.title)}</span>
          </summary>
          <p class="pkg-itinerary__text">${e(t.summary)}</p>
        </details>
      `).join(""):'<p class="pkg-section__text">Day-by-day routing is available on enquiry. Share your dates and we will confirm lodges, drives, and park order for this package.</p>'}function n(a,t){return(a??[]).map(s=>`<li class="${t}">${e(s)}</li>`).join("")}function w(a){return(a??[]).map(t=>`
        <div class="pkg-facts__item">
          <span class="pkg-facts__label">${e(t.label)}</span>
          <span class="pkg-facts__value">${e(t.value)}</span>
        </div>
      `).join("")}function $(a){var l;const t=document.querySelector("#package-view-a");if(!t)return;const s=(l=a.gallery)!=null&&l.length?a.gallery:[{src:a.image,alt:a.alt||a.title}],i=a.badge?`<span class="pkg-sidebar-card__badge">${e(a.badge)}</span>`:"";t.innerHTML=`
    <div class="pkg-view-a">
      <header class="pkg-view-a__head">
        <span class="dest-card__script dest-card__script--on-light">${e(v(a))}</span>
        <h2 class="pkg-view-a__head-title">${e(a.title)}</h2>
        <p class="pkg-view-a__head-meta">${e(a.circuit)} · ${e(a.duration)}</p>
      </header>

      <div class="pkg-gallery-compact" data-slideshow data-interval="6000">
        <div class="dest-slideshow__track dest-slideshow__track--mini">
          ${p(s,"dest-slideshow__slide--motion",{src:a.image,alt:a.alt||a.title})}
        </div>
        <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
        <div class="dest-card__overlay dest-card__overlay--green" aria-hidden="true"></div>
        <div class="dest-slideshow__dots dest-slideshow__dots--compact">${g(s.length)}</div>
      </div>

      <div class="pkg-view-a__layout">
        <main class="pkg-view-a__main">
          <section class="pkg-section pkg-section--itinerary">
            <h3 class="pkg-section__title">Day-by-Day Itinerary</h3>
            <div class="pkg-itinerary pkg-itinerary--expanded">${u(a.itinerary)}</div>
          </section>

          <section class="pkg-section">
            <h3 class="pkg-section__title">Overview</h3>
            <p class="pkg-section__text pkg-section__text--lead">${e(a.overview)}</p>
          </section>

          <section class="pkg-section">
            <h3 class="pkg-section__title">Highlights</h3>
            <ul class="pkg-list">${n(a.highlights,"pkg-list__item")}</ul>
          </section>

          <section class="pkg-section pkg-section--split">
            <div>
              <h3 class="pkg-section__title">Included</h3>
              <ul class="pkg-list">${n(a.inclusions,"pkg-list__item")}</ul>
            </div>
            <div>
              <h3 class="pkg-section__title">Not Included</h3>
              <ul class="pkg-list">${n(a.exclusions,"pkg-list__item")}</ul>
            </div>
          </section>
        </main>

        <aside class="pkg-view-a__sidebar">
          <div class="pkg-sidebar-card">
            ${i}
            <h3 class="pkg-sidebar-card__title">${e(a.title)}</h3>
            <p class="pkg-sidebar-card__duration">${e(a.duration)}</p>
            <div class="pkg-facts">${w(a.quickFacts)}</div>
            <div class="pkg-sidebar-card__actions">
              <a href="/contact.html" class="btn btn--primary">Plan This Safari</a>
              <a href="/destinations.html" class="btn btn--secondary">Browse Destinations</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `}function k(a){var i;const t=document.querySelector("#package-view-b");if(!t)return;const s=(i=a.gallery)!=null&&i.length?a.gallery:[{src:a.image,alt:a.alt||a.title}];t.innerHTML=`
    <div class="pkg-view-b">
      <header class="pkg-view-b__header">
        <span class="dest-card__script dest-card__script--on-light">${e(v(a))}</span>
        <h2 class="pkg-view-b__title">${e(a.title)}</h2>
        <p class="pkg-view-b__meta">${e(a.circuit)} · ${e(a.duration)}</p>
      </header>

      <div class="pkg-tabs" data-tabs>
        <div class="pkg-tabs__nav" role="tablist">
          <button type="button" class="pkg-tabs__btn is-active" role="tab" aria-selected="true" data-tab="overview">Overview</button>
          <button type="button" class="pkg-tabs__btn" role="tab" aria-selected="false" data-tab="itinerary">Itinerary</button>
          <button type="button" class="pkg-tabs__btn" role="tab" aria-selected="false" data-tab="gallery">Gallery</button>
        </div>

        <div class="pkg-tabs__panel is-active" data-panel="overview">
          <div class="pkg-gallery-compact pkg-gallery-compact--inline" data-slideshow data-interval="5500">
            <div class="dest-slideshow__track dest-slideshow__track--mini">
              ${p(s,"dest-slideshow__slide--motion",{src:a.image,alt:a.alt||a.title})}
            </div>
            <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
            <div class="dest-slideshow__dots dest-slideshow__dots--compact">${g(s.length)}</div>
          </div>
          <p class="pkg-section__text pkg-section__text--lead">${e(a.overview)}</p>
          <ul class="pkg-list">${n(a.highlights,"pkg-list__item")}</ul>
        </div>

        <div class="pkg-tabs__panel" data-panel="itinerary">
          <div class="pkg-itinerary pkg-itinerary--timeline">${u(a.itinerary)}</div>
        </div>

        <div class="pkg-tabs__panel" data-panel="gallery">
          <div class="pkg-gallery-grid">
            ${s.map(l=>`<figure class="pkg-gallery-grid__item"><img src="${e(l.src)}" alt="${e(l.alt)}" loading="lazy" width="600" height="400" /></figure>`).join("")}
          </div>
        </div>
      </div>

      <div class="pkg-view-b__cta">
        <a href="/contact.html" class="btn btn--primary">Plan This Safari</a>
        <a href="/destinations.html" class="btn btn--secondary">Browse Destinations</a>
      </div>
    </div>
  `}function f(){document.querySelectorAll("[data-tabs]").forEach(a=>{const t=a.querySelectorAll("[data-tab]"),s=a.querySelectorAll("[data-panel]");t.forEach(i=>{i.addEventListener("click",()=>{const l=i.dataset.tab;t.forEach(r=>{r.classList.toggle("is-active",r===i),r.setAttribute("aria-selected",r===i?"true":"false")}),s.forEach(r=>{r.classList.toggle("is-active",r.dataset.panel===l)})})})})}function c(){try{const a=b();document.title=`${a.title} | Matembo Safari & Tours`,$(a),k(a),y(),f()}catch(a){console.error("Matembo package view init failed:",a)}finally{m()}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):c();
