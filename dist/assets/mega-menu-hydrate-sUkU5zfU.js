import{m as u,o as g,p as d}from"./render-home-BvSrwE3U.js";import"./paths-BeSZcpY7.js";import"./scroll-reveal-BxdqyS58.js";import"./destinations-data-DBODsxHG.js";import"./content-utils-YZbAt33H.js";function s(e){const a=document.createElement("div");return a.textContent=e,a.innerHTML}function o(e,a,t,n,m=""){return e?`<img
    class="${a}"
    src="${s(e)}"
    alt="${s(m)}"
    width="${t}"
    height="${n}"
    loading="lazy"
    decoding="async"
  />`:""}function _(e){return e.map(a=>`
        <li class="mega-menu__list-item">
          <a class="mega-menu__list-link" href="${s(a.href)}">
            ${a.image?`<span class="mega-menu__list-thumb-wrap">
                    ${o(a.image,"mega-menu__list-thumb",52,52)}
                  </span>`:""}
            <span class="mega-menu__list-text">
              <span class="mega-menu__list-name">${s(a.name)}</span>
              ${a.script||a.desc?`<span class="mega-menu__list-script">${s(a.script||a.desc)}</span>`:""}
            </span>
          </a>
        </li>
      `).join("")}function p(e){return e?`
    <aside class="mega-menu__aside">
      ${e.image?`<span class="mega-menu__aside-media">
              ${o(e.image,"",280,120)}
              <span class="mega-menu__aside-shade" aria-hidden="true"></span>
            </span>`:""}
      <div class="mega-menu__aside-body">
        ${e.label?`<span class="mega-menu__aside-label">${s(e.label)}</span>`:""}
        ${e.title?`<span class="mega-menu__aside-title">${s(e.title)}</span>`:""}
        ${e.tags?`<span class="mega-menu__aside-tags">${s(e.tags)}</span>`:""}
        ${e.quote?`<blockquote class="mega-menu__aside-quote">"${s(e.quote)}"</blockquote>`:""}
        ${e.ctaHref?`<a href="${s(e.ctaHref)}" class="btn btn--primary-dark mega-menu__aside-cta">${s(e.ctaText||"Learn more")}</a>`:""}
      </div>
    </aside>
  `:""}function $(e,a=""){const{featured:t,heading:n,items:m,aside:i,footer:l}=e,c=!!t,r=c?`
      <a class="mega-menu__spotlight" href="${s(t.href)}">
        <span class="mega-menu__spotlight-media">
          ${o(t.image,"",320,400,t.alt||t.name)}
          <span class="mega-menu__spotlight-shade" aria-hidden="true"></span>
        </span>
        <span class="mega-menu__spotlight-body">
          <span class="mega-menu__spotlight-label">${s(t.label)}</span>
          <span class="mega-menu__spotlight-title">${s(t.name)}</span>
          <span class="mega-menu__spotlight-desc">${s(t.desc)}</span>
        </span>
      </a>
    `:"";return`
    <div class="mega-menu mega-menu--editorial${c?"":" mega-menu--no-spotlight"}${a?` ${a}`:""}">
      <div class="mega-menu__align">
        <div class="mega-menu__shell">
          ${r}
          <div class="mega-menu__core">
            <header class="mega-menu__head">
              <span class="mega-menu__head-label">${s(n.label)}</span>
              <h3 class="mega-menu__head-title">${s(n.title)}</h3>
            </header>
            <ul class="mega-menu__list">${_(m)}</ul>
            ${l?`<footer class="mega-menu__foot">
                    <a href="${s(l.href)}" class="mega-menu__foot-link">${s(l.text)}</a>
                  </footer>`:""}
          </div>
          ${p(i)}
        </div>
      </div>
    </div>
  `}async function M(e=document){const a=e instanceof Document?e:e.ownerDocument||document;if(a.documentElement.dataset.megaHydrated)return;a.documentElement.dataset.megaHydrated="1";const t=[...a.querySelectorAll("[data-mega-slot]")];if(t.length){for(const n of t){const m=n.getAttribute("data-mega-slot"),i=d[m];if(!i)continue;const l=m==="about"?"mega-menu--about":"";n.insertAdjacentHTML("beforeend",$(i,l)),n.removeAttribute("data-mega-slot"),n.setAttribute("data-mega","")}u(a),g()}}export{M as hydrateMegaMenus};
