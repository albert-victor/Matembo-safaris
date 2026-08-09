import{n as u}from"./render-home-XFWJLOTR.js";function e(a){const d=document.createElement("div");return d.textContent=a,d.innerHTML}function l(a){return`/destinations/${encodeURIComponent(a.id)}.html`}function n(a,d=""){return a.map((s,t)=>`
        <div class="dest-slideshow__slide ${d} ${t===0?"is-active":""}" data-slide>
          <img
            src="${e(s.src)}"
            alt="${e(s.alt)}"
            width="640"
            height="400"
            loading="${t===0?"eager":"lazy"}"
            decoding="async"
          />
        </div>
      `).join("")}function _(a){return Array.from({length:a},(d,s)=>`<button type="button" class="dest-slideshow__dot ${s===0?"is-active":""}" data-slide-dot aria-label="Show image ${s+1}" aria-selected="${s===0?"true":"false"}"></button>`).join("")}function m(a){return a.map(d=>`<li class="dest-card__highlight">${e(d)}</li>`).join("")}function $(a){return a.journeys?`<p class="dest-card__journeys">${e(a.journeys)}</p>`:""}function o(a,d){const s=d%3,t=a.bestSeason?`<span class="dest-card__season">${e(a.bestSeason)}</span>`:"";return`
    <article class="dest-card dest-card--a" id="${e(a.id)}" data-reveal ${s?`data-reveal-delay="${s}"`:""}>
      <div class="dest-card__frame" data-tilt>
        <div class="dest-card__inner">
          <span class="dest-card__index" aria-hidden="true">${String(d+1).padStart(2,"0")}</span>

          <div class="dest-card__media" data-slideshow data-interval="4500">
            <span class="dest-card__bracket dest-card__bracket--tl" aria-hidden="true"></span>
            <span class="dest-card__bracket dest-card__bracket--br" aria-hidden="true"></span>
            <div class="dest-slideshow__track">
              ${n(a.images,"dest-slideshow__slide--motion")}
            </div>
            <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
            <div class="dest-card__overlay dest-card__overlay--green" aria-hidden="true"></div>
            ${t}
            <div class="dest-card__caption">
              <span class="dest-card__script">${e(a.scriptLabel)}</span>
              <h3 class="dest-card__name">${e(a.name)}</h3>
            </div>
            <div class="dest-slideshow__controls" aria-label="Image slideshow controls">
              <button type="button" class="dest-slideshow__arrow" data-slide-prev aria-label="Previous image">‹</button>
              <div class="dest-slideshow__dots">${_(a.images.length)}</div>
              <button type="button" class="dest-slideshow__arrow" data-slide-next aria-label="Next image">›</button>
            </div>
          </div>

          <div class="dest-card__perforation" aria-hidden="true"></div>

          <div class="dest-card__body">
            <p class="dest-card__region">${e(a.region)}${a.circuitLabel?` · ${e(a.circuitLabel)}`:""}</p>
            ${$(a)}
            <p class="dest-card__tagline">${e(a.tagline)}</p>
            <ul class="dest-card__highlights">${m(a.highlights)}</ul>
            <div class="dest-card__actions">
              <a href="${l(a)}" class="btn btn--primary btn--card">Explore ${e(a.name)}</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  `}function g(a,d){var i;const s=d%3,t=((i=a.highlights)==null?void 0:i.slice(0,3))||[];return`
    <article class="dest-card dest-card--b dest-card--teaser" id="${e(a.id)}" data-reveal ${s?`data-reveal-delay="${s}"`:""}>
      <div class="dest-card__cinema" data-slideshow data-interval="5200">
        <div class="dest-slideshow__track dest-slideshow__track--cinema">
          ${n(a.images)}
        </div>
        <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
        <div class="dest-card__overlay dest-card__overlay--green" aria-hidden="true"></div>

        <div class="dest-card__cinema-caption">
          <span class="dest-card__script">${e(a.scriptLabel)}</span>
          <h3 class="dest-card__name">${e(a.name)}</h3>
        </div>

        <div class="dest-slideshow__filmstrip" role="tablist" aria-label="Slideshow images">
          ${a.images.map((c,r)=>`<button type="button" class="dest-slideshow__frame-mark ${r===0?"is-active":""}" data-slide-dot aria-label="Show image ${r+1}"></button>`).join("")}
        </div>
      </div>

      <a class="dest-card__cinema-body dest-card__cinema-body--teaser" href="${l(a)}">
        ${t.length?`<ul class="dest-card__tags">${t.map(c=>`<li>${e(c)}</li>`).join("")}</ul>`:""}
        <span class="dest-card__link">Explore ${e(a.name)} →</span>
      </a>
    </article>
  `}function b(a,d){const s=d%3;return`
    <article class="dest-card dest-card--c" id="${e(a.id)}" data-reveal ${s?`data-reveal-delay="${s}"`:""}>
      <div class="dest-card__atlas">
        <div class="dest-card__atlas-media" data-slideshow data-interval="6000">
          <div class="dest-slideshow__track">
            ${n(a.images,"dest-slideshow__slide--motion")}
          </div>
          <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
          <div class="dest-card__compass" aria-hidden="true">✦</div>
          <div class="dest-slideshow__dots dest-slideshow__dots--compact">${_(a.images.length)}</div>
        </div>

        <div class="dest-card__atlas-body">
          <span class="dest-card__script dest-card__script--small">${e(a.scriptLabel)}</span>
          <h3 class="dest-card__name dest-card__name--compact">${e(a.name)}</h3>
          <p class="dest-card__meta-line">${e(a.region)} · ${e(a.bestSeason)}</p>
          <p class="dest-card__tagline dest-card__tagline--compact">${e(a.highlights[0]||a.tagline)}</p>
          <div class="dest-card__actions dest-card__actions--single">
            <a href="${l(a)}" class="btn btn--primary btn--card">Explore ${e(a.name)}</a>
          </div>
        </div>
      </div>
    </article>
  `}function w(a,d="a",s={}){const t=document.querySelector(a);if(!t)return;const{ids:i,destinations:c}=s;let r=c||u;i!=null&&i.length&&(r=i.map(h=>r.find(p=>p.id===h)).filter(Boolean));const v={a:o,b:g,c:b}[d]||o;t.innerHTML=r.map(v).join("")}export{w as r};
