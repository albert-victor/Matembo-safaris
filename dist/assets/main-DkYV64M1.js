import"./buttons-DlXGXn9P.js";/* empty css              */import{N as b,k as R,c as B,r as O,i as G,p as K,a as Z}from"./render-home-miLWeeLX.js";/* empty css             */import{a as V,b as Q,c as U,d as J,e as X,f as Y,r as ee,i as ae}from"./render-home-sections-DjZsYrNE.js";import{l as N,a as te,i as ie}from"./scroll-reveal-B17FauD6.js";import{i as se}from"./slideshow-BaSkx9Wz.js";import{i as re}from"./card-tilt-DGI_hcNQ.js";import{p,m as x,a as F}from"./perf-debug-DFD6pUFf.js";import"./preload-helper-DsQV4sYi.js";import"./render-cards-lSM9ICI4.js";const y="https://www.tanzaniatourism.com/images/uploads";function _(e,a){var t,i;const s=R.find(o=>o.id===e);return((i=(t=s==null?void 0:s.images)==null?void 0:t[0])==null?void 0:i.src)||a}function ne(e,a=0,s=""){var i,o,c,l;const t=B.find(d=>d.id===e);return((o=(i=t==null?void 0:t.images)==null?void 0:i[a])==null?void 0:o.src)||((l=(c=t==null?void 0:t.images)==null?void 0:c[0])==null?void 0:l.src)||s}const w={label:"What We Do Best",title:"Safari Experiences, Crafted in the Field",desc:"From Ruaha river drives to Serengeti migration days – browse the journeys Matembo plans every week across Tanzania."},S=[{id:"game-drives",title:"Game Drives",icon:"fa-binoculars",description:"Private 4×4 days across Tanzania's great parks – dawn starts, patient guides, and time at every sighting.",highlights:["Serengeti & Ngorongoro","Ruaha river bends","Mikumi plains"],image:_("game-drives",`${y}/Serengeti_National_Park_Leopard_24.jpg`),imageAlt:"Leopard on a Serengeti game drive",href:"/game-drives.html"},{id:"walking-safaris",title:"Walking Safaris",icon:"fa-person-hiking",description:"Guided bush walks and forest trails – read tracks, birds and smaller life up close with licensed walking guides.",highlights:["Udzungwa forest","Crater rim hikes","Bush foot safaris"],image:_("hiking",b.shiraDay),imageAlt:"Walking safari in Tanzania highlands",href:"/walking-safaris.html"},{id:"cultural",title:"Cultural Experiences",icon:"fa-people-group",description:"Immerse in Tanzanian traditions – Maasai villages, handicrafts, local markets and authentic community visits.",highlights:["Maasai villages","Handicrafts","Traditional ceremonies"],image:"/assets/about/cultural visits.jpg",imageAlt:"Cultural visit with local community in Tanzania",href:"/cultural-visits.html"},{id:"migration",title:"Great Migration",icon:"fa-route",description:"Follow wildebeest herds and river crossings on the Serengeti corridor – timed to the season you travel.",highlights:["River crossings","Calving season","Private positioning"],image:_("great-migration",b.migration),imageAlt:"Wildebeest migration on the Serengeti plains",href:"/experiences/great-migration.html"},{id:"trekking",title:"Mountain Climbing",icon:"fa-mountain",description:"Kilimanjaro summit routes, Mount Meru and highland treks – porters, camps and guides who know every ridge.",highlights:["Kilimanjaro routes","Mount Meru","Highland hikes"],image:b.machame8d,imageAlt:"Kilimanjaro mountain trekking",href:"/trekkings.html"},{id:"beach",title:"Beach & Coast",icon:"fa-umbrella-beach",description:"Stone Town escapes, spice tours and Indian Ocean relaxation – the perfect bush-and-beach finish.",highlights:["Zanzibar beaches","Spice tours","Island day trips"],image:ne("zanzibar",2,`${y}/Zanzibar_Prestine_Beach_04.jpg`),imageAlt:"Pristine beach on Zanzibar Island",href:"/beach-holiday.html"},{id:"day-trips",title:"Day Trips",icon:"fa-sun",description:"Crater descents, lake circuits and town excursions – compact days when your calendar is tight.",highlights:["Ngorongoro Crater","Lake Manyara","Isimila pillars"],image:"/assets/about/ngorongoro.jpg",imageAlt:"Ngorongoro Crater day trip",href:"/game-drives.html"},{id:"multi-day",title:"Multi-Day Safaris",icon:"fa-calendar-days",description:"Week-long routes across north and south – lodges matched to your budget, pace shaped around your group.",highlights:["Northern circuit","Southern icons","Bush & beach combos"],image:b.ruaha3d,imageAlt:"Elephants on a multi-day Ruaha safari",href:"/safaris.html"},{id:"birding",title:"Bird Watching",icon:"fa-feather",description:"Specialist birding days with guides who know every call – from flamingo lakes to forest endemics.",highlights:["Lake Manyara","Ruaha raptors","Forest species"],image:_("bird-watching",`${y}/Arusha_National_Park_Momella_Lake_Flamingos_65.jpg`),imageAlt:"Flamingos at Momella Lake, Arusha National Park",href:"/bird-watching.html"}];function n(e){const a=document.createElement("div");return a.textContent=e,a.innerHTML}function oe(e){return`
    <div class="svc-panel__media">
      <img
        data-src="${n(e.image)}"
        data-img-preset="card"
        src=""
        alt="${n(e.imageAlt)}"
        width="720"
        height="480"
        decoding="async"
        data-fallback="/assets/about/main3.jpg"
      />
      <div class="svc-panel__scrim" aria-hidden="true"></div>
      <span class="svc-panel__script">${n(e.title)}</span>
    </div>
  `}function ce(){const e=document.querySelector("#home-services-showcase");if(!e)return;const a=S.map((t,i)=>`
        <button
          type="button"
          class="svc-rail__item${i===0?" is-active":""}"
          data-svc-tab="${t.id}"
          aria-selected="${i===0?"true":"false"}"
        >
          <span class="svc-rail__num">${String(i+1).padStart(2,"0")}</span>
          <span class="svc-rail__icon"><i class="fas ${n(t.icon)}" aria-hidden="true"></i></span>
          <span class="svc-rail__label">${n(t.title)}</span>
        </button>
      `).join(""),s=S.map((t,i)=>`
        <article class="svc-panel${i===0?" is-active":""}" data-svc-panel="${n(t.id)}" aria-hidden="${i===0?"false":"true"}">
          ${oe(t)}
          <div class="svc-panel__body">
            <h3 class="svc-panel__title">${n(t.title)}</h3>
            <p class="svc-panel__desc">${n(t.description)}</p>
            <ul class="svc-panel__tags">
              ${t.highlights.map(o=>`<li>${n(o)}</li>`).join("")}
            </ul>
            <a href="${n(t.href)}" class="btn btn--secondary svc-panel__cta">Explore ${n(t.title)}</a>
          </div>
        </article>
      `).join("");e.innerHTML=`
    <section class="svc-field" id="services" aria-labelledby="services-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${n(w.label)}</span>
          <h2 id="services-title" class="home-section__title">${n(w.title)}</h2>
          <p class="home-section__desc">${n(w.desc)}</p>
        </header>
      </div>

      <div class="svc-field__wrap section-reveal" data-services-showcase>
        <div class="container">
          <div class="svc-rail" role="tablist" aria-label="Safari services">${a}</div>
        </div>
        <div class="container svc-stage">${s}</div>
        <div class="svc-field__dots container" role="tablist" aria-label="Service pages">
          ${S.map((t,i)=>`
            <button type="button" class="svc-field__dot${i===0?" is-active":""}" data-svc-dot="${i}" aria-label="Service ${i+1}"></button>
          `).join("")}
        </div>
      </div>
    </section>
  `}function le(e){e.addEventListener("error",()=>{const a=e.getAttribute("data-src")||e.dataset.srcOriginal;if(a&&e.src.includes("/images/made/")&&!e.dataset.retriedOriginal){e.dataset.retriedOriginal="1",e.dataset.srcOriginal=a,e.src=a;return}const s=e.getAttribute("data-fallback");s&&!e.dataset.fallbackApplied&&!e.src.includes(s.replace(/^\//,""))&&(e.dataset.fallbackApplied="1",e.src=s)})}function de(){const e=document.querySelector("[data-services-showcase]");if(!e)return;const a=[...e.querySelectorAll("[data-svc-tab]")],s=[...e.querySelectorAll("[data-svc-panel]")],t=[...e.querySelectorAll("[data-svc-dot]")];e.querySelectorAll(".svc-panel__media img").forEach(le);let i=0;const o=c=>{var l;i=(c+s.length)%s.length,a.forEach((d,r)=>{const u=r===i;d.classList.toggle("is-active",u),d.setAttribute("aria-selected",u?"true":"false")}),s.forEach((d,r)=>{const u=r===i;d.classList.toggle("is-active",u),d.setAttribute("aria-hidden",u?"false":"true")}),t.forEach((d,r)=>d.classList.toggle("is-active",r===i)),N(s[i],{priority:!0}),(l=a[i])==null||l.scrollIntoView({inline:"nearest",block:"nearest",behavior:"smooth"})};a.forEach((c,l)=>c.addEventListener("click",()=>o(l))),t.forEach((c,l)=>c.addEventListener("click",()=>o(l))),N(s[0],{priority:!0})}function he(){const e=document.querySelector("[data-hero-slideshow]");if(!e)return;const a=[...e.querySelectorAll("[data-hero-slide]")],s=[...e.querySelectorAll("[data-hero-panel]")],t=[...e.querySelectorAll("[data-hero-dot]")],i=e.querySelector("[data-hero-counter]"),o=e.querySelector("[data-hero-prev]"),c=e.querySelector("[data-hero-next]");if(!a.length||a.length!==s.length)return;const l=window.matchMedia("(prefers-reduced-motion: reduce)").matches,d=Number(e.dataset.interval||7e3);let r=0,u=null;function P(h){return String(h+1).padStart(2,"0")}function W(h){const m=h==null?void 0:h.querySelector(".hero-showcase__img");!m||l||(m.style.transition="none",m.offsetWidth,m.style.transition="")}function v(h){var M,L,$,E,j,I,q,C,T,z;const m=(h+a.length)%a.length;m!==r&&((M=a[r])==null||M.classList.remove("is-active"),(L=s[r])==null||L.classList.remove("is-active"),($=s[r])==null||$.setAttribute("aria-hidden","true"),(E=t[r])==null||E.classList.remove("is-active"),(j=t[r])==null||j.setAttribute("aria-selected","false"),r=m,(I=a[r])==null||I.classList.add("is-active"),W(a[r]),(q=s[r])==null||q.classList.add("is-active"),(C=s[r])==null||C.setAttribute("aria-hidden","false"),(T=t[r])==null||T.classList.add("is-active"),(z=t[r])==null||z.setAttribute("aria-selected","true"),i&&(i.textContent=`${P(r)} / ${String(a.length).padStart(2,"0")}`))}const A=()=>v(r+1),D=()=>v(r-1),f=()=>{u&&(clearInterval(u),u=null)},g=()=>{l||a.length<=1||(f(),u=window.setInterval(A,d))};t.forEach((h,m)=>{h.addEventListener("click",()=>{v(m),g()})}),o==null||o.addEventListener("click",()=>{D(),g()}),c==null||c.addEventListener("click",()=>{A(),g()}),e.addEventListener("mouseenter",f),e.addEventListener("mouseleave",g),e.addEventListener("focusin",f),e.addEventListener("focusout",h=>{e.contains(h.relatedTarget)||g()}),document.addEventListener("visibilitychange",()=>{document.hidden?f():g()}),v(0),g()}const k=performance.now();async function ue(){const e=performance.now();K(),ce(),V(),await Q(),U(),J(),X(),Y(),Z(),ee(),de(),ae(),he(),te(),se(),re(),requestAnimationFrame(()=>{requestAnimationFrame(()=>{ie(),p("home-main.js:render","home render complete",{renderMs:Math.round(performance.now()-e),totalMs:Math.round(performance.now()-k),images:F(),dom:x()},"B"),requestAnimationFrame(()=>{p("home-main.js:raf","post-paint snapshot",{totalMs:Math.round(performance.now()-k),images:F(),dom:x(),scrollHandlers:window.__perfScrollHandlers||0,autosliderLayouts:window.__perfAutosliderLayouts||0},"C")})})})}function H(){const e=performance.now();try{O(),G(),p("home-main.js:nav","nav ready",{navMs:Math.round(performance.now()-e),elapsedMs:Math.round(performance.now()-k)},"A"),ue().catch(a=>{console.error("Matembo home content init failed:",a),p("home-main.js:error","home content failed",{error:String(a)},"A")})}catch(a){console.error("Matembo home init failed:",a),p("home-main.js:error","home init failed",{error:String(a)},"A")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",H):H();
