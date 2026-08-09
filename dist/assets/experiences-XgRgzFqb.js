import"./buttons-DmxYQrBH.js";import{k as l,l as m,r as _,a as g,i as h,m as v}from"./render-home-XFWJLOTR.js";/* empty css                     */import{p as u}from"./content-utils-B_0c1a9b.js";import{i as p}from"./scroll-reveal-DRkjB4s9.js";import{i as $}from"./slideshow-DONQcubt.js";import"./paths-pBgruvT_.js";function i(e){const a=document.createElement("div");return a.textContent=e,a.innerHTML}function f(e,a){var r;const t=a%3,n=((r=e.highlights)==null?void 0:r.slice(0,2))||[],d=u(e,1)[0]||e.images[0];return`
    <article class="dest-card dest-card--b dest-card--teaser" id="${i(e.id)}" data-reveal ${t?`data-reveal-delay="${t}"`:""}>
      <div class="dest-card__cinema">
        <div class="dest-slideshow__track dest-slideshow__track--cinema">
          <div class="dest-slideshow__slide is-active" data-slide>
            <img
              src="${i(d.src)}"
              alt="${i(d.alt||e.name)}"
              width="640"
              height="400"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
        <div class="dest-card__overlay dest-card__overlay--green" aria-hidden="true"></div>
        <div class="dest-card__cinema-caption">
          <span class="dest-card__script">${i(e.scriptLabel)}</span>
          <h3 class="dest-card__name">${i(e.name)}</h3>
        </div>
      </div>

      <a class="dest-card__cinema-body dest-card__cinema-body--teaser" href="${m(e)}">
        ${n.length?`<ul class="dest-card__tags">${n.map(o=>`<li>${i(o)}</li>`).join("")}</ul>`:""}
        <p class="dest-card__tagline dest-card__tagline--compact">${i(e.tagline)}</p>
        <span class="dest-card__link">Explore ${i(e.name)} →</span>
      </a>
    </article>
  `}function y(e){const a=document.querySelector(e);a&&(a.innerHTML=l.map((t,n)=>f(t,n)).join(""))}function s(e){const a=document.createElement("div");return a.textContent=e,a.innerHTML}function S(){const e=document.querySelector("#things-to-do-index");e&&(e.innerHTML=v.map(a=>`
        <ul class="things-to-do-index__col">
          ${a.map(t=>`
            <li>
              <a class="things-to-do-index__link" href="${s(t.href)}">
                ${t.image?`<img class="things-to-do-index__thumb" src="${s(t.image)}" alt="" loading="lazy" width="40" height="40" />`:""}
                <span>${s(t.name)}</span>
              </a>
            </li>
          `).join("")}
        </ul>
      `).join(""))}function c(){_(),g(),S(),y("#experiences-grid"),h(),$(),p()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):c();
