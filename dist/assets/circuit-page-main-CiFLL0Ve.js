import{getCircuitById as n,getAllCircuitsPageData as o}from"./circuits-page-data-6Y4Hd9N2.js";import{g as l,r as d,a as u,i as p}from"./render-home-DLbeZLdX.js";import{r as h}from"./render-destinations-Dy9HvRZq.js";import{a as _,i as m}from"./scroll-reveal-BPEmY50i.js";import{initSlideshows as g}from"./slideshow-CpJtcc9p.js";function t(a){const e=document.createElement("div");return e.textContent=a??"",e.innerHTML}function f(a){return o().filter(e=>e.id!==a).slice(0,4).map(e=>`
        <a class="circuit-teaser" href="${t(e.pageHref)}" data-reveal>
          <span class="circuit-teaser__thumb">
            <img data-src="${t(e.hero.src)}" data-img-preset="thumb" src="" alt="" loading="lazy" width="120" height="80" decoding="async" />
          </span>
          <span class="circuit-teaser__text">
            <span class="circuit-teaser__name">${t(e.name)}</span>
            <span class="circuit-teaser__script">${t(e.script)}</span>
          </span>
        </a>
      `).join("")}function v(a){const e=document.querySelector(a);e&&(e.innerHTML=`
    <section class="circuit-page__empty">
      <div class="container">
        <h1>Circuit not found</h1>
        <p>That circuit page does not exist.</p>
        <a href="/circuits.html" class="btn btn--primary">All Circuits</a>
      </div>
    </section>
  `)}function b(a,e){const s=document.querySelector(a),i=n(e);if(!s||!i)return!1;document.title=`${i.name} | Matembo Safari & Tours`;const r=document.querySelector('meta[name="description"]');return r&&r.setAttribute("content",i.lead),s.innerHTML=`
    <article class="circuit-page">
      <header class="circuit-page__hero" data-hero>
        <div class="circuit-page__hero-media">
          <img
            data-src="${t(i.hero.src)}"
            data-img-preset="hero"
            src=""
            alt="${t(i.hero.alt)}"
            width="1600"
            height="680"
            loading="eager"
            decoding="async"
          />
          <div class="circuit-page__hero-shade" aria-hidden="true"></div>
        </div>
        <div class="container circuit-page__hero-inner section-reveal">
          <p class="circuit-page__eyebrow">Tanzania Circuit</p>
          <h1 class="circuit-page__title">${t(i.name)}</h1>
          <p class="circuit-page__script">${t(i.script)}</p>
          <ul class="circuit-page__stats" aria-label="Circuit overview">
            <li><strong>${i.destinationCount}</strong> destinations</li>
            ${i.safariCount?`<li><strong>${i.safariCount}</strong> safari packages</li>`:""}
          </ul>
          <div class="circuit-page__hero-actions">
            <a href="${t(i.safarisHref)}" class="btn btn--on-media">Safaris in this circuit</a>
            <a href="/circuits.html" class="btn btn--secondary btn--ghost-light">All Circuits</a>
          </div>
        </div>
      </header>

      <section class="circuit-page__intro">
        <div class="container circuit-page__intro-inner section-reveal">
          <p class="circuit-page__intro-lead">${t(i.lead)}</p>
          <p class="circuit-page__intro-text">${t(i.description)}</p>
        </div>
      </section>

      <section class="circuit-page__destinations" aria-labelledby="circuit-destinations-title">
        <div class="container">
          <header class="home-section__header section-reveal">
            <span class="home-section__label">Destinations</span>
            <h2 id="circuit-destinations-title" class="home-section__title">Parks & places</h2>
            <p class="home-section__desc">Explore every destination in the ${t(i.name)}.</p>
          </header>
          <div id="circuit-destinations-grid" class="dest-cards-grid dest-cards-grid--b"></div>
        </div>
      </section>

      ${i.safariCount?`
      <section class="circuit-page__safaris-cta section-reveal">
        <div class="container circuit-page__safaris-inner">
          <div class="circuit-page__safaris-copy">
            <span class="home-section__label">Safari Packages</span>
            <h2 class="home-section__title">${i.safariCount} routes in ${t(i.name)}</h2>
            <p class="home-section__desc">Real itineraries with day-by-day plans – ready to tailor from Iringa.</p>
          </div>
          <a href="${t(i.safarisHref)}" class="btn btn--primary">View ${t(i.name)} Safaris</a>
        </div>
      </section>
      `:""}

      <section class="circuit-page__related" aria-labelledby="other-circuits-title">
        <div class="container">
          <header class="home-section__header section-reveal">
            <span class="home-section__label">More circuits</span>
            <h2 id="other-circuits-title" class="home-section__title">Explore elsewhere</h2>
          </header>
          <div class="circuit-page__related-grid">${f(i.id)}</div>
        </div>
      </section>
    </article>
  `,h("#circuit-destinations-grid","b",{destinations:l(e)}),!0}function y(){const a=document.body.dataset.circuitId;return a||new URLSearchParams(window.location.search).get("circuit")||""}function c(){try{d(),u();const a=y();b("#circuit-page-root",a)||v("#circuit-page-root"),p(),_(),g()}catch(a){console.error("Matembo circuit page init failed:",a)}finally{m()}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):c();
