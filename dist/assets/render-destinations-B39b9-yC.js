import{n as m}from"./render-home-miLWeeLX.js";function s(a){const e=document.createElement("div");return e.textContent=a,e.innerHTML}function l(a){return`/destinations/${encodeURIComponent(a.id)}.html`}function n(a,e="",d=0){return a.map((t,i)=>`
        <div class="dest-slideshow__slide ${e} ${i===0?"is-active":""}" data-slide>
          <img
            data-src="${s(t.src)}"
            data-img-preset="card"
            src=""
            alt="${s(t.alt)}"
            width="640"
            height="400"
            loading="lazy"
            decoding="async"
          />
        </div>
      `).join("")}function _(a){return Array.from({length:a},(e,d)=>`<button type="button" class="dest-slideshow__dot ${d===0?"is-active":""}" data-slide-dot aria-label="Show image ${d+1}" aria-selected="${d===0?"true":"false"}"></button>`).join("")}function u(a){return a.map(e=>`<li class="dest-card__highlight">${s(e)}</li>`).join("")}function $(a){return a.journeys?`<p class="dest-card__journeys">${s(a.journeys)}</p>`:""}function o(a,e){const d=e%3,t=a.bestSeason?`<span class="dest-card__season">${s(a.bestSeason)}</span>`:"";return`
    <article class="dest-card dest-card--a" id="${s(a.id)}" data-reveal ${d?`data-reveal-delay="${d}"`:""}>
      <div class="dest-card__frame" data-tilt>
        <div class="dest-card__inner">
          <span class="dest-card__index" aria-hidden="true">${String(e+1).padStart(2,"0")}</span>

          <div class="dest-card__media" data-slideshow data-interval="4500">
            <span class="dest-card__bracket dest-card__bracket--tl" aria-hidden="true"></span>
            <span class="dest-card__bracket dest-card__bracket--br" aria-hidden="true"></span>
            <div class="dest-slideshow__track">
              ${n(a.images,"dest-slideshow__slide--motion",e)}
            </div>
            <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
            <div class="dest-card__overlay dest-card__overlay--green" aria-hidden="true"></div>
            ${t}
            <div class="dest-card__caption">
              <span class="dest-card__script">${s(a.scriptLabel)}</span>
              <h3 class="dest-card__name">${s(a.name)}</h3>
            </div>
            <div class="dest-slideshow__controls" aria-label="Image slideshow controls">
              <button type="button" class="dest-slideshow__arrow" data-slide-prev aria-label="Previous image">‹</button>
              <div class="dest-slideshow__dots">${_(a.images.length)}</div>
              <button type="button" class="dest-slideshow__arrow" data-slide-next aria-label="Next image">›</button>
            </div>
          </div>

          <div class="dest-card__perforation" aria-hidden="true"></div>

          <div class="dest-card__body">
            <p class="dest-card__region">${s(a.region)}${a.circuitLabel?` · ${s(a.circuitLabel)}`:""}</p>
            ${$(a)}
            <p class="dest-card__tagline">${s(a.tagline)}</p>
            <ul class="dest-card__highlights">${u(a.highlights)}</ul>
            <div class="dest-card__actions">
              <a href="${l(a)}" class="btn btn--primary btn--card">Explore ${s(a.name)}</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  `}function g(a,e){var i;const d=e%3,t=((i=a.highlights)==null?void 0:i.slice(0,3))||[];return`
    <article class="dest-card dest-card--b dest-card--teaser" id="${s(a.id)}" data-reveal ${d?`data-reveal-delay="${d}"`:""}>
      <div class="dest-card__cinema" data-slideshow data-interval="5200">
        <div class="dest-slideshow__track dest-slideshow__track--cinema">
          ${n(a.images,"",e)}
        </div>
        <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
        <div class="dest-card__overlay dest-card__overlay--green" aria-hidden="true"></div>

        <div class="dest-card__cinema-caption">
          <span class="dest-card__script">${s(a.scriptLabel)}</span>
          <h3 class="dest-card__name">${s(a.name)}</h3>
        </div>

        <div class="dest-slideshow__filmstrip" role="tablist" aria-label="Slideshow images">
          ${a.images.map((c,r)=>`<button type="button" class="dest-slideshow__frame-mark ${r===0?"is-active":""}" data-slide-dot aria-label="Show image ${r+1}"></button>`).join("")}
        </div>
      </div>

      <a class="dest-card__cinema-body dest-card__cinema-body--teaser" href="${l(a)}">
        ${t.length?`<ul class="dest-card__tags">${t.map(c=>`<li>${s(c)}</li>`).join("")}</ul>`:""}
        <span class="dest-card__link">Explore ${s(a.name)} →</span>
      </a>
    </article>
  `}function b(a,e){const d=e%3;return`
    <article class="dest-card dest-card--c" id="${s(a.id)}" data-reveal ${d?`data-reveal-delay="${d}"`:""}>
      <div class="dest-card__atlas">
        <div class="dest-card__atlas-media" data-slideshow data-interval="6000">
          <div class="dest-slideshow__track">
            ${n(a.images,"dest-slideshow__slide--motion",e)}
          </div>
          <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
          <div class="dest-card__compass" aria-hidden="true">✦</div>
          <div class="dest-slideshow__dots dest-slideshow__dots--compact">${_(a.images.length)}</div>
        </div>

        <div class="dest-card__atlas-body">
          <span class="dest-card__script dest-card__script--small">${s(a.scriptLabel)}</span>
          <h3 class="dest-card__name dest-card__name--compact">${s(a.name)}</h3>
          <p class="dest-card__meta-line">${s(a.region)} · ${s(a.bestSeason)}</p>
          <p class="dest-card__tagline dest-card__tagline--compact">${s(a.highlights[0]||a.tagline)}</p>
          <div class="dest-card__actions dest-card__actions--single">
            <a href="${l(a)}" class="btn btn--primary btn--card">Explore ${s(a.name)}</a>
          </div>
        </div>
      </div>
    </article>
  `}function w(a,e="a",d={}){const t=document.querySelector(a);if(!t)return;const{ids:i,destinations:c}=d;let r=c||m;i!=null&&i.length&&(r=i.map(h=>r.find(p=>p.id===h)).filter(Boolean));const v={a:o,b:g,c:b}[e]||o;t.innerHTML=r.map(v).join("")}export{w as r};
