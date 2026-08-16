const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/mega-menu-hydrate-CqBT6IlS.js","assets/paths-BeSZcpY7.js","assets/scroll-reveal-6DLuizO8.js","assets/destinations-data-DBODsxHG.js","assets/circuits-page-data-DVosJFBz.js","assets/safari-packages-CU_z_aDq.js"])))=>i.map(i=>d[i]);
import{_ as z,p as L}from"./paths-BeSZcpY7.js";import{l as ye}from"./scroll-reveal-6DLuizO8.js";import{g as ge}from"./destinations-data-DBODsxHG.js";const ke="/assets/about/descriptions.jpg",Se="/assets/about/Matembo logo.jpg",Z={name:"Matembo Safari & Tours",tagline:"Safari & Tours"},Me=[{label:"Home",href:"/",plain:!0},{label:"Destinations",href:"/circuits.html",megaKey:"destinations"},{label:"Safaris",href:"/safaris.html",megaKey:"safaris"},{label:"Things to Do",href:"/experiences.html",megaKey:"thingsToDo"},{label:"Ruaha",href:"/ruaha-safaris.html",megaKey:"ruaha"},{label:"About Us",href:"/about.html",megaKey:"about"}],Y="/assets/about/main3.jpg",Ae={ruaha2d:"/assets/photos/Ruaha_National_Park_Ruaha_River_42.jpg",ruaha3d:"/assets/photos/Ruaha_National_Park_Ruaha_River_39.jpg",ruaha4d:"/assets/photos/Ruaha_National_Park_Hippos_47.jpg",ruaha5d:"/assets/photos/Ruaha_National_Park_Elephants_49.jpg",ruaha7d:"/assets/photos/Udzungwa_National_Park_Sanje_Waterfalls_21.jpg",ruaha10d:"/assets/photos/Nyerere_National_Park_Lions_102.jpg",serengeti3d:"/assets/photos/Serengeti_Wildebeests_03.jpg",ngorongoroDay:"/assets/photos/Ngorongoro_Crater_01_NCA.jpg",tarangireDay:"/assets/photos/Tarangire_National_Park_Lions_20.jpg",serengeti5d:"/assets/photos/Serengeti_National_Park_Wildebeests_20.jpg",lemosho7d:"/assets/photos/Kilimanjaro_Trek_Lemosho_Route_04.jpg",machame8d:"/assets/photos/Kilimanjaro_Climb_Machame_Route_03.jpg",shiraDay:"/assets/photos/Kilimanjaro_Climb_Shira_Plateau_02.jpg",walkingSafaris:"/assets/about/walking safaris.jpg",migration:"/assets/photos/Serengeti_Wildebeests_03.jpg",olduvai:"/assets/photos/Olduvai_Gorge_NCA_2_1.jpg",udzungwa:"/assets/photos/Udzungwa_National_Park_Sanje_Waterfalls_21.jpg"};function je(e){const a=e.getAttribute("data-fallback")||Y;e.dataset.fallbackApplied||(e.dataset.fallbackApplied="1",e.src=a)}function Te(e=document){e.querySelectorAll(".mega-menu img, .site-header__brand-emblem").forEach(a=>{a.dataset.fallbackBound||(a.dataset.fallbackBound="1",a.addEventListener("error",()=>{if(a.hasAttribute("data-src"))return;const t=a.dataset.srcOriginal;if(t&&a.src.includes("/images/made/")&&!a.dataset.retriedOriginal){a.dataset.retriedOriginal="1",a.src=t;return}if(t&&!a.dataset.retriedOriginal&&a.src!==t){a.dataset.retriedOriginal="1",a.src=t;return}je(a)}))})}function N(e){const a=document.createElement("div");return a.textContent=e,a.innerHTML}function Ne(e){if(e.plain)return`
      <li class="site-nav__item">
        <a class="site-nav__trigger site-nav__trigger--plain" href="${N(e.href)}">${N(e.label)}</a>
      </li>
    `;const a=e.href?"a":"button",t=e.href?` href="${N(e.href)}"`:"",r=e.href?"":' type="button"';return`
    <li class="site-nav__item" data-mega-slot="${N(e.megaKey)}">
      <${a}
        class="site-nav__trigger"
        ${t}${r}
        aria-haspopup="true"
        aria-expanded="false"
      >
        ${N(e.label)}
        <svg class="site-nav__chevron" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </${a}>
    </li>
  `}function Ce(){const e=Me.map(Ne).join("");return`
    <header class="site-header is-over-hero" data-site-header>
      <div class="site-header__bar">
        <div class="container site-header__inner">
          <a class="site-header__brand" href="/" aria-label="${N(Z.name)} home">
            <span class="site-header__brand-emblem-wrap" aria-hidden="true">
              <img
                class="site-header__brand-emblem"
                src="${N(ke)}"
                alt=""
                width="58"
                height="58"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                data-fallback="${N(Y)}"
              />
            </span>
            <span class="site-header__brand-lockup">
              <span class="site-header__brand-wordmark">Matembo</span>
              <span class="site-header__brand-sub">${N(Z.tagline)}</span>
            </span>
          </a>

          <nav id="site-nav-panel" class="site-nav" aria-label="Main navigation">
            <div class="site-nav__mobile-head">
              <span class="site-nav__mobile-title">Menu</span>
              <button type="button" class="site-nav__close" data-nav-close aria-label="Close menu" aria-hidden="true">
                <i class="fas fa-xmark" aria-hidden="true"></i>
              </button>
            </div>
            <ul class="site-nav__list">${e}</ul>
            <div class="site-nav__mobile-cta">
              <a href="/contact.html" class="btn btn--primary site-nav__mobile-cta-primary">Plan Your Safari</a>
              <a href="/contact.html" class="btn btn--secondary site-nav__mobile-cta-secondary">Talk to Us</a>
            </div>
          </nav>

          <div class="site-header__end">
            <div class="site-header__tools" data-header-tools>
              <button
                type="button"
                class="site-header__search-toggle"
                data-search-toggle
                aria-expanded="false"
                aria-controls="site-search-overlay"
                aria-label="Search site"
              >
                <i class="fas fa-search" aria-hidden="true"></i>
              </button>
              <a href="/contact.html" class="btn btn--primary btn--nav site-header__cta">Plan your safari</a>
            </div>
            <button
              type="button"
              class="site-header__toggle"
              data-nav-toggle
              aria-expanded="false"
              aria-controls="site-nav-panel"
              aria-label="Open menu"
            >
              <span class="site-header__toggle-line"></span>
              <span class="site-header__toggle-line"></span>
              <span class="site-header__toggle-line"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
    <div class="site-nav-backdrop" data-nav-backdrop hidden aria-hidden="true"></div>

    <div class="site-search-overlay" data-search-overlay hidden aria-hidden="true">
      <div class="site-search-overlay__backdrop" data-search-close aria-hidden="true"></div>
      <div class="site-search-overlay__panel" role="dialog" aria-modal="true" aria-label="Search Matembo Safaris">
        <button type="button" class="site-search-overlay__close" data-search-close aria-label="Close search">
          <i class="fas fa-xmark" aria-hidden="true"></i>
        </button>
        <label class="site-search-overlay__label" for="site-search-input">Find your safari</label>
        <form class="site-search-overlay__form" data-search-form autocomplete="off">
          <div class="site-search-overlay__field">
            <span class="site-search-overlay__field-icon" aria-hidden="true"><i class="fas fa-search"></i></span>
            <input
              id="site-search-input"
              class="site-search-overlay__input"
              type="search"
              data-search-input
              placeholder="Serengeti, Ruaha, game drives, Kilimanjaro…"
              autocomplete="off"
              spellcheck="false"
            />
            <button type="submit" class="btn btn--secondary site-search-overlay__submit">Search</button>
          </div>
        </form>
        <div class="site-search-overlay__results" data-search-results role="listbox" aria-live="polite"></div>
      </div>
    </div>
  `}function Le(e="#site-nav-root"){var r;const a=document.querySelector(e);if(!a||a.querySelector("[data-site-header]"))return a;(r=a.querySelector("#nav-emblem-bootstrap"))==null||r.remove(),a.innerHTML=Ce();const t=a.querySelector(".site-header__brand-emblem");return t==null||t.setAttribute("data-fallback",Se),t==null||t.addEventListener("error",()=>{const s=t.getAttribute("data-fallback");s&&!t.src.includes(s)&&(t.src=s)},{once:!0}),a}let V=null;function Pe(e=document){const a=e instanceof Document?e:e.ownerDocument||document;if(a.querySelector("[data-mega]")||a.documentElement.dataset.megaHydrateScheduled)return;a.documentElement.dataset.megaHydrateScheduled="1";const t=()=>(V||(V=z(()=>import("./mega-menu-hydrate-CqBT6IlS.js"),__vite__mapDeps([0,1,2,3])).then(s=>s.hydrateMegaMenus(a))),V),r=()=>{t(),a.querySelectorAll("[data-mega-slot]").forEach(s=>{var o,l,n;(o=s.querySelector(".site-nav__trigger"))==null||o.removeEventListener("pointerenter",r),(l=s.querySelector(".site-nav__trigger"))==null||l.removeEventListener("focus",r),(n=s.querySelector(".site-nav__trigger"))==null||n.removeEventListener("click",r)})};a.querySelectorAll("[data-mega-slot]").forEach(s=>{const o=s.querySelector(".site-nav__trigger");o==null||o.addEventListener("pointerenter",r,{once:!0,passive:!0}),o==null||o.addEventListener("focus",r,{once:!0}),o==null||o.addEventListener("click",r,{once:!0})}),"requestIdleCallback"in window?window.requestIdleCallback(t,{timeout:4e3}):window.setTimeout(t,1500)}let U=null;async function $e(){var d,S,v,M,w,A,$,E,b,_;if(U)return U;const[{allDestinations:e},{experiences:a,experiencePageUrl:t},{safariPackages:r},{DESTINATION_CIRCUITS:s,circuitPageHref:o},{getAllCircuitsPageData:l}]=await Promise.all([z(()=>import("./destinations-data-DBODsxHG.js").then(i=>i.d),[]),z(()=>Promise.resolve().then(()=>qe),void 0),z(()=>import("./safari-packages-CU_z_aDq.js").then(i=>i.d),[]),z(()=>Promise.resolve().then(()=>Re),void 0),z(()=>import("./circuits-page-data-DVosJFBz.js"),__vite__mapDeps([4,3,5,1,2]))]),n=[];for(const i of s)n.push({title:i.label,subtitle:"Circuit",href:o(i.id),type:"circuit",keywords:`${i.label} ${i.script||""} circuit safari`});for(const i of e)n.push({title:i.name||i.fullName,subtitle:i.circuitLabel||"Destination",href:`/destinations/${encodeURIComponent(i.id)}.html`,image:((S=(d=i.images)==null?void 0:d[0])==null?void 0:S.src)||((M=(v=i.gallery)==null?void 0:v[0])==null?void 0:M.src),type:"destination",keywords:`${i.name} ${i.fullName} ${i.region} ${i.circuitLabel} destination park`});for(const i of a)n.push({title:i.name,subtitle:i.category||"Activity",href:t(i),image:(A=(w=i.images)==null?void 0:w[0])==null?void 0:A.src,type:"experience",keywords:`${i.name} ${i.fullName} ${i.category} activity things to do`});for(const i of r)n.push({title:i.title,subtitle:i.safariType||i.circuit||"Safari package",href:L(i),image:i.image||((E=($=i.gallery)==null?void 0:$[0])==null?void 0:E.src),type:"safari",keywords:`${i.title} ${i.circuit} ${i.safariType} ${(i.destinations||[]).join(" ")} ${(i.activities||[]).join(" ")} safari package`});const c=[{title:"Safari Packages",href:"/safaris.html",type:"page",keywords:"safaris packages itineraries tanzania"},{title:"Game Drive Safaris",href:"/game-drives.html",type:"page",keywords:"game drives wildlife 4x4"},{title:"Ruaha Safaris",href:"/ruaha-safaris.html",type:"page",keywords:"ruaha national park southern iringa"},{title:"Climbing & Trekking",href:"/trekkings.html",type:"page",keywords:"kilimanjaro trekking climbing mountain"},{title:"Bird Watching Safaris",href:"/bird-watching.html",type:"page",keywords:"bird watching birding ornithology flamingo"},{title:"Cultural Visits",href:"/cultural-visits.html",type:"page",keywords:"cultural visits village heritage"},{title:"Beach Holiday",href:"/beach-holiday.html",type:"page",keywords:"beach zanzibar mafia coast holiday"},{title:"Walking Safaris",href:"/walking-safaris.html",type:"page",keywords:"walking safari bush walk"},{title:"Tourist Attractions",href:"/tourist-attractions.html",type:"page",keywords:"museum heritage attractions olduvai"},{title:"All Circuits",href:"/circuits.html",type:"page",keywords:"circuits regions destinations"},{title:"Destinations",href:"/destinations.html",type:"page",keywords:"destinations parks places"}];for(const i of c)n.push({...i,subtitle:"Page"});for(const i of l())i!=null&&i.id&&n.push({title:i.title||i.name,subtitle:"Circuit guide",href:`/circuits/${i.id}.html`,image:((b=i.hero)==null?void 0:b.src)||((_=i.heroImage)==null?void 0:_.src),type:"circuit",keywords:`${i.title} ${i.label} circuit safari`});return U=n,n}function Ee(e,a,t=12){const r=a.trim().toLowerCase();if(!r||r.length<2)return[];const s=r.split(/\s+/).filter(Boolean);return e.map(o=>{const l=`${o.title} ${o.subtitle} ${o.keywords}`.toLowerCase();let n=0;l.includes(r)&&(n+=12);for(const c of s)o.title.toLowerCase().includes(c)&&(n+=8),l.includes(c)&&(n+=3);return{entry:o,score:n}}).filter(({score:o})=>o>0).sort((o,l)=>l.score-o.score).slice(0,t).map(({entry:o})=>o)}function H(e){const a=document.createElement("div");return a.textContent=e,a.innerHTML}function Ie(e=document){var E;const a=e instanceof Document?e.documentElement:e;if((E=a.dataset)!=null&&E.searchReady)return;a.dataset.searchReady="1";const t=e.querySelector("[data-search-toggle]"),r=e.querySelector("[data-search-overlay]"),s=e.querySelector("[data-search-form]"),o=e.querySelector("[data-search-input]"),l=e.querySelector("[data-search-results]"),n=e.querySelector("[data-site-header]");if(!t||!r||!o||!l)return;let c=null,d=null;function S(){return c||(c=$e()),c}function v(b){if(!b.length){l.innerHTML='<p class="site-search__empty">No matches – try a park, safari or activity name.</p>';return}l.innerHTML=b.map(_=>`
          <a class="site-search__result" href="${H(_.href)}">
            ${_.image?`<img class="site-search__result-thumb" src="${H(_.image)}" alt="" loading="lazy" width="44" height="44" data-fallback="${H(Y)}" />`:'<span class="site-search__result-icon" aria-hidden="true"><i class="fas fa-compass"></i></span>'}
            <span class="site-search__result-text">
              <span class="site-search__result-title">${H(_.title)}</span>
              <span class="site-search__result-meta">${H(_.subtitle)}</span>
            </span>
          </a>
        `).join(""),l.querySelectorAll("[data-fallback]").forEach(_=>{_.addEventListener("error",()=>{_.src=_.getAttribute("data-fallback")},{once:!0})})}function M(){l.innerHTML=""}function w(){r.hidden=!1,r.setAttribute("aria-hidden","false"),t.setAttribute("aria-expanded","true"),n==null||n.classList.add("is-search-open"),document.documentElement.classList.add("is-search-open"),M(),window.requestAnimationFrame(()=>o.focus()),S()}function A(){r.hidden=!0,r.setAttribute("aria-hidden","true"),t.setAttribute("aria-expanded","false"),n==null||n.classList.remove("is-search-open"),document.documentElement.classList.remove("is-search-open"),o.value="",l.innerHTML=""}async function $(){const b=o.value.trim();if(b.length<2){M();return}l.innerHTML='<p class="site-search__loading">Searching…</p>';const _=await S();v(Ee(_,b))}t.addEventListener("click",()=>{r.hidden?w():A()}),r.querySelectorAll("[data-search-close]").forEach(b=>{b.addEventListener("click",A)}),o.addEventListener("input",()=>{clearTimeout(d),d=window.setTimeout($,180)}),o.addEventListener("keydown",b=>{if(b.key==="Escape"){b.preventDefault(),A();return}if(b.key==="Enter"){const _=l.querySelector(".site-search__result");_&&(b.preventDefault(),_.click())}}),s==null||s.addEventListener("submit",b=>{b.preventDefault();const _=l.querySelector(".site-search__result");if(_){_.click();return}$()}),document.addEventListener("keydown",b=>{b.key==="Escape"&&!r.hidden&&A()})}function ya(e="#site-nav-root"){const a=document.querySelector(e);a&&(Le(e),Te(a),Pe(a),a.dataset.searchInit||(a.dataset.searchInit="1",Ie(a)))}let O=null;function K(e){return e.querySelectorAll("[data-mega]")}function We(){O==null||O()}function ka(){const e=document.querySelector("[data-site-header]");if(!e||e.dataset.navReady){We();return}e.dataset.navReady="1";const a=e.querySelector("#site-nav-panel"),t=e.querySelector("[data-nav-toggle]"),r=e.querySelector("[data-nav-close]"),s=document.querySelector("[data-nav-backdrop]"),o=window.matchMedia("(min-width: 901px)");let l=window.scrollY,n=null;const c=new WeakMap;function d(){return o.matches}function S(){const i=document.querySelector(".dest-listing-hero"),u=document.querySelector("[data-hero]"),m=document.querySelector("#home-hero"),y=window.scrollY>48;if(i&&!u){e.classList.add("is-scrolled"),e.classList.remove("is-over-hero");return}if(!u){if(m&&!m.querySelector("[data-hero]")){e.classList.remove("is-scrolled"),e.classList.add("is-over-hero");return}e.classList.toggle("is-scrolled",y||!0),e.classList.remove("is-over-hero");return}const j=u.offsetHeight,we=window.scrollY<j-80;e.classList.toggle("is-scrolled",y),e.classList.toggle("is-over-hero",we)}function v(i){e.classList.toggle("is-mobile-open",i),t==null||t.setAttribute("aria-expanded",i?"true":"false"),t==null||t.setAttribute("aria-label",i?"Close menu":"Open menu"),r==null||r.setAttribute("aria-hidden",i?"false":"true"),s&&(s.hidden=!i,s.setAttribute("aria-hidden",i?"false":"true")),document.documentElement.classList.toggle("is-nav-locked",i),i||w()}function M(i){clearTimeout(n),K(e).forEach(u=>{const m=u.querySelector(".site-nav__trigger"),y=u.querySelector(".mega-menu"),j=u===i;u.classList.toggle("is-open",j),m&&m.setAttribute("aria-expanded",j?"true":"false"),y&&y.classList.toggle("is-visible",j),j&&y&&ye(y,{priority:!0})}),e.classList.add("is-mega-open"),s&&d()&&(s.hidden=!1,s.setAttribute("aria-hidden","true"))}function w(){clearTimeout(n),K(e).forEach(i=>{const u=i.querySelector(".site-nav__trigger"),m=i.querySelector(".mega-menu");i.classList.remove("is-open"),u&&u.setAttribute("aria-expanded","false"),m&&m.classList.remove("is-visible")}),e.classList.remove("is-mega-open"),s&&d()&&!e.classList.contains("is-mobile-open")&&(s.hidden=!0,s.setAttribute("aria-hidden","true"))}function A(i){!i.classList.contains("is-open")?M(i):w()}function $(){d()&&(clearTimeout(n),n=window.setTimeout(w,90))}function E(i){if(c.has(i))return;const u=i.querySelector(".mega-menu");if(!u)return;const m=()=>M(i),y=()=>$(),j=()=>clearTimeout(n);i.addEventListener("mouseenter",m),i.addEventListener("mouseleave",y),u.addEventListener("mouseenter",j),u.addEventListener("mouseleave",y),c.set(i,{onEnter:m,onLeave:y,onPanelEnter:j})}function b(i){const u=c.get(i);if(!u)return;const m=i.querySelector(".mega-menu");i.removeEventListener("mouseenter",u.onEnter),i.removeEventListener("mouseleave",u.onLeave),m==null||m.removeEventListener("mouseenter",u.onPanelEnter),m==null||m.removeEventListener("mouseleave",u.onLeave),c.delete(i)}function _(){K(e).forEach(i=>{d()?E(i):b(i)}),d()||w()}O=_,t==null||t.addEventListener("click",i=>{i.stopPropagation(),v(!e.classList.contains("is-mobile-open"))}),r==null||r.addEventListener("click",i=>{i.stopPropagation(),v(!1)}),s==null||s.addEventListener("click",()=>v(!1)),a==null||a.addEventListener("click",i=>{const u=i.target.closest(".site-nav__trigger");if(!u)return;const m=u.closest("[data-mega]");!m||!m.querySelector(".mega-menu")||d()&&u.tagName==="A"||(i.preventDefault(),i.stopPropagation(),A(m))}),a==null||a.addEventListener("keydown",i=>{if(i.key!=="Enter"&&i.key!==" ")return;const u=i.target.closest(".site-nav__trigger");if(!u)return;const m=u.closest("[data-mega]");!m||!m.querySelector(".mega-menu")||d()&&u.tagName==="A"||(i.preventDefault(),A(m))}),a==null||a.addEventListener("click",i=>{i.target.closest(".mega-menu")&&i.stopPropagation()}),document.addEventListener("click",i=>{if(e.classList.contains("is-mobile-open"))return a!=null&&a.contains(i.target),void 0;d()&&(e.contains(i.target)||w())}),document.addEventListener("keydown",i=>{i.key==="Escape"&&(w(),v(!1))}),o.addEventListener("change",_),window.addEventListener("scroll",()=>{Math.abs(window.scrollY-l)<4||(l=window.scrollY,S())},{passive:!0}),_(),S()}function Sa(){const e=document.querySelector("[data-site-header]");if(!e)return;const a=document.querySelector(".dest-listing-hero"),t=document.querySelector("[data-hero]"),r=document.querySelector("#home-hero"),s=window.scrollY>48;if(a&&!t){e.classList.add("is-scrolled"),e.classList.remove("is-over-hero");return}if(!t){if(r&&!r.querySelector("[data-hero]")){e.classList.remove("is-scrolled"),e.classList.add("is-over-hero");return}e.classList.toggle("is-scrolled",s||!0),e.classList.remove("is-over-hero");return}const o=t.offsetHeight,l=window.scrollY<o-80;e.classList.toggle("is-scrolled",s),e.classList.toggle("is-over-hero",l)}const F=[{id:"northern",label:"Northern Circuit",script:"Serengeti · Ngorongoro · Tarangire"},{id:"southern",label:"Southern Circuit",script:"Ruaha · Nyerere · Katavi"},{id:"eastern",label:"Eastern Circuit",script:"Mikumi · Udzungwa · Kilwa"},{id:"western",label:"Western Circuit",script:"Mahale · Gombe · Rubondo"},{id:"zanzibar",label:"Zanzibar Island",script:"Stone Town · beaches · spice tours"},{id:"mafia",label:"Mafia Island",script:"Chole Bay · whale sharks · reefs"},{id:"oceanic",label:"Ocean Islands",script:"Pemba · Misali · offshore atolls"}],me=["Northern Circuit","Southern Circuit","Eastern Circuit","Western Circuit","Zanzibar Island","Mafia Island","Central Circuit","Ocean Islands"],xe={"Northern Circuit":"northern-circuit","Southern Circuit":"southern-circuit","Eastern Circuit":"eastern-circuit","Western Circuit":"western-circuit","Zanzibar Island":"zanzibar-island","Mafia Island":"mafia-island","Central Circuit":"central-circuit","Ocean Islands":"ocean-islands"};function ze(e){return`${e}-circuit`}function D(e){return`/circuits/${encodeURIComponent(e)}.html`}function He(e){return D(e)}function fe(e){return`/safaris.html#${xe[e]||e.toLowerCase().replace(/\s+/g,"-")}`}const Re=Object.freeze(Object.defineProperty({__proto__:null,DESTINATION_CIRCUITS:F,SAFARI_CIRCUIT_LABELS:me,circuitAnchor:ze,circuitPageHref:D,destinationsCircuitHref:He,safarisCircuitHref:fe},Symbol.toStringTag,{value:"Module"})),Ge="https://www.tanzaniatourism.com",De={title:"Things to Do",label:"Activities",description:"Game drives, migration, hiking, bird watching, museums, waterfalls and cultural visits across Tanzania.",sourceUrl:"https://www.tanzaniatourism.com/activities"},C=[{id:"museums",name:"Museums",fullName:"Museums & Heritage",scriptLabel:"Stories in Stone",region:"Northern & Southern Tanzania",category:"Museum / Monument",circuitLabel:"Experiences",bestSeason:"Year-round",tagline:"Fossils, tribal history, and UNESCO-listed sites from Olduvai Gorge to Iringa's Kalenga Museum.",description:"The Olduvai Gorge, which is a remarkable archaeological site in East Africa and perhaps in the world. It was officially recognized as a part of the UNESCO World Heritage Site in 1979. Exposed within the sides of the gorge is a remarkably rich chronicle of human ancestry and the evolution of the Serengeti ecosystem.",descriptions:["The Olduvai Gorge, which is a remarkable archaeological site in East Africa and perhaps in the world. It was officially recognized as a part of the UNESCO World Heritage Site in 1979. Exposed within the sides of the gorge is a remarkably rich chronicle of human ancestry and the evolution of the Serengeti ecosystem.","It was here that Mary and Louis Leakey, over the course of more than 30 years of backbreaking work, unearthed the first well-dated fossils and artefacts of some of our earliest human ancestors.","Their discoveries include the famous Zinjanthropus (Australopithecus boisei) skull, as well as remains of Homo habilis, the presumed maker of the numerous early stone tools found in deposits ranging in age from 1.6 to 1.8 million years ago, and Homo erectus, the larger- bodied and larger- brained hominin that preceded the earliest modern humans (Homo sapiens).","The gorge may be visited year-round. It is necessary to have an oﬃcial guide to visit the actual excavations. Length: 55 km (34m) | Deep: 100 m | Excavation Since : 1930s","Olduvai Gorge Museum exhibits numerous fossils, stone tools of our hominid ancestors and skeletons of many extinct animals excavated in the gorge.","Mary Leakey founded the museum in 1970. In 2017, The Ngorongoro Conservation Area Authority replaced the original museum structure by constructing a new museum and visitors centre.","Experience Iringa on this full-day tour starting from Isimila Museum and observe palaeolithic tools and canyon formations at the ancient Isimila Stone Age site, then visit Kalenga museum learn Mkwawa and Majimaji History. Admire prehistoric Igeleke Rock Art, visit a World War I cemetery and witness a beautiful sunset from the Gangilonga Mountain.","From Iringa town a 45-minute drive to the Isimila Stone Age site. Here you will first visit the museum and observe different palaeolithic stone tools dated back to about 1.5 million years."],highlights:["Heritage & history","Rock landscapes","Museum / Monument"],sourceUrls:["https://www.tanzaniatourism.com/destination/olduvai-gorge","https://www.tanzaniatourism.com/safari/day-trip-to-isimila-stone-age-and-igeleke-rock-art-sites"],images:[{src:"/assets/photos/Olduvai_Gorge_NCA_2_1.jpg",alt:"Museums & Heritage"},{src:"/assets/photos/Olduvai_Gorge_NCA_2_2.jpg",alt:"Museums & Heritage – view 2"},{src:"/assets/photos/Olduvai_Gorge_NCA_2.jpg",alt:"Museums & Heritage – view 3"}],gallery:[{src:"/assets/photos/Olduvai_Gorge_NCA_2_1.jpg",alt:"Museums & Heritage"},{src:"/assets/photos/Olduvai_Gorge_NCA_2_2.jpg",alt:"Museums & Heritage – view 2"},{src:"/assets/photos/Olduvai_Gorge_NCA_2.jpg",alt:"Museums & Heritage – view 3"},{src:"/assets/photos/Olduvai_Gorge_NCA_1.jpg",alt:"Museums & Heritage – view 4"},{src:"/assets/photos/Olduvai_Gorge_NCA_3.jpg",alt:"Museums & Heritage – view 5"},{src:"/assets/photos/Olduvai_Gorge_NCA_9.jpg",alt:"Museums & Heritage – view 6"},{src:"/assets/photos/Olduvai_Gorge_NCA_View_Point.jpg",alt:"Museums & Heritage – view 7"},{src:"/assets/photos/Olduvai_Gorge_NCA_Entrance.jpg",alt:"Museums & Heritage – view 8"},{src:"/assets/photos/Olduvai_Museum_NCA_10.jpg",alt:"Museums & Heritage – view 9"},{src:"/assets/photos/Olduvai_Museum_NCA_11.jpg",alt:"Museums & Heritage – view 10"}]},{id:"game-drives",name:"Game Drives",fullName:"Game Drives",scriptLabel:"Wildlife on the Track",region:"All safari circuits",category:"Game Drives",circuitLabel:"Experiences",bestSeason:"Jun – Oct · Jan – Mar",tagline:"Private 4×4 drives across Serengeti, Ngorongoro, Ruaha, Nyerere and Tanzania's great parks.",description:"This tour offers you a 5-day Tanzania Migration Safari where your river crossing tour will take you to the Mara River for the spectacular migration crossing which is an experience of a lifetime. Let us tailor-make your itinerary and customize your tour according to your requirements and duration.",descriptions:["This tour offers you a 5-day Tanzania Migration Safari where your river crossing tour will take you to the Mara River for the spectacular migration crossing which is an experience of a lifetime. Let us tailor-make your itinerary and customize your tour according to your requirements and duration.","After early morning breakfast, we begin our drive to the Serengeti National Park via Ngorongoro with a few stops during the journey at interesting scenic points for you to take pictures and get the full experience of your Tanzania Classic tour.","The drives from Moshi/Arusha to Serengeti National Park is approximately 6 hours and we will make provision for your lunch during the journey by providing you with enjoyable lunch boxes to allow for us arriving timeously for afternoon animal sightings in the Serengeti. Dinner and overnight at either midrange or luxury lodge in Serengeti.","A full day Serengeti tour will start after your breakfast, where you will spend the day observing animals in their natural habitat at a different time and in various parts of the Serengeti.","Look forward to witnessing large herds of migrating animals, prides of lions, cheetah, leopard, elephant, giraffe, buffalo, and antelope as well as various species of birdlife and indigenous trees.","Enjoy a full day of animal sightings and capture the wilderness in all its glory as you drive through the Serengeti in search of wildlife.","Depending on the time of the year this 5 Days Tanzania Classic Migration tour will be located in the central Serengeti, Northern Serengeti, or Southern Serengeti.","This itinerary is flexible and the accommodation will be booked according to animal migratory movement. Dinner and overnight at either midrange or luxury lodge in Serengeti."],highlights:["Migration herds","Game Drives"],sourceUrls:["https://www.tanzaniatourism.com/safari/5-days-serengeti-and-ngorongoro-crater-safari","https://www.tanzaniatourism.com/destination/serengeti-national-park"],images:[{src:"/assets/photos/Serengeti_National_Park_Leopard_24.jpg",alt:"Game Drives"},{src:"/assets/photos/Serengeti_National_Park_Lions_22.jpg",alt:"Game Drives – view 2"},{src:"/assets/photos/Serengeti_National_Park_Ostriches_20.jpg",alt:"Game Drives – view 3"}],gallery:[{src:"/assets/photos/Serengeti_National_Park_Leopard_24.jpg",alt:"Game Drives"},{src:"/assets/photos/Serengeti_National_Park_Lions_22.jpg",alt:"Game Drives – view 2"},{src:"/assets/photos/Serengeti_National_Park_Ostriches_20.jpg",alt:"Game Drives – view 3"},{src:"/assets/photos/Serengeti_National_Park_Valture_20.jpg",alt:"Game Drives – view 4"},{src:"/assets/photos/Serengeti_National_Park_Waterbuck_20.jpg",alt:"Game Drives – view 5"},{src:"/assets/photos/Serengeti_National_Park_Wildebeests_22.jpg",alt:"Game Drives – view 6"},{src:"/assets/photos/Serengeti_National_Park_Zebras_20.jpg",alt:"Game Drives – view 7"},{src:"/assets/photos/Serengeti_Wildebeests_03.jpg",alt:"Game Drives – view 8"},{src:"/assets/photos/Ngorongoro_Crater_Elephant_NCA.jpg",alt:"Game Drives – view 9"},{src:"/assets/photos/Ngorongoro_Crater_Hyenas_NCA.jpg",alt:"Game Drives – view 10"}]},{id:"cultural-visits",name:"Cultural Visits",fullName:"Cultural Visits",scriptLabel:"Meet the People",region:"Iringa · Maasai · Coast",category:"Cultural Visits",circuitLabel:"Experiences",bestSeason:"Year-round",tagline:"Respectful community days – Hehe history near Iringa, Chagga coffee villages, Maasai and Hadzabe encounters.",description:"Experience Iringa on this full-day tour starting from Isimila Museum and observe palaeolithic tools and canyon formations at the ancient Isimila Stone Age site, then visit Kalenga museum learn Mkwawa and Majimaji History. Admire prehistoric Igeleke Rock Art, visit a World War I cemetery and witness a beautiful sunset from the Gangilonga Mountain.",descriptions:["Experience Iringa on this full-day tour starting from Isimila Museum and observe palaeolithic tools and canyon formations at the ancient Isimila Stone Age site, then visit Kalenga museum learn Mkwawa and Majimaji History. Admire prehistoric Igeleke Rock Art, visit a World War I cemetery and witness a beautiful sunset from the Gangilonga Mountain.","From Iringa town a 45-minute drive to the Isimila Stone Age site. Here you will first visit the museum and observe different palaeolithic stone tools dated back to about 1.5 million years.","Head into the Isimila canyon down a steep footpath to see beautiful geological pillar-like formations. The walk is very scenic owing to the reddish tint of the soil and clear skies. Keep an eye out for rare bird and tree species.","Take a short break at the site office and drive out to the Kalenga Museum at about 11:00 AM.","Reach the Kalenga Museum around 11:30 AM. Learn about the history of the Hehe tribe and the story of Chief Mkwawa against the Germans and Majimaji War. Get to see Chief Mkwawa's skull and tombs of Hehe chiefs.","After lunch, drive to see the spectacular Igeleke Rock paintings. The ochre-coloured cave art depicts human figures, an elephant, jumping eland, and giraffes hiding in the long grass. Here you will also hear beautiful legends about the rock paintings.","Visit WW1-era German and British cemeteries at 3:00 PM and learn more about the impact of the world war on Iringa.","Walk up the Gangilonga Mountain at 3:30 pm and take in the view of Iringa town. At the top, enjoy the fresh air and cool blowing breeze, and witness a beautiful sunset in the evening, before returning to Iringa Town."],highlights:["Heritage & history","Mountain routes","Rock landscapes"],sourceUrls:["https://www.tanzaniatourism.com/safari/day-trip-to-isimila-stone-age-and-igeleke-rock-art-sites","https://www.tanzaniatourism.com/safari/day-trip-to-materuni-waterfalls-and-coffee-tour"],images:[{src:"/assets/photos/Igeleke_Rock_Paintings_Iringa_19.jpg",alt:"Cultural Visits"},{src:"/assets/photos/Igeleke_Rock_Paintings_Iringa_22.jpg",alt:"Cultural Visits – view 2"},{src:"/assets/photos/Igeleke_Rock_Paintings_Iringa_16.jpg",alt:"Cultural Visits – view 3"}],gallery:[{src:"/assets/photos/Igeleke_Rock_Paintings_Iringa_19.jpg",alt:"Cultural Visits"},{src:"/assets/photos/Igeleke_Rock_Paintings_Iringa_22.jpg",alt:"Cultural Visits – view 2"},{src:"/assets/photos/Igeleke_Rock_Paintings_Iringa_16.jpg",alt:"Cultural Visits – view 3"},{src:"/assets/photos/Igeleke_Rock_Paintings_Iringa_12.jpg",alt:"Cultural Visits – view 4"},{src:"/assets/photos/Igeleke_Rock_Paintings_Iringa_15.jpg",alt:"Cultural Visits – view 5"},{src:"/assets/photos/Igeleke_Rock_Paintings_Iringa_05.jpg",alt:"Cultural Visits – view 6"},{src:"/assets/photos/Igeleke_Rock_Paintings_Iringa_06.jpg",alt:"Cultural Visits – view 7"},{src:"/assets/photos/Isimila_Sandstone_Pillars_21.jpg",alt:"Cultural Visits – view 8"},{src:"/assets/photos/Isimila_Sandstone_Pillars_24.jpg",alt:"Cultural Visits – view 9"},{src:"/assets/photos/Isimila_Stone_Age_Site_22.jpg",alt:"Cultural Visits – view 10"}]},{id:"great-migration",name:"Great Migration",fullName:"Great Migration",scriptLabel:"River Crossings & Plains",region:"Serengeti · Mara",category:"Great Migration",circuitLabel:"Experiences",bestSeason:"Jul – Oct · Dec – Mar",tagline:"Follow wildebeest herds, river crossings, and predator action on the Serengeti–Mara corridor.",description:"This tour offers you a 5-day Tanzania Migration Safari where your river crossing tour will take you to the Mara River for the spectacular migration crossing which is an experience of a lifetime. Let us tailor-make your itinerary and customize your tour according to your requirements and duration.",descriptions:["This tour offers you a 5-day Tanzania Migration Safari where your river crossing tour will take you to the Mara River for the spectacular migration crossing which is an experience of a lifetime. Let us tailor-make your itinerary and customize your tour according to your requirements and duration.","After early morning breakfast, we begin our drive to the Serengeti National Park via Ngorongoro with a few stops during the journey at interesting scenic points for you to take pictures and get the full experience of your Tanzania Classic tour.","The drives from Moshi/Arusha to Serengeti National Park is approximately 6 hours and we will make provision for your lunch during the journey by providing you with enjoyable lunch boxes to allow for us arriving timeously for afternoon animal sightings in the Serengeti. Dinner and overnight at either midrange or luxury lodge in Serengeti.","A full day Serengeti tour will start after your breakfast, where you will spend the day observing animals in their natural habitat at a different time and in various parts of the Serengeti.","Look forward to witnessing large herds of migrating animals, prides of lions, cheetah, leopard, elephant, giraffe, buffalo, and antelope as well as various species of birdlife and indigenous trees.","Enjoy a full day of animal sightings and capture the wilderness in all its glory as you drive through the Serengeti in search of wildlife.","Depending on the time of the year this 5 Days Tanzania Classic Migration tour will be located in the central Serengeti, Northern Serengeti, or Southern Serengeti.","This itinerary is flexible and the accommodation will be booked according to animal migratory movement. Dinner and overnight at either midrange or luxury lodge in Serengeti."],highlights:["Migration herds","Great Migration"],sourceUrls:["https://www.tanzaniatourism.com/safari/5-days-serengeti-and-ngorongoro-crater-safari","https://www.tanzaniatourism.com/destination/serengeti-national-park"],images:[{src:"/assets/photos/Serengeti_Wildebeests_03.jpg",alt:"Great Migration wildebeest herds"},{src:"/assets/photos/Serengeti_National_Park_Wildebeests_22.jpg",alt:"Great Migration – gnu river"},{src:"/assets/photos/Serengeti_Migration_P103.jpg",alt:"Great Migration – plains crossing"}],gallery:[{src:"/assets/photos/Serengeti_Wildebeests_03.jpg",alt:"Great Migration wildebeest herds"},{src:"/assets/photos/Serengeti_National_Park_Wildebeests_22.jpg",alt:"Great Migration – gnu river"},{src:"/assets/photos/Serengeti_Migration_P103.jpg",alt:"Great Migration – plains crossing"},{src:"/assets/photos/Serengeti_Gnus_7765.jpg",alt:"Great Migration – gnu herds"},{src:"/assets/photos/Serengeti_National_Park_Zebras_20.jpg",alt:"Great Migration – zebra alongside wildebeest"}]},{id:"hiking",name:"Hiking",fullName:"Hiking & Walking Safaris",scriptLabel:"On Foot in the Bush",region:"Northern · Eastern · Southern",category:"Walking / Hiking",circuitLabel:"Experiences",bestSeason:"Jun – Oct",tagline:"Arusha National Park walks, Kilimanjaro day hikes, Udzungwa forest trails, and highland crater rim treks.",description:"The park is at the base of Mount Meru, which is good for climbing. It has a range of habitats including forest – home to the black-and-white colobus monkey – and is excellent for birding.",descriptions:["The park is at the base of Mount Meru, which is good for climbing. It has a range of habitats including forest – home to the black-and-white colobus monkey – and is excellent for birding.","Despite its smaller size you will find a variety of interesting landscape features within the park, including the Ngurdoto Crater, Mommela Lakes and Tululusia waterfalls.","For those interested in exploring by foot, Arusha National Park is the only park in Northern Tanzania where you may experience a walking safari. Safari in the Arusha National Park means a light walking with armed ranger, drive around Momela Lakes","Pick up in the morning from your hotel in Moshi/Arusha and drive to the National Park and Transfer from your hotel to the gate of Arusha National Park, the Momella Gate.","The park has an incredible variety of flora and fauna, which cannot fail to impress. Your day trip will include a visit to the Ngurdoto Crater. Buffaloes, waterbucks, giraffes, warthogs, zebras and baboons can be seen all year round as well as many different bird species.","If Interested in Walking then at the Momella Gate, an armed guard ranger will be waiting to accompany you on your walking safari that will give you a chance to experience the wildlife up-close.","Lunch will be taken at a picnic place and in the afternoon we will take you back to Arusha/ Moshi.","Tours & Safaris that are Similar in Park, Number of Days or Activities"],highlights:["Rich birdlife","Mountain routes","Walking / Hiking"],sourceUrls:["https://www.tanzaniatourism.com/safari/day-trip-to-arusha-national-park","https://www.tanzaniatourism.com/safari/day-trip-to-mount-meru-waterfalls-hike"],images:[{src:"/assets/photos/Arusha_National_Park_Black_and_White_Colobus_67.jpg",alt:"Hiking & Walking Safaris"},{src:"/assets/photos/Arusha_National_Park_Blue_Monkey_73.jpg",alt:"Hiking & Walking Safaris – view 2"},{src:"/assets/photos/Arusha_National_Park_Directions_86.jpg",alt:"Hiking & Walking Safaris – view 3"}],gallery:[{src:"/assets/photos/Arusha_National_Park_Black_and_White_Colobus_67.jpg",alt:"Hiking & Walking Safaris"},{src:"/assets/photos/Arusha_National_Park_Blue_Monkey_73.jpg",alt:"Hiking & Walking Safaris – view 2"},{src:"/assets/photos/Arusha_National_Park_Directions_86.jpg",alt:"Hiking & Walking Safaris – view 3"},{src:"/assets/photos/Arusha_National_Park_Fig_Tree_Arch_63.jpg",alt:"Hiking & Walking Safaris – view 4"},{src:"/assets/photos/Arusha_National_Park_Giraffes_102.jpg",alt:"Hiking & Walking Safaris – view 5"},{src:"/assets/photos/Arusha_National_Park_Momella_Lake_Flamingos_65.jpg",alt:"Hiking & Walking Safaris – view 6"},{src:"/assets/photos/Arusha_National_Park_Giraffes_103.jpg",alt:"Hiking & Walking Safaris – view 7"},{src:"/assets/photos/Arusha_National_Park_Momella_Lake_Flamingos_66.jpg",alt:"Hiking & Walking Safaris – view 8"},{src:"/assets/photos/Arusha_National_Park_Momella_Lake_Flamingos_83.jpg",alt:"Hiking & Walking Safaris – view 9"},{src:"/assets/photos/Arusha_National_Park_Ngurdoto_Crater_167.jpg",alt:"Hiking & Walking Safaris – view 10"}]},{id:"bird-watching",name:"Bird Watching",fullName:"Bird Watching",scriptLabel:"Wings Over Tanzania",region:"Lakes · Forest · Coast",category:"Bird Watching",circuitLabel:"Experiences",bestSeason:"Nov – Apr · Jun – Oct",tagline:"Flamingos on soda lakes, forest endemics in Udzungwa, raptors over the Rift Valley, and coastal waders.",description:"The park is at the base of Mount Meru, which is good for climbing. It has a range of habitats including forest – home to the black-and-white colobus monkey – and is excellent for birding.",descriptions:["The park is at the base of Mount Meru, which is good for climbing. It has a range of habitats including forest – home to the black-and-white colobus monkey – and is excellent for birding.","Despite its smaller size you will find a variety of interesting landscape features within the park, including the Ngurdoto Crater, Mommela Lakes and Tululusia waterfalls.","For those interested in exploring by foot, Arusha National Park is the only park in Northern Tanzania where you may experience a walking safari. Safari in the Arusha National Park means a light walking with armed ranger, drive around Momela Lakes","Pick up in the morning from your hotel in Moshi/Arusha and drive to the National Park and Transfer from your hotel to the gate of Arusha National Park, the Momella Gate.","The park has an incredible variety of flora and fauna, which cannot fail to impress. Your day trip will include a visit to the Ngurdoto Crater. Buffaloes, waterbucks, giraffes, warthogs, zebras and baboons can be seen all year round as well as many different bird species.","If Interested in Walking then at the Momella Gate, an armed guard ranger will be waiting to accompany you on your walking safari that will give you a chance to experience the wildlife up-close.","Lunch will be taken at a picnic place and in the afternoon we will take you back to Arusha/ Moshi.","Tours & Safaris that are Similar in Park, Number of Days or Activities"],highlights:["Rich birdlife","Mountain routes","Bird Watching"],sourceUrls:["https://www.tanzaniatourism.com/safari/day-trip-to-arusha-national-park","https://www.tanzaniatourism.com/destination/lake-manyara-national-park"],images:[{src:"/assets/photos/Arusha_National_Park_Momella_Lake_Flamingos_66.jpg",alt:"Flamingos on Momella Lake"},{src:"/assets/photos/Arusha_National_Park_Momella_Lake_Flamingos_83.jpg",alt:"Bird watching at Momella Lake"},{src:"/assets/photos/Arusha_National_Park_Momella_Lake_Flamingos_65.jpg",alt:"Pink flamingos in Arusha National Park"}],gallery:[{src:"/assets/photos/Arusha_National_Park_Momella_Lake_Flamingos_66.jpg",alt:"Flamingos on Momella Lake"},{src:"/assets/photos/Arusha_National_Park_Momella_Lake_Flamingos_83.jpg",alt:"Bird watching at Momella Lake"},{src:"/assets/photos/Arusha_National_Park_Momella_Lake_Flamingos_65.jpg",alt:"Pink flamingos in Arusha National Park"},{src:"/assets/photos/Lake_Manyara_National_Park_Flamingos_26.jpg",alt:"Lake Manyara flamingos"}]},{id:"waterfalls",name:"Waterfalls",fullName:"Waterfalls",scriptLabel:"Forest & Cascade",region:"Kilimanjaro · Udzungwa · Highlands",category:"Waterfalls",circuitLabel:"Experiences",bestSeason:"Year-round · best after rains",tagline:"Materuni's 150 m cascade, Sanje Falls in Udzungwa, Meru waterfall hikes, and Engero Sero at Lake Natron.",description:"Around 30 - 40 minutes outside of Moshi town are Materuni waterfalls. As this trip is so close by and ideal for those people with limited time but who would still like to see some of the nature and beauty that this region of Tanzania has to offer. These falls are smaller than the previously described Ndoro, but still pretty impressive at 150 meters high and definitely a sight worth seeing.",descriptions:["Around 30 - 40 minutes outside of Moshi town are Materuni waterfalls. As this trip is so close by and ideal for those people with limited time but who would still like to see some of the nature and beauty that this region of Tanzania has to offer. These falls are smaller than the previously described Ndoro, but still pretty impressive at 150 meters high and definitely a sight worth seeing.","From Materuni Village we will walk some 30 minutes to the waterfall. The walk itself is extremely interesting, as you will see some smaller waterfalls and lots of waterways which are part of the irrigation system of the local farmers who grow coffee, bananas and many other fruits and vegetables.","At the waterfall, you can even refresh in the cool and crystal clear water, don’t forget to bring your swimwear! Here you will also break for lunch before doing a short tour of Materuni village to see the typical life of the Chagga tribe. The village, located at a height of around 1300 m (4300 ft) above sea level is set within a dramatic landscape of high rises and deep valleys, all covered by tropical rain forest.","Coffee Tour Materuni village produces many perishable goods including yam, sugar, maize and beans. However, the main crop that is grown is coffee. In the village you will be able to learn about the process from which coffee is grown, to when it is finally poured, steaming hot into the cup.","You will pick you own coffee, remove the cover and then with coffee that has been previously dried out, crush it into coffee granules. After experiencing the complete coffee production process you will be able to enjoy your very own, satisfying and rewarding cup of fresh coffee. You will also learn how the Chagga tribe lives, such as their home set-up, the types of food they cook and eat and how they rear their animals.","Tours & Safaris that are Similar in Park, Number of Days or Activities","This very impressive Waterfall is one of the tallest in the area, spewing crystal clear glacier water 70m into its basin. The beautiful path leading to Materuni Waterfall is located 2500m above sea level","It traverses thru valleys and hills covered by tropical rainforest, past coffee, banana and avocado “shambas”, the Kiswahili word for farms. On a clear day great views of Kibo and Moshi town can be seen. The hike to the base of the Waterfall can be demanding and hiking boots are recommended. As this trip is so close to Moshi town it is ideal for those people with limited time but who would still like to see some of the nature and beauty that this region of Tanzania has to offer."],highlights:["Waterfall pools","Waterfalls"],sourceUrls:["https://www.tanzaniatourism.com/safari/day-trip-to-materuni-waterfalls-and-coffee-tour","https://www.tanzaniatourism.com/destination/materuni-waterfalls"],images:[{src:"/assets/photos/Materuni_Waterfalls_02.jpg",alt:"Waterfalls"},{src:"/assets/photos/Materuni_Waterfalls_Walking_Path_14.jpg",alt:"Waterfalls – view 2"},{src:"/assets/photos/Materuni_Waterfalls_03.jpg",alt:"Waterfalls – view 3"}],gallery:[{src:"/assets/photos/Materuni_Waterfalls_02.jpg",alt:"Waterfalls"},{src:"/assets/photos/Materuni_Waterfalls_Walking_Path_14.jpg",alt:"Waterfalls – view 2"},{src:"/assets/photos/Materuni_Waterfalls_03.jpg",alt:"Waterfalls – view 3"},{src:"/assets/photos/Materuni_Waterfalls_04.jpg",alt:"Waterfalls – view 4"},{src:"/assets/photos/Materuni_Waterfalls_05.jpg",alt:"Waterfalls – view 5"},{src:"/assets/photos/Materuni_Waterfalls_15.jpg",alt:"Waterfalls – view 6"},{src:"/assets/photos/Materuni_Waterfalls_16.jpg",alt:"Waterfalls – view 7"},{src:"/assets/photos/Materuni_Waterfalls_Walking_Path.jpg",alt:"Waterfalls – view 8"},{src:"/assets/photos/Materuni_Waterfalls_Walking_Path_06.jpg",alt:"Waterfalls – view 9"},{src:"/assets/photos/Materuni_Waterfalls_Walking_Path_07.jpg",alt:"Waterfalls – view 10"}]},{id:"rock-climbing",name:"Rock Climbing",fullName:"Rock Climbing & Ascents",scriptLabel:"Vertical Tanzania",region:"Meru · Lengai · Highlands",category:"Climbing / Trekking",circuitLabel:"Experiences",bestSeason:"Jun – Oct · Dec – Feb",tagline:"Mount Meru ascents, Ol Doinyo Lengai volcano climbs, and guided rock routes in the northern highlands.",description:"A Day Trip to Mount Meru Waterfalls Hike is an amazing one-day trekking adventure to the foothills of Mount Meru. Mount Meru is located inside Arusha National Park in Tanzania. This 1 Day Mt Meru forest trek/ hike is designed for guests who have limited time and who are not interested in reaching the summit of the second-highest mountain in Tanzania.",descriptions:["A Day Trip to Mount Meru Waterfalls Hike is an amazing one-day trekking adventure to the foothills of Mount Meru. Mount Meru is located inside Arusha National Park in Tanzania. This 1 Day Mt Meru forest trek/ hike is designed for guests who have limited time and who are not interested in reaching the summit of the second-highest mountain in Tanzania.","During your this day trip to Mount Meru Waterfalls Hike you will also experience the local culture and local people living up the side of the mountain while viewing amazing greenery and animals of all kinds. Our One Day Mt Meru Forest Hike starts from the Tengeru Cultural Centre 12 km’s from Arusha town, along the Arusha – Moshi road. Tengeru Cultural Centre is located on the slopes of Mount Meru. Walk through the forest of the second largest mountain in Tanzania. Mount Meru has more than 10 different day trekking routes around the lower forest which last from 3 to 8 hours each.","Tours & Safaris that are Similar in Park, Number of Days or Activities","The 2 Days Ol Doinyo Lengai Mountain Climbing will take you to this active Volcano known as the mountain of God, Ol Doinyo Lengai will give you the best adventure safari as you explore its unique beauty, the fascinating attractions including the hauntingly beautiful lake Natron as well the magnificent waterfalls in this area.","Your safari will begin from Moshi/Arusha departing early morning to the wild and remote Ngaresero village where this mountain is situated and surrounded by Lake Natron contains some of the harshest and amazing scenery in Africa and is utterly breathtaking, your drive will take 6 hours and upon arrival, you will have your lunch and then rest at your camp waiting for the mountain climbing which starts around midnight due to the hotter temperatures during day time.","At approximately 11 pm, you will be woken up with tea or coffee and a light snack before meeting your Mountain Guide and beginning your trek into the night, camping services will be offered for resting.","On this day continue your climb in the early hours of the morning intending to reach the summit in time to witness the sunrise as it illuminates the Great Rift Valley below, after reaching the summit you will enjoy breathtaking views of the salt flats of Lake Natron to the north, the Kenyan border in the distance, see snowcapped Mount Kilimanjaro and the Great Rift Valley to the east and the stretching Ngorongoro Highlands and Ngorongoro Crater to the south.","Together with your Guide, you will explore the peak and enjoy a picnic breakfast at the summit of active mount Ol Doinyo Lengai volcano before beginning your climb down the mountain, enjoy a refreshing lunch after descending the volcano at your campsite or tented camp facility before returning to Arusha/Moshi where you safari ends upon arrival. A visit to Lake Natron can also be arranged as its not far from the Mountain."],highlights:["Waterfall pools","Mountain routes","Guided walks"],sourceUrls:["https://www.tanzaniatourism.com/safari/day-trip-to-mount-meru-waterfalls-hike","https://www.tanzaniatourism.com/safari/2-days-ol-doinyo-lengai-mountain-climbing"],images:[{src:"/assets/photos/Arusha_National_Park_Fig_Tree_Arch_63.jpg",alt:"Rock Climbing & Ascents"},{src:"/assets/photos/Arusha_National_Park_Momella_Lake_Flamingos_83.jpg",alt:"Rock Climbing & Ascents – view 2"},{src:"/assets/photos/Arusha_National_Park_Tululusia_Waterfalls_33.jpg",alt:"Rock Climbing & Ascents – view 3"}],gallery:[{src:"/assets/photos/Arusha_National_Park_Fig_Tree_Arch_63.jpg",alt:"Rock Climbing & Ascents"},{src:"/assets/photos/Arusha_National_Park_Momella_Lake_Flamingos_83.jpg",alt:"Rock Climbing & Ascents – view 2"},{src:"/assets/photos/Arusha_National_Park_Tululusia_Waterfalls_33.jpg",alt:"Rock Climbing & Ascents – view 3"},{src:"/assets/photos/Arusha_National_Park_Mount_Meru_Trekking_02.jpg",alt:"Rock Climbing & Ascents – view 4"},{src:"/assets/photos/Arusha_National_Park_Giraffes_104.jpg",alt:"Rock Climbing & Ascents – view 5"},{src:"/assets/photos/Mount_Oldonyo_Lengai_12.jpg",alt:"Rock Climbing & Ascents – view 6"},{src:"/assets/photos/Mount_Oldonyo_Lengai_02.jpg",alt:"Rock Climbing & Ascents – view 7"},{src:"/assets/photos/Mount_Oldonyo_Lengai_07.jpg",alt:"Rock Climbing & Ascents – view 8"},{src:"/assets/photos/Mount_Oldonyo_Lengai_10.jpg",alt:"Rock Climbing & Ascents – view 9"},{src:"/assets/photos/Streams_from_Oldoinyo_Lengai_03.jpg",alt:"Rock Climbing & Ascents – view 10"}]}];function Oe(e){return C.find(a=>a.id===e)||null}function B(e){return e.id==="bird-watching"?"/bird-watching.html":`/experiences/${encodeURIComponent(e.id)}.html`}const qe=Object.freeze(Object.defineProperty({__proto__:null,TTB_COM_ORIGIN:Ge,experiencePageUrl:B,experiences:C,experiencesMeta:De,getExperienceById:Oe},Symbol.toStringTag,{value:"Module"})),P={name:"Matembo Safari & Tours",location:"Gangilonga, Iringa, Tanzania",phone:"+255 679 529 700",email:"info@matembosafaris.com"};function q(e,a="/assets/about/main3.jpg"){var r,s;const t=ge(e)[0];return((s=(r=t==null?void 0:t.images)==null?void 0:r[0])==null?void 0:s.src)||a}function f(e,a,t,r){return{name:e,script:a,href:t,image:r}}function T(e,a){var r,s,o,l,n;const t=C.find(c=>c.id===e);return t?f(a||t.name,t.scriptLabel||((r=t.tagline)==null?void 0:r.slice(0,48))||t.category,B(t),((o=(s=t.images)==null?void 0:s[0])==null?void 0:o.src)||((n=(l=t.gallery)==null?void 0:l[0])==null?void 0:n.src)):null}const g={...Ae,zanzibar:q("zanzibar","/assets/about/main 8.jpg")},Fe=F.map(e=>({name:e.label,script:e.script,href:D(e.id),image:q(e.id)})),R={hero:"/assets/about/about hero.jpg",gallery:"/assets/about/sticky-section.jpg",moments:"/assets/about/moments.jpg",coast:"/assets/about/walking safaris.jpg",team:"/assets/about/main 11.jpg"},Be=[{name:"Our Story",href:"/about.html",desc:"George & the field team in Iringa",image:"/assets/about/main 11.jpg"},{name:"Gallery & Moments",href:"/about.html#about-gallery",desc:"Ruaha, Mikumi & coast scenes",image:R.gallery},{name:"Guest Reviews",href:"/#testimonials",desc:"TripAdvisor verified feedback",image:R.moments},{name:"Plan Your Safari",href:"/contact.html",desc:"Share dates & parks in mind",image:R.coast}],Ve=[f("Adventure Safaris","Wildlife game drives","/game-drives.html",g.serengeti3d),f("Mountain Climbing","Kilimanjaro & highlands","/trekkings.html",g.lemosho7d),f("Beach Holiday","Zanzibar & coast","/beach-holiday.html",g.zanzibar),f("Walking Safaris","Guided bush walks","/walking-safaris.html",g.walkingSafaris),f("Tourist Attractions","Museums & heritage","/tourist-attractions.html",g.olduvai)];var ae,te,ie,re,se,oe;const Ue=[f("Game Drives","46 private 4×4 routes","/game-drives.html",g.serengeti3d),T("great-migration","Great Migration"),f("Cultural Visits","13 village & heritage routes","/cultural-visits.html","/assets/about/cultural visits.jpg"),f("Bird Watching","15 birding routes","/bird-watching.html",((ie=(te=(ae=C.find(e=>e.id==="bird-watching"))==null?void 0:ae.images)==null?void 0:te[0])==null?void 0:ie.src)||g.serengeti3d),f("Chimpanzee Watching","Gombe & Mahale","/activities/chimpanzee-watching.html",((oe=(se=(re=C.find(e=>e.id==="bird-watching"))==null?void 0:re.images)==null?void 0:se[0])==null?void 0:oe.src)||g.serengeti3d),f("Night Game Drives","After-dark wildlife","/night-game-drives.html",g.serengeti3d),T("museums","Museums & Heritage"),T("hiking","Walking / Hiking")].filter(Boolean);var ne,le,ce,he,ue,de;const Ma=[[f("Game Drives","46 private 4×4 routes","/game-drives.html",g.serengeti3d),T("great-migration","Great Migration"),f("Bird Watching","15 birding routes","/bird-watching.html",((ce=(le=(ne=C.find(e=>e.id==="bird-watching"))==null?void 0:ne.images)==null?void 0:le[0])==null?void 0:ce.src)||g.serengeti3d),f("Night Game Drives","After-dark wildlife","/night-game-drives.html",g.serengeti3d),T("hiking","Walking / Hiking")].filter(Boolean),[f("Cultural Visits","13 village & heritage routes","/cultural-visits.html","/assets/about/cultural visits.jpg"),f("Chimpanzee Watching","Gombe & Mahale","/activities/chimpanzee-watching.html",((de=(ue=(he=C.find(e=>e.id==="bird-watching"))==null?void 0:he.images)==null?void 0:ue[0])==null?void 0:de.src)||g.serengeti3d),T("waterfalls","Waterfalls"),T("rock-climbing","Rock Climbing"),f("Climbing / Trekking","Kilimanjaro routes","/trekkings.html",g.machame8d)].filter(Boolean),[T("museums","Museums & Heritage"),T("game-drives","Safari Drives Guide"),f("All Activities","Browse the index","/experiences.html",g.olduvai)].filter(Boolean)],Aa={destinations:{featured:{name:"Northern Circuit",label:"Start here",desc:"Serengeti, Ngorongoro, Tarangire & the great northern parks.",href:D("northern"),image:q("northern"),alt:"Northern Circuit Tanzania"},heading:{label:"Tanzania circuits",title:"Explore by region"},items:Fe,aside:{label:"Need a map?",title:"Every circuit, one index",tags:"North · South · Coast",quote:"Pick a circuit. We connect the nights and drives.",ctaText:"View all circuits",ctaHref:"/circuits.html",image:q("northern","/assets/about/main 11.jpg")},footer:{text:"View all circuits →",href:"/circuits.html"}},safaris:{featured:{name:"Northern Circuit",label:"Featured safari",desc:"Serengeti, Ngorongoro & Tarangire – the classic wildlife route.",href:"/safaris.html#northern-circuit",image:g.serengeti5d,alt:"Northern Circuit Tanzania safari"},heading:{label:"Safari types",title:"Browse by experience"},items:Ve,aside:{label:"Every circuit",title:"205 real itineraries",tags:"North · South · East · West",quote:"Wildlife, coast, mountains and culture – grouped by circuit on the full index.",ctaText:"Game drives catalog",ctaHref:"/game-drives.html",image:g.ruaha4d},footer:{text:"View all safaris →",href:"/safaris.html"}},thingsToDo:{featured:{name:"Great Migration",label:"Featured activity",desc:"Follow wildebeest herds and river crossings on the Serengeti corridor.",href:"/experiences/great-migration.html",image:g.migration,alt:"Great Migration Tanzania"},heading:{label:"Things to do",title:"Activities on your route"},items:Ue,aside:{label:"Matembo add-ons",title:"Pair with wildlife days",tags:"Culture · Hiking · Coast",quote:"Build migration focus, museum stops, or highland hikes into your safari.",ctaText:"Plan your route",ctaHref:"/contact.html",image:g.udzungwa},footer:{text:"View all activities →",href:"/experiences.html"}},ruaha:{featured:{name:"3 Days Safari to Ruaha",label:"From Iringa",desc:"Sunrise drives along the Great Ruaha River – wild dogs, elephants and lion country.",href:L("3-days-safari-to-ruaha-national-park"),image:g.ruaha3d,alt:"Ruaha National Park safari"},heading:{label:"Southern Circuit",title:"Ruaha National Park"},items:[f("Ruaha Express","2 Days / 1 Night",L("2-days-safari-to-ruaha-national-park"),g.ruaha2d),f("Ruaha Explorer","3 Days / 2 Nights",L("3-days-safari-to-ruaha-national-park"),g.ruaha3d),f("Ruaha Immersion","4 Days / 3 Nights",L("4-days-safari-in-ruaha-national-park"),g.ruaha4d),f("Southern Icons","Mikumi + Ruaha",L("5-days-safari-to-mikumi-ruaha-national-parks"),g.ruaha5d),f("Southern Classic","Ruaha + Udzungwa + Mikumi",L("7-days-safari-to-ruaha-udzungwa-and-mikumi-national-parks"),g.ruaha7d),f("Grand Southern","Nyerere + Ruaha route",L("10-days-safari-to-nyerere-mikumi-udzungwa-ruaha-national-parks"),g.ruaha10d),f("View Ruaha Gallery","Field photography","/about.html#about-ruaha-gallery","/assets/about/ruaha 1.jpg")],aside:{label:"Matembo home park",title:"108 km from Iringa",tags:"Wild dogs · Elephants · River drives",quote:"Ruaha is our backyard – we know the river bends where predators hunt at dawn.",ctaText:"View Ruaha routes",ctaHref:"/ruaha-safaris.html",image:g.ruaha4d},footer:{text:"View all Ruaha safaris →",href:"/ruaha-safaris.html"}},about:{featured:{name:"Safari people, not brochures",label:"About Matembo",desc:"Guides who live the seasons – based in Iringa, operating across every circuit.",href:"/about.html",image:R.hero,alt:"Matembo Safari & Tours in Tanzania"},heading:{label:"Matembo Safari & Tours",title:"Who we are"},items:Be,aside:{label:"Home base",title:"Gangilonga, Iringa",tags:"Ruaha · Southern · Northern circuits",quote:"Call or WhatsApp – we reply with a route outline tailored to your dates.",ctaText:"Plan your safari",ctaHref:"/contact.html",image:R.team},footer:{text:"Visit About page →",href:"/about.html"}}},W="https://www.tripadvisor.com/Attraction_Review-g297913-d29014688-Reviews-MATEMBO_SAFARIS_AND_TOURS-Arusha_Arusha_Region.html",Ke=[{label:"TripAdvisor reviews",href:W,icon:"fab fa-tripadvisor",variant:"tripadvisor"},{label:"Facebook",href:"https://www.facebook.com/share/1EZKbSs1Dr/",icon:"fab fa-facebook-f"},{label:"Instagram",href:"https://www.instagram.com/matembosafarisandtours",icon:"fab fa-instagram"},{label:"TikTok",href:"https://www.tiktok.com/@matembosafarisandtours",icon:"fab fa-tiktok"},{label:"WhatsApp",href:"https://wa.me/255679529700",icon:"fab fa-whatsapp"}],x={scriptLabel:"Guided from Iringa",title:"Safari people who know the road",image:"/assets/about/main 11.jpg",imageAlt:"Elephants crossing golden savanna in Tanzania",paragraphs:["Matembo Safari & Tours is a Tanzanian operator built around field knowledge, not brochure promises. We plan wildlife routes across the north and south, match lodges to your budget without cutting corners on guides or vehicles, and stay on call from your first WhatsApp to your last flight home.","George and the Matembo team work with private 4×4 fleets, licensed park access, and seasons in mind. Whether you want a week on the Serengeti plains or a shorter crater and lake circuit, the itinerary is drawn around how you travel, not a fixed template."],stats:[{value:"Northern & Southern",label:"Circuits covered"},{value:"Private 4×4",label:"Safari fleet"},{value:"TripAdvisor",label:"Verified listing"}]};function G(e,a="/assets/about/main3.jpg"){var r,s;const t=ge(e)[0];return((s=(r=t==null?void 0:t.images)==null?void 0:r[0])==null?void 0:s.src)||a}const Ye={"Northern Circuit":"northern","Southern Circuit":"southern","Eastern Circuit":"eastern","Western Circuit":"western","Zanzibar Island":"zanzibar","Mafia Island":"mafia","Central Circuit":"southern","Ocean Islands":"oceanic"};F.map(e=>({name:e.label,script:e.script,href:D(e.id),image:G(e.id)}));me.map(e=>{const a=Ye[e]||"northern",t=F.find(r=>r.id===a);return{name:e,script:(t==null?void 0:t.script)||"Tailored routes",href:fe(e),image:G(a)}});["museums","game-drives","great-migration","cultural-visits","bird-watching","hiking","waterfalls"].map(e=>C.find(a=>a.id===e)).filter(Boolean).map(e=>{var a,t,r;return{name:e.name,href:B(e),image:((a=e.images[0])==null?void 0:a.src)||((t=e.gallery[0])==null?void 0:t.src),alt:((r=e.images[0])==null?void 0:r.alt)||e.fullName,desc:e.tagline}});G("northern","/assets/about/ngorongoro.jpg"),G("southern","/assets/about/main 5.jpg"),G("zanzibar","/assets/about/main 8.jpg");const Ze=["game-drives","great-migration","cultural-visits","hiking","bird-watching","waterfalls"].map(e=>{const a=C.find(t=>t.id===e);return a?{title:a.name,text:a.tagline,icon:"◆",href:B(a)}:null}).filter(Boolean),Je="Field days, crater descents, coast add-ons, and routes drawn for your calendar – not pulled from a shelf.",Qe=[{label:"Based in",value:"Iringa, Tanzania"},{label:"TripAdvisor",value:"Verified listing",href:W},{label:"Contact",value:"+255 679 529 700",href:"tel:+255679529700"},{label:"Email",value:"info@matembosafaris.com",href:"mailto:info@matembosafaris.com"},{label:"Languages",value:"English & Swahili"},{label:"Focus",value:"Northern Circuit · Migration · Bush & Beach"}],Xe=[{quote:"Our guide read every movement on the plain. We had close elephant time near Tarangire and never felt rushed between stops.",author:"Sarah M.",location:"United Kingdom",rating:5,source:"TripAdvisor",sourceUrl:W},{quote:"Clear communication before we flew in, solid vehicle, and a crater day that matched what we were promised. Would book again.",author:"James K.",location:"Germany",rating:5,source:"TripAdvisor",sourceUrl:W},{quote:"Matembo adjusted our route when rains shifted the migration. That flexibility made the trip feel personal.",author:"Anna L.",location:"Netherlands",rating:5,source:"TripAdvisor",sourceUrl:W}],ea="Short notes from guests who travelled with us. Full reviews live on our TripAdvisor page.",I={signature:"Write to us",title:"Plan your safari with Matembo",text:"Share your travel dates, group size, and parks you have in mind. We reply with a route outline and lodge options. Prices are quoted directly – not listed on this site.",ctaPrimary:{label:"Plan your safari",href:"/contact.html"},ctaSecondary:{label:"WhatsApp",href:"https://wa.me/255679529700"}};function p(e){const a=document.createElement("div");return a.textContent=e,a.innerHTML}function aa(e){return e==null||typeof e!="string"?e:e.replace(/\u2014/g,"–")}function h(e){return p(aa(e))}function J(e=""){var t;return(((t=e.split("/").pop())==null?void 0:t.split("?")[0])||e).replace(/_\d+(?=\.(?:jpg|jpeg|png|webp))/i,"").replace(/shar-\d+brig-\d+[^.]*(?=\.(?:jpg|jpeg|png|webp))/i,"").replace(/_c\d+(?=\.(?:jpg|jpeg|png|webp))/i,"").toLowerCase()}function pe(e,a={}){const{excludeSrc:t="",max:r=4}=a,s=new Set;t&&(s.add(t),s.add(J(t)));const o=[];for(const l of e||[]){if(!(l!=null&&l.src))continue;const n=J(l.src);if(!(s.has(l.src)||s.has(n))&&(s.add(l.src),s.add(n),o.push(l),o.length>=r))break}return o}const ta={"great-migration":{prefer:/wildebeest|migration|gnu|crossing|herd|mara|zebra/i,reject:/leopard|lion|cheetah|hyena|ostrich|waterbuck|vulture|valture/i},"bird-watching":{prefer:/flamingo|bird|eagle|hornbill|kingfisher|stork|pelican|weaver|sunbird|turaco/i,reject:/colobus|monkey|giraffe|directions|fig_tree|ngurdoto(?!.*bird)/i},museums:{prefer:/museum|olduvai|kalenga|isimila|heritage|gorge|entrance|building|monument|boma|fort|ruins/i,reject:/leopard|lion|wildebeest|elephant(?!.*museum)/i},"game-drives":{prefer:/elephant|lion|leopard|buffalo|rhino|safari|vehicle|ngorongoro|serengeti|ruaha/i,reject:/museum|waterfall|building/i},"cultural-visits":{prefer:/rock|museum|isimila|igeleke|kalenga|gangilonga|cultural|heritage|maasai|hadzabe|coffee/i,reject:/leopard|wildebeest|flamingo/i},hiking:{prefer:/mount|kilimanjaro|meru|waterfall|udzungwa|hike|trail|peak|summit|forest/i,reject:/museum|building|leopard/i},waterfalls:{prefer:/waterfall|falls|cascade|materuni|sanje|ndudum|chole|pool|stream/i,reject:/museum|leopard|building/i}};function Q(e,a){var s,o;const t=ta[e];if(!t)return 0;let r=0;return(s=t.prefer)!=null&&s.test(a)&&(r+=10),(o=t.reject)!=null&&o.test(a)&&(r-=20),r}function ja(e,a=4){var s;const r=[...((s=e.gallery)!=null&&s.length?e.gallery:e.images)||[]].sort((o,l)=>Q(e.id,l.src)-Q(e.id,o.src));return pe(r,{max:a})}function Ta(e,a=280){if(!(e!=null&&e.trim()))return[];const t=e.replace(/\s+/g," ").trim(),r=t.split(/\b(?:Activities|Other Activities|Highlights)\b\s*/i);if(r.length>1)return r.map(n=>n.trim()).filter(n=>n.length>40);const s=t.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g)||[t],o=[];let l="";for(const n of s){const c=n.trim();c&&(l&&(l+" "+c).length>a?(o.push(l.trim()),l=c):l=l?`${l} ${c}`:c)}return l.trim()&&o.push(l.trim()),o.slice(0,6)}function Na(e,a=[]){var S;if(a.length)return a.map(v=>({title:v,body:""}));const t=e.replace(/\s+/g," ").trim(),r=t.search(/\bActivities\b/i);if(r<0)return[];const s=t.slice(r).replace(/^Activities\s*/i,""),o=s.search(/\bOther Activities\b/i),l=o>=0?s.slice(0,o):s,n=o>=0?s.slice(o).replace(/^Other Activities\s*/i,""):"",c=["Mountain Hiking","Mountain Biking","Swimming","Waterfalls","Forest Walk","Spice Tour","BBQ","Fishing","Bird Watching","Picnic","Board Game","Factory Tour","Bonfire","Camping","Meditation"],d=[];for(const v of c){const M=new RegExp(`${v}\\s*([^.!?]+[.!?]?)`,"i"),w=l.match(M);(S=w==null?void 0:w[1])!=null&&S.trim()&&d.push({title:v,body:w[1].trim()})}return n&&n.split(/(?=[A-Z][a-z])/).map(v=>v.trim()).filter(v=>v.length>2&&v.length<40).forEach(v=>d.push({title:v,body:""})),d.slice(0,8)}const ia=["/assets/photos/safaris/"],ra=[[/nyerere|selous/,"Nyerere_National_Park_Crocodiles_101.jpg"],[/mikumi/,"Mikumi_National_Park_Elephants_101.jpg"],[/ruaha/,"Ruaha_National_Park_Hippos_47.jpg"],[/udzungwa/,"Udzungwa_National_Park_Sanje_Waterfalls_21.jpg"],[/serengeti|migration|mara river/,"Serengeti_Gnus_7765.jpg"],[/ngorongoro/,"Ngorongoro_Crater_View_NCA.jpg"],[/tarangire/,"Tarangire_National_Park_Elephants_in_Trangire_River_35.jpg"],[/manyara/,"Lake_Manyara_National_Park_Flamingos_26.jpg"],[/kilwa|songomnara/,"Kilwa_Kisiwani_Ruins_01.jpg"],[/zanzibar|beach|honeymoon/,"Zanzibar_Stone_Town_01.jpg"],[/dar es salaam|city tour/,"Dar_es_Salaam_Skyline_01.jpg"],[/uluguru|morogoro/,"Uluguru_Mountains_from_Morogoro_01.jpg"],[/kilimanjaro|arusha|northern circuit|big five/,"Mount_Kilimanjaro_from_Amboseli.jpg"],[/southern circuit|eastern circuit/,"Mikumi_National_Park_Elephants_101.jpg"]];function X(e=""){return ia.some(a=>e.startsWith(a))}function sa(e){return[e.title,e.circuit,e.overview,...e.destinations||[],...e.activities||[]].filter(Boolean).join(" ").toLowerCase()}function ee(e){const a=sa(e);for(const[t,r]of ra)if(t.test(a))return`/assets/photos/${r}`;return"/assets/photos/Mikumi_National_Park_Elephants_101.jpg"}function oa(e){var s,o;const a=e.alt||e.title,t=[e.image,...(e.gallery||[]).map(l=>l.src)].filter(Boolean),r=t.find(l=>l.startsWith("/assets/photos/")&&!X(l));return r?{src:r,alt:a}:X(e.image||t[0]||"")?{src:ee(e),alt:a}:{src:e.image||((o=(s=e.gallery)==null?void 0:s[0])==null?void 0:o.src)||ee(e),alt:a}}function Ca(e,a=3){const t=oa(e),r=pe(e.gallery||[],{excludeSrc:t.src,max:a});return{hero:t,extras:r}}const k=[{id:"ruaha",signature:"Before the River Cools",title:"Ruaha",lead:"Elephant herds drift through the Great Ruaha – wild dogs on the sand, lions beneath the fever trees.",image:"/assets/hero/new hero.jpg",imageAlt:"Elephant herds moving through Ruaha National Park",focus:"center 52%",mobileFocus:"54% 50%",motion:"drift-up",textLayout:"bottom",cta:{label:"Ruaha Safaris",href:"/ruaha-safaris.html"}},{id:"serengeti",signature:"Land of Endless Plains",title:"Serengeti",lead:"Golden light on the Seronera – cheetah on the termite mounds, lion prides, acacia horizons that never end.",image:"/assets/photos/Serengeti_Gnus_7765.jpg",imageAlt:"Wildebeest and plains on the Serengeti",focus:"center 42%",motion:"zoom-in",cta:{label:"Serengeti Safaris",href:"/destinations/serengeti.html"}},{id:"great-migration",signature:"When the Earth Moves",title:"The Great Migration",lead:"A million hooves thunder across the Mara – crocodiles wait in the river, predators follow the dust.",image:"/assets/photos/Serengeti_Wildebeests_03.jpg",imageAlt:"Wildebeest herds crossing the Serengeti plains",focus:"center 50%",motion:"pan-right",cta:{label:"Migration Safaris",href:"/experiences/great-migration.html"}},{id:"ngorongoro",signature:"Africa's Eden",title:"Ngorongoro Crater",lead:"Six hundred metres down into a living caldera – black rhino, flamingo lakes, and black-maned lions.",image:"/assets/photos/Ngorongoro_Crater_View_NCA.jpg",imageAlt:"Panoramic view over Ngorongoro Crater",focus:"center 38%",motion:"zoom-out",cta:{label:"Crater Safaris",href:"/destinations/ngorongoro.html"}},{id:"kilimanjaro",signature:"Touch the Snow Line",title:"Kilimanjaro",lead:"From coffee-shaded foothills to Uhuru Peak – Africa's highest summit painted in dawn light.",image:"/assets/photos/Mount_Kilimanjaro_Tanzania.jpg",imageAlt:"Mount Kilimanjaro rising above the clouds",focus:"center 35%",motion:"drift-up",cta:{label:"Climbing Routes",href:"/trekkings.html"}},{id:"gombe",signature:"Forest on the Lake",title:"Gombe Stream",lead:"Follow chimpanzees through Jane Goodall's forest – Lake Tanganyika glinting through the canopy.",image:"/assets/photos/Gombe_Stream_National_Park_Chimp_15.jpg",imageAlt:"Chimpanzee in Gombe Stream National Park",focus:"center 45%",motion:"pan-left",cta:{label:"Explore Gombe",href:"/destinations/gombe.html"}},{id:"cultural-visits",signature:"Stories in the Soil",title:"Living Culture",lead:"Maasai ceremonies on the crater rim, Hehe rock art, Stone Town doors – Tanzania told by its people.",image:"/assets/photos/Olkarien_Gorge_Maasai_with_Goats_NCA_5.jpg",imageAlt:"Maasai herder with goats in Ngorongoro highlands",focus:"center 40%",motion:"pan-right",cta:{label:"Cultural Routes",href:"/cultural-visits.html"}}];function _e(e){return p(e)}function ve(e){const a=e.focus||"center center",t=e.mobileFocus||a;return`--hero-focus: ${a}; --hero-focus-mobile: ${t}`}function na(e){return"★".repeat(e)+"☆".repeat(Math.max(0,5-e))}function la(e,a){return`
    <div
      class="hero-showcase__slide${a===0?" is-active":""}"
      data-hero-slide="${a}"
      data-motion="${p(e.motion||"zoom-in")}"
    >
      <img
        class="hero-showcase__img"
        ${a===0?`src="${p(e.image)}" fetchpriority="high"`:`data-src="${p(e.image)}" src="" loading="lazy"`}
        alt="${p(e.imageAlt)}"
        width="1920"
        height="1080"
        decoding="async"
        style="${ve(e)}"
      />
      <div class="hero-showcase__overlay" aria-hidden="true">
        <div class="hero-showcase__overlay-tint"></div>
        <div class="hero-showcase__overlay-vignette"></div>
        <div class="hero-showcase__overlay-scrim"></div>
        <div class="hero-showcase__overlay-glow"></div>
        <div class="hero-showcase__overlay-grain"></div>
      </div>
    </div>
  `}function ca(e,a){return`
    <article
      class="hero-showcase__panel${a===0?" is-active":""}"
      data-hero-panel="${a}"
      data-text-layout="${p(e.textLayout||"center")}"
      aria-hidden="${a===0?"false":"true"}"
    >
      <div class="hero-showcase__copy">
        <p class="hero-showcase__signature">${h(e.signature)}</p>
        <h1 class="hero-showcase__title">${h(e.title)}</h1>
        <p class="hero-showcase__lead">${h(e.lead)}</p>
      </div>
      <a href="${_e(e.cta.href)}" class="btn btn--ghost hero-showcase__cta">${h(e.cta.label)}</a>
    </article>
  `}function ha(e,a){return`
    <button
      type="button"
      class="hero-showcase__dot${a===0?" is-active":""}"
      data-hero-dot="${a}"
      aria-label="Show ${p(e.title)}"
      aria-selected="${a===0?"true":"false"}"
    ></button>
  `}function be(e=document.querySelector("#home-hero")){const a=e==null?void 0:e.querySelector("[data-hero-slideshow]");if(!a)return;const t=a.querySelector(".hero-showcase__slides"),r=a.querySelector(".hero-showcase__panels"),s=a.querySelector(".hero-showcase__dots"),o=a.querySelector("[data-hero-counter]"),l=a.querySelector("[data-hero-progress]");if(!t||!r||!s)return;const n=t.querySelectorAll("[data-hero-slide]").length;if(n>=k.length)return;const c=String(k.length).padStart(2,"0");for(let d=n;d<k.length;d++)t.insertAdjacentHTML("beforeend",la(k[d],d)),r.insertAdjacentHTML("beforeend",ca(k[d],d)),s.insertAdjacentHTML("beforeend",ha(k[d],d));o&&(o.textContent=`01 / ${c}`),l&&(l.style.width=`${Math.round(100/k.length)}%`)}function ua(){var l;const e=document.querySelector("#home-hero");if(!e)return;if(e.querySelector("[data-hero-slideshow]")){be(e);return}(l=e.querySelector("#hero-lcp-bootstrap"))==null||l.remove();const a=String(k.length).padStart(2,"0"),t=k.map((n,c)=>`
        <div
          class="hero-showcase__slide${c===0?" is-active":""}"
          data-hero-slide="${c}"
          data-motion="${p(n.motion||"zoom-in")}"
        >
          <img
            class="hero-showcase__img${c===0?" is-loaded":""}"
            ${c===0?`src="${p(n.image)}" fetchpriority="high"`:`data-src="${p(n.image)}" src=""`}
            alt="${p(n.imageAlt)}"
            width="1920"
            height="1080"
            ${c===0?'decoding="async"':'loading="lazy" decoding="async"'}
            style="${ve(n)}"
          />
          <div class="hero-showcase__overlay" aria-hidden="true">
            <div class="hero-showcase__overlay-tint"></div>
            <div class="hero-showcase__overlay-vignette"></div>
            <div class="hero-showcase__overlay-scrim"></div>
            <div class="hero-showcase__overlay-glow"></div>
            <div class="hero-showcase__overlay-grain"></div>
          </div>
        </div>
      `).join(""),r=Array.from({length:5},(n,c)=>`<span class="hero-showcase__particle" style="--i:${c}"></span>`).join(""),s=k.map((n,c)=>`
        <article
          class="hero-showcase__panel${c===0?" is-active":""}"
          data-hero-panel="${c}"
          data-text-layout="${p(n.textLayout||"center")}"
          aria-hidden="${c===0?"false":"true"}"
        >
          <div class="hero-showcase__copy">
            <p class="hero-showcase__signature">${h(n.signature)}</p>
            <h1 class="hero-showcase__title">${h(n.title)}</h1>
            <p class="hero-showcase__lead">${h(n.lead)}</p>
          </div>
          <a href="${_e(n.cta.href)}" class="btn btn--ghost hero-showcase__cta">${h(n.cta.label)}</a>
        </article>
      `).join(""),o=k.map((n,c)=>`
        <button
          type="button"
          class="hero-showcase__dot${c===0?" is-active":""}"
          data-hero-dot="${c}"
          aria-label="Show ${p(n.title)}"
          aria-selected="${c===0?"true":"false"}"
        ></button>
      `).join("");e.innerHTML=`
    <section
      class="hero-showcase hero-showcase--text-bottom"
      id="story"
      data-hero
      data-hero-slideshow
      data-interval="9000"
      aria-label="Tanzania safari highlights"
    >
      <div class="hero-showcase__stage">
        <div class="hero-showcase__slides" aria-hidden="true">${t}</div>
        <div class="hero-showcase__film" aria-hidden="true">
          <div class="hero-showcase__film-gradient"></div>
          <div class="hero-showcase__particles">${r}</div>
        </div>

        <div class="hero-showcase__content">
          <div class="hero-showcase__panels">${s}</div>

          <nav class="hero-showcase__nav" aria-label="Hero slideshow navigation">
            <button type="button" class="hero-showcase__arrow hero-showcase__arrow--prev" data-hero-prev aria-label="Previous slide">
              <i class="fas fa-chevron-left" aria-hidden="true"></i>
            </button>

            <div class="hero-showcase__rail">
              <span class="hero-showcase__counter" data-hero-counter aria-live="polite">01 / ${a}</span>
              <div class="hero-showcase__track" aria-hidden="true">
                <span class="hero-showcase__fill" data-hero-progress style="width: ${Math.round(100/k.length)}%"></span>
              </div>
              <div class="hero-showcase__dots" role="tablist" aria-label="Hero slides">${o}</div>
            </div>

            <button type="button" class="hero-showcase__arrow hero-showcase__arrow--next" data-hero-next aria-label="Next slide">
              <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </button>
          </nav>
        </div>
      </div>
    </section>
  `}function da(){const e=document.querySelector("#home-about");e&&(e.innerHTML=`
    <section class="home-about" id="about" aria-labelledby="about-title">
      <div class="container home-about__grid">
        <div class="home-about__media section-reveal">
          <img
            class="reveal-on-scroll"
            src="${p(x.image)}"
            alt="${h(x.imageAlt)}"
            width="480"
            height="560"
            loading="lazy"
          />
          <span class="home-about__media-overlay home-about__media-overlay--gold" aria-hidden="true"></span>
          <span class="home-about__media-overlay home-about__media-overlay--green" aria-hidden="true"></span>
        </div>

        <div class="home-about__content section-reveal">
          <span class="home-section__label">About Matembo</span>
          <span class="home-about__script">${h(x.scriptLabel)}</span>
          <h2 id="about-title" class="home-section__title">${h(x.title)}</h2>
          ${x.paragraphs.map((a,t)=>`<p class="home-about__text"${t?` data-reveal-delay="${Math.min(t,2)}"`:""}>${h(a)}</p>`).join("")}
          <dl class="home-about__stats">
            ${x.stats.map((a,t)=>`
                  <div class="home-about__stat"${t?` data-reveal-delay="${Math.min(t,2)}"`:""}>
                    <dt>${h(a.label)}</dt>
                    <dd>${h(a.value)}</dd>
                  </div>
                `).join("")}
          </dl>
        </div>
      </div>
    </section>
  `)}function ga(){const e=document.querySelector("#home-experiences");e&&(e.innerHTML=`
    <section class="home-experiences" id="experiences" aria-labelledby="experiences-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">What We Offer</span>
          <h2 id="experiences-title" class="home-section__title">Safari Experiences</h2>
          <p class="home-section__desc">${h(Je)}</p>
        </header>

        <div class="home-experiences__grid">
          ${Ze.map((a,t)=>`
                <article class="experience-card" data-reveal ${t%3?`data-reveal-delay="${t%3}"`:""}>
                  <span class="experience-card__icon" aria-hidden="true">${p(a.icon)}</span>
                  <h3 class="experience-card__title">${h(a.title)}</h3>
                  <p class="experience-card__text">${h(a.text)}</p>
                  ${a.href?`<a href="${p(a.href)}" class="experience-card__link">Explore →</a>`:""}
                </article>
              `).join("")}
        </div>
      </div>
    </section>
  `)}function ma(){const e=document.querySelector("#home-credentials");e&&(e.innerHTML=`
    <section class="home-credentials" id="credentials" aria-labelledby="credentials-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">Trust & Credentials</span>
          <h2 id="credentials-title" class="home-section__title">Travel With Confidence</h2>
        </header>

        <dl class="credentials-grid">
          ${Qe.map((a,t)=>`
                <div class="credentials-grid__item" data-reveal ${t%3?`data-reveal-delay="${t%3}"`:""}>
                  <dt>${h(a.label)}</dt>
                  <dd>
                    ${a.href?`<a href="${p(a.href)}" target="_blank" rel="noopener noreferrer">${h(a.value)}</a>`:h(a.value)}
                  </dd>
                </div>
              `).join("")}
        </dl>
      </div>
    </section>
  `)}function fa(){const e=document.querySelector("#home-testimonials");e&&(e.innerHTML=`
    <section class="home-testimonials" id="testimonials" aria-labelledby="testimonials-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">Guest Voices</span>
          <h2 id="testimonials-title" class="home-section__title">What Travellers Say</h2>
          <p class="home-section__desc">${h(ea)} <a href="${p(W)}" target="_blank" rel="noopener noreferrer"><i class="fab fa-tripadvisor" aria-hidden="true"></i> TripAdvisor</a>.</p>
        </header>

        <div class="testimonials-grid">
          ${Xe.map((a,t)=>`
                <blockquote class="testimonial-card" data-reveal ${t?`data-reveal-delay="${t}"`:""}>
                  <div class="testimonial-card__stars" aria-label="${a.rating} out of 5 stars">${na(a.rating)}</div>
                  <p class="testimonial-card__quote">“${h(a.quote)}”</p>
                  <footer class="testimonial-card__footer">
                    <cite class="testimonial-card__author">${h(a.author)}</cite>
                    <span class="testimonial-card__meta">${h(a.location)} · ${h(a.source)}</span>
                  </footer>
                </blockquote>
              `).join("")}
        </div>
      </div>
    </section>
  `)}function pa(){const e=document.querySelector("#home-contact");e&&(e.innerHTML=`
    <section class="home-contact" id="contact" aria-labelledby="contact-title">
      <div class="container home-contact__inner section-reveal">
        <span class="home-contact__script">${h(I.signature)}</span>
        <h2 id="contact-title" class="home-contact__title">${h(I.title)}</h2>
        <p class="home-contact__text">${h(I.text)}</p>
        <div class="home-contact__actions">
          <a href="${p(I.ctaPrimary.href)}" class="btn btn--primary">${h(I.ctaPrimary.label)}</a>
          <a href="${p(I.ctaSecondary.href)}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">${h(I.ctaSecondary.label)}</a>
        </div>
        <p class="home-contact__meta">${h(P.location)} · ${h(P.phone)}</p>
      </div>
    </section>
  `)}function _a(){const e=document.querySelector("#site-footer");if(!e)return;const a=Ke.map(t=>`
        <a
          class="site-footer__social-link${t.variant==="tripadvisor"?" site-footer__social-link--tripadvisor":""}"
          href="${p(t.href)}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="${h(t.label)}"
        >
          <i class="${p(t.icon)}" aria-hidden="true"></i>
        </a>
      `).join("");e.innerHTML=`
    <footer class="site-footer">
      <div class="site-footer__top">
        <div class="container site-footer__grid">
          <div class="site-footer__brand">
            <span class="site-footer__monogram" aria-hidden="true">M</span>
            <p class="site-footer__name">${h(P.name)}</p>
            <p class="site-footer__tagline">Private wildlife journeys across Tanzania – from Serengeti plains to crater rim and coast.</p>
            <p class="site-footer__location">
              <i class="fas fa-location-dot" aria-hidden="true"></i>
              ${h(P.location)}
            </p>
          </div>

          <nav class="site-footer__col" aria-label="Explore">
            <span class="site-footer__col-label">Explore</span>
            <a class="site-footer__link" href="/circuits.html">
              <i class="fas fa-compass" aria-hidden="true"></i>
              Circuits
            </a>
            <a class="site-footer__link" href="/destinations.html">
              <i class="fas fa-map" aria-hidden="true"></i>
              All Destinations
            </a>
            <a class="site-footer__link" href="/safaris.html">
              <i class="fas fa-route" aria-hidden="true"></i>
              Safari Packages
            </a>
            <a class="site-footer__link" href="/about.html">
              <i class="fas fa-leaf" aria-hidden="true"></i>
              About Matembo
            </a>
            <a class="site-footer__link" href="/#services">
              <i class="fas fa-binoculars" aria-hidden="true"></i>
              Safari Experiences
            </a>
          </nav>

          <nav class="site-footer__col" aria-label="Plan your trip">
            <span class="site-footer__col-label">Book</span>
            <a class="site-footer__link site-footer__link--accent" href="/contact.html">
              <i class="fas fa-calendar-check" aria-hidden="true"></i>
              Plan Your Safari
            </a>
            <a class="site-footer__link" href="${p(W)}" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-tripadvisor" aria-hidden="true"></i>
              TripAdvisor Reviews
            </a>
            <a class="site-footer__link" href="/circuits/northern.html">
              <i class="fas fa-map" aria-hidden="true"></i>
              Northern Circuit
            </a>
          </nav>

          <div class="site-footer__col">
            <span class="site-footer__col-label">Contact</span>
            <a class="site-footer__link" href="tel:+255679529700">
              <i class="fas fa-phone" aria-hidden="true"></i>
              ${h(P.phone)}
            </a>
            <a class="site-footer__link" href="mailto:${p(P.email)}">
              <i class="fas fa-envelope" aria-hidden="true"></i>
              ${h(P.email)}
            </a>
            <a class="site-footer__link" href="https://wa.me/255679529700" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-whatsapp" aria-hidden="true"></i>
              WhatsApp enquiry
            </a>
          </div>
        </div>
      </div>

      <div class="site-footer__social-bar">
        <div class="container site-footer__social-inner">
          <div class="site-footer__social" aria-label="Follow Matembo Safari & Tours">
            ${a}
          </div>
          <p class="site-footer__copyright">
            © ${new Date().getFullYear()} ${h(P.name)}. Wildlife safaris across Tanzania.
          </p>
        </div>
      </div>
    </footer>
  `}const La=Object.freeze(Object.defineProperty({__proto__:null,enhanceHeroSlideshow:be,renderAbout:da,renderContactCta:pa,renderCredentials:ma,renderExperiences:ga,renderHero:ua,renderSiteFooter:_a,renderTestimonials:fa},Symbol.toStringTag,{value:"Module"}));export{F as D,Ae as N,_a as a,P as b,I as c,D as d,p as e,h as f,fe as g,C as h,ka as i,B as j,pe as k,Ta as l,Oe as m,Ma as n,Sa as o,ja as p,ua as q,ya as r,Ke as s,Ca as t,Na as u,Te as v,We as w,Aa as x,La as y};
