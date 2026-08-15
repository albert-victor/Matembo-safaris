import"./buttons-r323SqNs.js";import{r as n,a as o,i as d}from"./render-home-V4yjOGkn.js";/* empty css                 */import{getAllCircuitsPageData as l,allCircuitsPageMeta as p}from"./circuits-page-data-tkaUj7lL.js";import{a as u,i as m}from"./scroll-reveal-6DLuizO8.js";import"./paths-BeSZcpY7.js";import"./destinations-data-D-DgQGhw.js";import"./safari-packages-B2QcG3ea.js";function t(a){const e=document.createElement("div");return e.textContent=a??"",e.innerHTML}function _(a,e){const i=e%3;return`
    <article class="circuit-card" data-reveal ${i?`data-reveal-delay="${i}"`:""}>
      <a class="circuit-card__link" href="${t(a.pageHref)}">
        <span class="circuit-card__media">
          <img
            data-src="${t(a.hero.src)}"
            data-img-preset="card"
            src=""
            alt="${t(a.hero.alt)}"
            width="640"
            height="400"
            loading="lazy"
            decoding="async"
          />
          <span class="circuit-card__shade" aria-hidden="true"></span>
        </span>
        <span class="circuit-card__body">
          <span class="circuit-card__label">${t(a.name)}</span>
          <span class="circuit-card__script">${t(a.script)}</span>
          <p class="circuit-card__desc">${t(a.lead)}</p>
          <span class="circuit-card__meta">
            ${a.destinationCount} destinations
            ${a.safariCount?` · ${a.safariCount} safaris`:""}
          </span>
          <span class="circuit-card__cta">Explore circuit →</span>
        </span>
      </a>
    </article>
  `}function h(){const a=l(),e=p;document.title=`${e.title} | Matembo Safari & Tours`;const i=document.querySelector('meta[name="description"]');i&&i.setAttribute("content",e.lead);const r=document.querySelector("#circuits-hero-root"),c=document.querySelector("#circuits-grid-root");r&&(r.innerHTML=`
      <header class="circuit-page__hero circuit-page__hero--index" data-hero>
        <div class="circuit-page__hero-media">
          <img
            data-src="${t(e.hero.src)}"
            data-img-preset="hero"
            src=""
            alt="${t(e.hero.alt)}"
            width="1600"
            height="680"
            loading="eager"
            decoding="async"
          />
          <div class="circuit-page__hero-shade" aria-hidden="true"></div>
        </div>
        <div class="container circuit-page__hero-inner section-reveal">
          <p class="circuit-page__eyebrow">Matembo Safari & Tours</p>
          <h1 class="circuit-page__title">${t(e.title)}</h1>
          <p class="circuit-page__script">${t(e.script)}</p>
          <p class="circuit-page__lead">${t(e.lead)}</p>
          <div class="circuit-page__hero-actions">
            <a href="#circuits-grid" class="btn btn--on-media">Browse Circuits</a>
            <a href="/destinations.html" class="btn btn--secondary btn--ghost-light">All Destinations</a>
          </div>
        </div>
      </header>
    `),c&&(c.innerHTML=a.map(_).join(""))}function s(){try{n(),o(),h(),d(),u()}catch(a){console.error("Matembo circuits page init failed:",a)}finally{m()}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",s):s();
