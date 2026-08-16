import"./buttons-r323SqNs.js";import{h as l,p as m,j as _,r as g,a as h,i as v,n as u}from"./render-home-DkvHZ7K0.js";/* empty css                     */import{a as p,i as $}from"./scroll-reveal-6DLuizO8.js";import{initSlideshows as y}from"./slideshow-B52kY28T.js";import"./paths-BeSZcpY7.js";import"./destinations-data-DBODsxHG.js";function i(e){const a=document.createElement("div");return a.textContent=e,a.innerHTML}function f(e,a){var r;const t=a%3,s=((r=e.highlights)==null?void 0:r.slice(0,2))||[],d=m(e,1)[0]||e.images[0];return`
    <article class="dest-card dest-card--b dest-card--teaser" id="${i(e.id)}" data-reveal ${t?`data-reveal-delay="${t}"`:""}>
      <div class="dest-card__cinema">
        <div class="dest-slideshow__track dest-slideshow__track--cinema">
          <div class="dest-slideshow__slide is-active" data-slide>
            <img
              data-src="${i(d.src)}"
              data-img-preset="card"
              src=""
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

      <a class="dest-card__cinema-body dest-card__cinema-body--teaser" href="${_(e)}">
        ${s.length?`<ul class="dest-card__tags">${s.map(o=>`<li>${i(o)}</li>`).join("")}</ul>`:""}
        <p class="dest-card__tagline dest-card__tagline--compact">${i(e.tagline)}</p>
        <span class="dest-card__link">Explore ${i(e.name)} →</span>
      </a>
    </article>
  `}function L(e){const a=document.querySelector(e);a&&(a.innerHTML=l.map((t,s)=>f(t,s)).join(""))}function n(e){const a=document.createElement("div");return a.textContent=e,a.innerHTML}function S(){const e=document.querySelector("#things-to-do-index");e&&(e.innerHTML=u.map(a=>`
        <ul class="things-to-do-index__col">
          ${a.map(t=>`
            <li>
              <a class="things-to-do-index__link" href="${n(t.href)}">
                ${t.image?`<img class="things-to-do-index__thumb" data-src="${n(t.image)}" data-img-preset="thumb" src="" alt="" loading="lazy" width="40" height="40" decoding="async" />`:""}
                <span>${n(t.name)}</span>
              </a>
            </li>
          `).join("")}
        </ul>
      `).join(""))}function c(){g(),h(),S(),L("#experiences-grid"),v(),p(),y(),$()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):c();
