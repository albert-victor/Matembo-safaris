import{l as O}from"./scroll-reveal-DQEng0_I.js";import{a as Z}from"./render-cards-BbVXQDY5.js";import{c as f,b as I}from"./render-home-C8iai7iV.js";function W(a,e,i){for(let s=e;s<Math.min(e+i,a.length);s++)O(a[s],{priority:s===e})}function V(a){const e=Number(a.dataset.visible)||3;return window.matchMedia("(min-width: 1200px)").matches?e:window.matchMedia("(min-width: 768px)").matches?Math.min(2,e):1}function ca(a=document){if(!(a!=null&&a.querySelectorAll))return;const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches;a.querySelectorAll("[data-autoslider]").forEach(i=>{if(i.dataset.autosliderInit==="true")return;i.dataset.autosliderInit="true";const s=i.querySelector("[data-autoslider-track]"),o=i.querySelector("[data-autoslider-dots]"),d=i.querySelector("[data-autoslider-count]"),c=i.querySelector("[data-autoslider-prev]"),u=i.querySelector("[data-autoslider-next]"),g=s?[...s.children]:[];if(!g.length)return;let l=0,m=1,p=0,w=null,C=!1,S=!1,b=null,_=null;const x=Number(i.dataset.autoplay||5e3),U=42,R=()=>{m=V(i),p=Math.max(0,g.length-m),l>p&&(l=0),s.style.setProperty("--autoslider-visible",String(m))},B=()=>{var h;const r=parseFloat(getComputedStyle(s).gap)||16,n=((h=g[0])==null?void 0:h.getBoundingClientRect().width)||0;return l*(n+r)},D=()=>{if(!o)return;const r=p+1;o.innerHTML=Array.from({length:r},(n,h)=>`
        <button
          type="button"
          class="autoslider__dot ${h===l?"is-active":""}"
          data-autoslider-dot="${h}"
          role="tab"
          aria-selected="${h===l?"true":"false"}"
          aria-label="Go to slide ${h+1}"
        ></button>
      `).join(""),o.querySelectorAll("[data-autoslider-dot]").forEach(n=>{n.addEventListener("click",()=>{y(Number(n.dataset.autosliderDot)),N()})})},H=()=>{if(!d)return;const r=l+1,n=Math.min(l+m,g.length);d.textContent=`${r}–${n} of ${g.length}`},y=r=>{l=(r%(p+1)+(p+1))%(p+1),S=!0,i.classList.add("is-advancing"),s.style.transform=`translate3d(-${B()}px, 0, 0)`,o==null||o.querySelectorAll("[data-autoslider-dot]").forEach((n,h)=>{const E=h===l;n.classList.toggle("is-active",E),n.setAttribute("aria-selected",E?"true":"false")}),H(),W(g,l,m),window.setTimeout(()=>{S=!1,i.classList.remove("is-advancing")},320)},K=()=>{R(),D(),C&&requestAnimationFrame(()=>y(l))};let z=null;const q=()=>{clearTimeout(z),z=window.setTimeout(()=>{K()},120)},P=()=>y(l+1),L=()=>y(l-1),v=()=>{w&&(clearInterval(w),w=null)},k=()=>{e||p<=0||(v(),w=setInterval(P,x))},N=()=>{v(),k()};c==null||c.addEventListener("click",()=>{L(),N()}),u==null||u.addEventListener("click",()=>{P(),N()}),i.addEventListener("mouseenter",v),i.addEventListener("mouseleave",k),i.addEventListener("focusin",v),i.addEventListener("focusout",r=>{i.contains(r.relatedTarget)||k()}),i.addEventListener("pointerdown",r=>{b={x:r.clientX,y:r.clientY},(r.pointerType==="touch"||r.pointerType==="pen")&&(_=r.clientX,v())},{passive:!0}),i.addEventListener("pointermove",r=>{_!=null&&r.clientX-_},{passive:!0}),i.addEventListener("pointerup",r=>{if(_==null)return;const n=r.clientX-_;_=null,Math.abs(n)>=U?(n<0?P():L(),N()):k()},{passive:!0}),i.addEventListener("click",r=>{if(S){r.preventDefault(),r.stopPropagation();return}if(b){const n=Math.abs(r.clientX-b.x)>8||Math.abs(r.clientY-b.y)>8;b=null,n&&(r.preventDefault(),r.stopPropagation())}},!0),window.addEventListener("resize",q,{passive:!0}),"ResizeObserver"in window&&new ResizeObserver(q).observe(s),R(),D(),requestAnimationFrame(()=>{y(0),W(g,0,m),C=!0,setTimeout(k,600)})})}function A(a={}){const{id:e="",label:i="Carousel",autoplay:s=5e3,visible:o="",showArrows:d=!0,showCount:c=!0,trackHtml:u=""}=a;return`
    <div
      class="autoslider"
      data-autoslider
      data-autoplay="${s}"
      ${o?`data-visible="${o}"`:""}
      ${e?`id="${e}"`:""}
    >
      ${d?`
        <div class="autoslider__controls">
          <button type="button" class="autoslider__arrow autoslider__arrow--prev" data-autoslider-prev aria-label="Previous">
            <span aria-hidden="true">‹</span>
          </button>
          <button type="button" class="autoslider__arrow autoslider__arrow--next" data-autoslider-next aria-label="Next">
            <span aria-hidden="true">›</span>
          </button>
        </div>
      `:""}
      <div class="autoslider__viewport" tabindex="0" aria-roledescription="carousel" aria-label="${i}">
        <div class="autoslider__track" data-autoslider-track>${u}</div>
      </div>
      <div class="autoslider__footer">
        <div class="autoslider__dots" data-autoslider-dots role="tablist" aria-label="Carousel pages"></div>
        ${c?'<p class="autoslider__count" data-autoslider-count aria-live="polite"></p>':""}
      </div>
    </div>
  `}const X=[{id:"serengeti",name:"Serengeti",scriptLabel:"Endless Plains",journeys:"18 tours · 583 reviews",highlights:["Adventure Safaris"],images:[{src:"/assets/photos/Serengeti_Gnus_7765.jpg",alt:"Serengeti National Park"},{src:"/assets/photos/Serengeti_Migration_P103.jpg",alt:"Serengeti National Park – view 2"}]},{id:"ngorongoro",name:"Ngorongoro Crater",scriptLabel:"Africa's Eden",journeys:"19 tours · 407 reviews",highlights:["Wildlife viewing","Crater scenery","Adventure Safaris"],images:[{src:"/assets/photos/Ngorongoro_Crater_View_NCA.jpg",alt:"Ngorongoro Crater"},{src:"/assets/photos/Ngorongoro_Crater_Swamps_NCA.jpg",alt:"Ngorongoro Crater – view 2"}]},{id:"ruaha",name:"Ruaha",scriptLabel:"Wild Heart of the South",journeys:"8 tours · 301 reviews",highlights:["Adventure Safaris"],images:[{src:"/assets/photos/Ruaha_National_Park_Tanzania.jpg",alt:"Ruaha National Park"},{src:"/assets/photos/Ruaha_National_Park_Ruaha_River_85.jpg",alt:"Ruaha National Park – view 2"}]},{id:"mikumi",name:"Mikumi",scriptLabel:"Wildlife Gateway",journeys:"13 tours · 258 reviews",highlights:["Botanical wonders","Mountain routes","Adventure Safaris"],images:[{src:"/assets/photos/Mikumi_National_Park_Elephants_101.jpg",alt:"Mikumi National Park"},{src:"/assets/photos/Mikumi_National_Park_Zebras_111.jpg",alt:"Mikumi National Park – view 2"}]},{id:"tarangire",name:"Tarangire",scriptLabel:"Baobab Country",journeys:"13 tours · 384 reviews",highlights:["Wildlife viewing","Elephant country","Adventure Safaris"],images:[{src:"/assets/photos/Tarangire_National_Park_20.jpg",alt:"Tarangire National Park"},{src:"/assets/photos/Tarangire_National_Park_Elephants_in_Trangire_River_42.jpg",alt:"Tarangire National Park – view 2"}]},{id:"kilimanjaro",name:"Kilimanjaro",scriptLabel:"Roof of Africa",journeys:"21 tours · 440 reviews",highlights:["Mountain routes","Mountain Climbing"],images:[{src:"/assets/photos/Mount_Kilimanjaro_Tanzania.jpg",alt:"Mount Kilimanjaro National Park"},{src:"/assets/photos/Kilimanjaro_Climb_Rongai_Route_01.jpg",alt:"Mount Kilimanjaro National Park – view 2"}]},{id:"zanzibar",name:"Zanzibar Island",scriptLabel:"Spice Island Escape",journeys:"14 tours · 266 reviews",highlights:["Beaches & coast","Culture & heritage","Island escapes"],images:[{src:"/assets/photos/Zanzibar_Stone_Town_01.jpg",alt:"Zanzibar Island"},{src:"/assets/photos/Zanzibar_Island_Stone_Town_02.jpg",alt:"Zanzibar Island – view 2"}]},{id:"nyerere",name:"Nyerere",scriptLabel:"Rivers & Wilderness",journeys:"10 tours · 235 reviews",highlights:["Rivers & boat safaris","Adventure Safaris"],images:[{src:"/assets/photos/Selous_Game_Reserve_Aeroview.jpg",alt:"Nyerere National Park"},{src:"/assets/photos/Nyerere_National_Park_Elephants_61.jpg",alt:"Nyerere National Park – view 2"}]},{id:"manyara",name:"Lake Manyara",scriptLabel:"Tree-Climbing Lions",journeys:"15 tours · 428 reviews",highlights:["Lakes & birdlife","Adventure Safaris"],images:[{src:"/assets/photos/Lake_Manyara_National_Park_Giraffes_24.jpg",alt:"Lake Manyara National Park"},{src:"/assets/photos/Lake_Manyara_National_Park_Elephants_24.jpg",alt:"Lake Manyara National Park – view 2"}]},{id:"udzungwa",name:"Udzungwa Mountains Park",scriptLabel:"Waterfall Highlands",journeys:"8 tours · 224 reviews",highlights:["Mountain routes","Mountain Climbing, Walking Safaris"],images:[{src:"/assets/photos/Udzungwa_National_Park_Sanje_Waterfalls_21.jpg",alt:"Udzungwa Mountains Park"},{src:"/assets/photos/Udzungwa_National_Park_Sanje_Viewpoint_14.jpg",alt:"Udzungwa Mountains Park – view 2"}]},{id:"katavi",name:"Katavi",scriptLabel:"Remote Plains",journeys:"4 tours · 205 reviews",highlights:["Remote wilderness","Adventure Safaris"],images:[{src:"/assets/photos/Katavi_National_Park_x_70.jpg",alt:"Katavi National Park"},{src:"/assets/photos/Katavi_National_Park_Sunset_62.jpg",alt:"Katavi National Park – view 2"}]},{id:"arusha",name:"Arusha",scriptLabel:"Mount Meru Gateway",journeys:"7 tours · 406 reviews",highlights:["Crater scenery","Adventure Safaris"],images:[{src:"/assets/photos/Arusha_National_Park_Tanzania.jpg",alt:"Arusha National Park"},{src:"/assets/photos/Arusha_National_Park_Momella_Lake_Flamingos_83.jpg",alt:"Arusha National Park – view 2"}]},{id:"mafia",name:"Mafia Island",scriptLabel:"Marine Paradise",journeys:"17 tours · 217 reviews",highlights:["Marine life & reefs","Beaches & coast","Island escapes"],images:[{src:"/assets/photos/Mafia_Island_Chole_Mjini.jpg",alt:"Mafia Island"},{src:"/assets/photos/Mafia_Island_Diving_01.jpg",alt:"Mafia Island – view 2"}]}],J=[{id:"3-days-to-serengeti-national-park-and-ngorongoro-crater",title:"3 Days to Serengeti National Park and Ngorongoro Crater",highlights:["Serengeti National Park","Ngorongoro Crater","Game Drives","Great Migration","Moshi / Arusha – Serengeti National Park"],badge:null,objectPosition:"center center",image:"/assets/photos/Serengeti_Kopjes_7980.jpg",alt:"3 Days to Serengeti National Park and Ngorongoro Crater",duration:"3 Days / 2 Nights",circuit:"Northern Circuit"},{id:"5-days-serengeti-and-ngorongoro-crater-safari",title:"5 Days Serengeti and Ngorongoro Crater Safari",highlights:["Serengeti National Park","Ngorongoro Crater","Game Drives","Great Migration","Moshi / Arusha – Serengeti National Park"],badge:null,objectPosition:"center center",image:"/assets/photos/Serengeti_National_Park_Leopard_24.jpg",alt:"5 Days Serengeti and Ngorongoro Crater Safari",duration:"5 Days / 4 Nights",circuit:"Northern Circuit"},{id:"day-trip-to-ngorongoro-crater",title:"Day Trip to Ngorongoro Crater",highlights:["Ngorongoro Crater","Game Drives","Bird Watching","Arusha / Moshi – Ngorongoro Crater – Arusha / Moshi"],badge:null,objectPosition:"center center",image:"/assets/photos/Ngorongoro_Crater_Black_Rhinos_NCA_02.jpg",alt:"Day Trip to Ngorongoro Crater",duration:"Day Trip",circuit:"Northern Circuit"},{id:"2-days-to-tarangire-national-park-ngorongoro-crater",title:"2 Days to Tarangire National Park & Ngorongoro Crater",highlights:["Tarangire National Park","Ngorongoro Crater","Game Drives","Bird Watching","Arusha / Moshi - Tarangire National Park"],badge:"Popular",objectPosition:"center center",image:"/assets/photos/Ngorongoro_Crater_01_NCA.jpg",alt:"2 Days to Tarangire National Park & Ngorongoro Crater",duration:"2 Days / 1 Night",circuit:"Northern Circuit"},{id:"2-days-safari-to-ruaha-national-park",title:"2 Days Safari to Ruaha National Park",highlights:["Ruaha National Park","Game Drives","Bird Watching","Transfer to Ruaha National Park","Ruaha Morning Game Drive and Departure"],badge:null,objectPosition:"center center",image:"/assets/photos/Ruaha_National_Park_Boat_on_the_River_86.jpg",alt:"2 Days Safari to Ruaha National Park",duration:"2 Days / 1 Night",circuit:"Southern Circuit"},{id:"3-days-safari-to-ruaha-national-park",title:"3 Days Safari to Ruaha National Park",highlights:["Ruaha National Park","Game Drives","Bird Watching","Dar es Salaam - Ruaha National Park","Full day Ruaha National Park"],badge:null,objectPosition:"center center",image:"/assets/photos/Ruaha_National_Park_Waterbucks_78.jpg",alt:"3 Days Safari to Ruaha National Park",duration:"3 Days / 2 Nights",circuit:"Southern Circuit"},{id:"5-days-safari-to-mikumi-ruaha-national-parks",title:"5 Days Safari to Mikumi & Ruaha National Parks",highlights:["Mikumi National Park","Isimila Stone Age Site","Game Drives","Bird Watching","Dar es Salaam – Mikumi National Park (6 hrs drive)"],badge:null,objectPosition:"center center",image:"/assets/photos/Ruaha_National_Park_Elephants_41.jpg",alt:"5 Days Safari to Mikumi & Ruaha National Parks",duration:"5 Days / 4 Nights",circuit:"Southern Circuit"},{id:"4-days-safari-in-ruaha-national-park",title:"4 Days Safari in Ruaha National Park",highlights:["Ruaha National Park","Game Drives","Bird Watching","Transfer to Ruaha National Park","Full day Game Drive in Ruaha National Park"],badge:null,objectPosition:"center center",image:"/assets/photos/Ruaha_National_Park_Kudus_32.jpg",alt:"4 Days Safari in Ruaha National Park",duration:"4 Days / 3 Nights",circuit:"Southern Circuit"},{id:"7-days-safari-to-ruaha-udzungwa-and-mikumi-national-parks",title:"7 Days Safari to Ruaha, Udzungwa and Mikumi National Parks",highlights:["Ruaha National Park","Udzungwa Mountains Park","Game Drives","Bird Watching","Dar es Salaam - Ruaha National Park"],badge:null,objectPosition:"center center",image:"/assets/photos/Ruaha_National_Park_Hippos_47.jpg",alt:"7 Days Safari to Ruaha, Udzungwa and Mikumi National Parks",duration:"7 Days / 6 Nights",circuit:"Southern Circuit"},{id:"10-days-safari-to-nyerere-mikumi-udzungwa-ruaha-national-parks",title:"10 Days Safari to Nyerere, Mikumi Udzungwa & Ruaha National Parks",highlights:["Nyerere National Park","Udzungwa Mountains Park","Game Drives","Bird Watching","Dar es Salaam - Nyerere National Park (Selous)"],badge:null,objectPosition:"center center",image:"/assets/photos/Nyerere_National_Park_Elephants_58.jpg",alt:"10 Days Safari to Nyerere, Mikumi Udzungwa & Ruaha National Parks",duration:"10 Days / 9 Nights",circuit:"Southern Circuit"}],T={label:"Popular Destinations",title:"Tanzania's Wild Places",desc:"Serengeti, Ruaha, Mikumi and the parks guests request most – each with journeys ready to tailor."},j={label:"Popular Itineraries",title:"Game Drives, Serengeti & Southern Icons",desc:"Featured routes – Ruaha from Iringa, Mikumi plains, Serengeti migration days and classic crater drives."},Q={signature:"Grounded in Tanzania",quote:"Every road we drive, we know by season",body:"Matembo Safari & Tours is built in Iringa – Ruaha is our backyard, the southern circuit our daily work, and the northern parks our second home. We plan routes around how you travel: your dates, your pace, your reason for coming to Tanzania.",cta:{label:"Our Story",href:"/about.html"},image:"/assets/about/sticky-section.jpg",imageAlt:"African elephant in the Tanzanian savanna"},M={label:"Trust & Credentials",title:"Licensed, Certified, Accountable",desc:"Affiliated with Tanzania's official tourism bodies and conservation authorities."},F=[{id:"zct",abbr:"ZCT",name:"Zanzibar Commission for Tourism",href:"https://www.zct.go.tz",logo:"/assets/credentials/certifications/zct-logo.jpg",logoFit:"default"},{id:"unforgettable",abbr:"Unforgettable Tanzania",name:"Destination Tanzania",href:"https://www.tanzaniatourism.go.tz",logo:"/assets/credentials/certifications/unforgettable-tanzania.svg",logoFit:"wide"},{id:"ttb",abbr:"Tanzania Tourist Board",name:"Tanzania Tourist Board",href:"https://www.tanzaniatourism.com",logo:"/assets/credentials/certifications/ttb.png",logoFit:"default"},{id:"tanapa",abbr:"TANAPA",name:"Tanzania National Parks",href:"https://www.tanzaniaparks.go.tz",logo:"/assets/credentials/certifications/tanapa-mark.png",logoFit:"emblem"},{id:"ncaa",abbr:"NCAA",name:"Ngorongoro Conservation Area",href:"https://www.ncaa.go.tz",logo:"/assets/credentials/certifications/ncaa-mark.png",logoFit:"emblem"},{id:"atb",abbr:"African Tourism Board",name:"African Tourism Board",href:"https://africantourismboard.com",logo:"/assets/credentials/certifications/african-tourism-board.jpg",logoFit:"emblem-crop"},{id:"unwto",abbr:"UN Tourism",name:"UN World Tourism Organization",href:"https://www.unwto.org",logo:"/assets/credentials/certifications/unwto-mark.svg",logoFit:"compact"},{id:"unesco",abbr:"UNESCO",name:"World Heritage Sites",href:"https://whc.unesco.org/en/statesparties/tz",logo:"/assets/credentials/certifications/unesco-mark.png",logoFit:"compact"},{id:"tato",abbr:"TATO",name:"Tanzania Assoc. of Tour Operators",href:"https://www.tato.org",logo:"/assets/credentials/certifications/tato-icon.jpg",logoFit:"compact"},{id:"tripadvisor",abbr:"TripAdvisor",name:"TripAdvisor",href:"https://www.tripadvisor.com/Attraction_Review-g297913-d29014688-Reviews-MATEMBO_SAFARIS_AND_TOURS-Arusha_Arusha_Region.html",logo:"/assets/credentials/tripadvisor.svg",logoFit:"wide"}],Y="https://www.tripadvisor.com/Attraction_Review-g297913-d29014688-Reviews-MATEMBO_SAFARIS_AND_TOURS-Arusha_Arusha_Region.html",$={label:"Guest Voices",title:"What Travellers Say",desc:"Notes from guests who travelled with Matembo – routes tailored, guides who read the bush, and honest communication from Iringa."},G=[{quote:"Our guide read every movement on the plain. Close elephant time near Tarangire and never felt rushed between stops.",author:"Sarah M.",country:"United Kingdom",countryCode:"gb",rating:5,tripType:"Wildlife Safari",date:"Feb 2025"},{quote:"Clear communication before we flew in, solid vehicle, and a crater day that matched what we were promised. Would book again.",author:"James K.",country:"Germany",countryCode:"de",rating:5,tripType:"Ngorongoro Safari",date:"Jan 2025"},{quote:"Matembo adjusted our route when rains shifted the migration. That flexibility made the trip feel personal, not packaged.",author:"Anna L.",country:"Netherlands",countryCode:"nl",rating:5,tripType:"Serengeti Migration",date:"Dec 2024"},{quote:"Ruaha from Iringa felt effortless – long drives broken with thoughtful stops, and a guide who knew where cats were resting.",author:"Marco R.",country:"Italy",countryCode:"it",rating:5,tripType:"Southern Circuit",date:"Nov 2024"},{quote:"Family safari with teenagers – patient pacing, great camp choices, and a walking day we still talk about at dinner.",author:"Emily T.",country:"United States",countryCode:"us",rating:5,tripType:"Family Safari",date:"Oct 2024"},{quote:"Professional from first WhatsApp message to drop-off in Arusha. Honest about seasons and what to expect each park.",author:"Pierre D.",country:"France",countryCode:"fr",rating:5,tripType:"Northern Circuit",date:"Sep 2024"}];function t(a){const e=document.createElement("div");return e.textContent=a,e.innerHTML}function aa(a){return"★".repeat(a)+"☆".repeat(Math.max(0,5-a))}function ta(a){return!a||a.length!==2?"":a.toUpperCase().split("").map(e=>String.fromCodePoint(127397+e.charCodeAt(0))).join("")}function ea(a,e="",i=0){return(a!=null&&a.length?a:[{src:"/assets/about/main3.jpg",alt:"Safari destination"}]).map((o,d)=>{const c=i<3&&d===0,u=c?`src="${t(o.src)}"${i===0?' fetchpriority="high"':""}`:`data-src="${t(o.src)}" src=""`;return`
        <div class="dest-slideshow__slide ${e} ${d===0?"is-active":""}" data-slide>
          <img
            class="${c?"is-loaded":""}"
            ${u}
            alt="${t(o.alt||"")}"
            width="400"
            height="280"
            decoding="async"
            ${c?"":'loading="lazy"'}
          />
        </div>
      `}).join("")}function ia(a){return a<=1?"":Array.from({length:a},(e,i)=>`<button type="button" class="dest-slideshow__dot ${i===0?"is-active":""}" data-slide-dot aria-label="Show image ${i+1}" aria-selected="${i===0?"true":"false"}"></button>`).join("")}function ra(a,e=0){var d,c;const i=(d=a.images)!=null&&d.length?a.images:[{src:"/assets/about/main3.jpg",alt:a.name}],s=((c=a.highlights)==null?void 0:c.slice(0,3))||[],o=`/destinations/${encodeURIComponent(a.id)}.html`;return`
    <article class="dest-teaser-slide autoslider__slide">
      <div class="dest-teaser-slide__media" data-slideshow data-interval="4500">
        <div class="dest-slideshow__track">
          ${ea(i,"dest-slideshow__slide--motion",e)}
        </div>
        <div class="dest-teaser-slide__overlay" aria-hidden="true"></div>
        <span class="dest-teaser-slide__script">${t(a.scriptLabel)}</span>
        ${i.length>1?`<div class="dest-slideshow__dots dest-slideshow__dots--compact dest-teaser-slide__dots">${ia(i.length)}</div>`:""}
      </div>
      <div class="dest-teaser-slide__body">
        <h3 class="dest-teaser-slide__name">${t(a.name)}</h3>
        ${a.journeys?`<p class="dest-teaser-slide__journeys">${t(a.journeys)}</p>`:""}
        ${s.length?`<ul class="dest-teaser-slide__tags">${s.map(u=>`<li>${t(u)}</li>`).join("")}</ul>`:""}
        <a class="dest-teaser-slide__cta" href="${t(o)}">View destination →</a>
      </div>
    </article>
  `}function sa(a){const e=ta(a.countryCode);return`
    <blockquote class="testimonial-card autoslider__slide">
      <div class="testimonial-card__head">
        <span class="testimonial-card__flag" aria-label="${t(a.country)}" title="${t(a.country)}">${e}</span>
        <div class="testimonial-card__stars" aria-label="${a.rating} out of 5">${aa(a.rating)}</div>
      </div>
      <p class="testimonial-card__quote">"${t(a.quote)}"</p>
      <footer class="testimonial-card__footer">
        <cite class="testimonial-card__author">${t(a.author)}</cite>
        <span class="testimonial-card__meta">${t(a.country)} · ${t(a.tripType||"Safari")} · ${t(a.date||"")}</span>
      </footer>
      <img class="testimonial-card__ta" src="/assets/credentials/tripadvisor.svg" alt="" width="88" height="18" loading="lazy" aria-hidden="true" />
    </blockquote>
  `}function da(){const a=document.querySelector("#home-popular-destinations");if(!a)return;const i=X.map((s,o)=>ra(s,o)).join("");a.innerHTML=`
    <section class="home-section home-section--alt" id="destinations" aria-labelledby="destinations-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${t(T.label)}</span>
          <h2 id="destinations-title" class="home-section__title">${t(T.title)}</h2>
          <p class="home-section__desc">${t(T.desc)}</p>
        </header>
        ${A({label:"Popular destinations",autoplay:5e3,visible:"3",trackHtml:i})}
        <div class="home-section__actions section-reveal">
          <a href="/destinations.html" class="btn btn--secondary">All Destinations</a>
          <a href="/circuits.html" class="btn btn--primary">Browse Circuits</a>
        </div>
      </div>
    </section>
  `}function ua(){const a=document.querySelector("#home-popular-itineraries");if(!a)return;const e=J.map((i,s)=>Z(i,s,{inCarousel:!0})).join("");a.innerHTML=`
    <section class="home-section" id="itineraries" aria-labelledby="itineraries-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${t(j.label)}</span>
          <h2 id="itineraries-title" class="home-section__title">${t(j.title)}</h2>
          <p class="home-section__desc">${t(j.desc)}</p>
        </header>
        ${A({label:"Popular itineraries",autoplay:5500,visible:"3",trackHtml:e})}
        <div class="home-section__actions section-reveal">
          <a href="/safaris.html" class="btn btn--secondary">All Safari Packages</a>
          <a href="/contact.html" class="btn btn--primary">Enquire</a>
        </div>
      </div>
    </section>
  `}function ha(){const a=document.querySelector("#home-testimonials");if(!a)return;const e=G.map(sa).join(""),i=G.length>0;a.innerHTML=`
    <section class="home-testimonials" id="testimonials" aria-labelledby="testimonials-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${t($.label)}</span>
          <h2 id="testimonials-title" class="home-section__title">${t($.title)}</h2>
          <p class="home-section__desc">${t($.desc)}</p>
        </header>

        <div class="testimonials-ta-bar section-reveal">
          <img class="testimonials-ta-bar__logo" src="/assets/credentials/tripadvisor.svg" alt="TripAdvisor" width="140" height="32" loading="lazy" />
          <a href="${t(Y)}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary testimonials-ta-bar__link">
            Read all reviews on TripAdvisor
          </a>
        </div>

        ${i?A({label:"Guest testimonials",autoplay:6500,visible:"2",trackHtml:e}):`<div class="testimonials-ta-widget section-reveal">
                <iframe
                  title="Matembo Safaris TripAdvisor reviews"
                  src="https://www.tripadvisor.com/WidgetEmbed-cdspropertydetail?locationId=29014688&partnerId=00000000000000000000&display=true"
                  loading="lazy"
                  class="testimonials-ta-widget__frame"
                ></iframe>
              </div>`}
      </div>
    </section>
  `}function ga(){const a=document.querySelector("#home-credentials");if(!a)return;const e=[...F,...F].map(i=>`
        <a class="cred-marquee__item" href="${t(i.href)}" target="_blank" rel="noopener noreferrer" title="${t(i.name)}">
          <span class="cred-marquee__badge">
            <img class="cred-marquee__logo" src="${t(i.logo)}" alt="${t(i.name)}" width="64" height="64" loading="eager" decoding="async" />
          </span>
          <span class="cred-marquee__name">${t(i.abbr)}</span>
        </a>
      `).join("");a.innerHTML=`
    <section class="home-credentials" id="credentials" aria-labelledby="credentials-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${t(M.label)}</span>
          <h2 id="credentials-title" class="home-section__title">${t(M.title)}</h2>
          <p class="home-section__desc">${t(M.desc)}</p>
        </header>
      </div>
      <div class="cred-marquee section-reveal">
        <div class="cred-marquee__track">${e}</div>
      </div>
    </section>
  `}function pa(){const a=document.querySelector("#home-sticky-quote");if(!a)return;const e=Q;a.innerHTML=`
    <section class="sticky-quote" aria-labelledby="sticky-quote-title">
      <div class="sticky-quote__panel">
        <div class="sticky-quote__media">
          <img data-src="${t(e.image)}" data-img-preset="hero" src="" alt="${t(e.imageAlt)}" width="1920" height="1080" loading="lazy" decoding="async" />
          <div class="sticky-quote__scrim" aria-hidden="true"></div>
        </div>
        <div class="sticky-quote__content">
          <p class="sticky-quote__signature">${t(e.signature)}</p>
          <h2 id="sticky-quote-title" class="sticky-quote__title">${t(e.quote)}</h2>
          <p class="sticky-quote__body">${t(e.body)}</p>
          <a href="${t(e.cta.href)}" class="btn btn--ghost sticky-quote__cta">${t(e.cta.label)}</a>
        </div>
      </div>
    </section>
  `}function ma(){if(document.querySelector("[data-wa-float]"))return;const e=document.createElement("a");e.className="wa-float",e.href="/contact.html",e.target="_blank",e.rel="noopener noreferrer",e.setAttribute("data-wa-float",""),e.setAttribute("aria-label","WhatsApp safari enquiry"),e.innerHTML=`
    <span class="wa-float__tab">
      <span class="wa-float__pulse" aria-hidden="true"></span>
      <span class="wa-float__icon"><i class="fab fa-whatsapp" aria-hidden="true"></i></span>
      <span class="wa-float__copy">
        <span class="wa-float__label">Safari chat</span>
        <span class="wa-float__text">Enquire</span>
      </span>
    </span>
  `,document.body.appendChild(e)}function _a(){const a=document.querySelector("#home-contact");a&&(a.innerHTML=`
    <section class="home-contact" id="contact" aria-labelledby="contact-title">
      <div class="container home-contact__inner section-reveal">
        <span class="home-contact__script">${t(f.signature)}</span>
        <h2 id="contact-title" class="home-contact__title">${t(f.title)}</h2>
        <p class="home-contact__text">${t(f.text)}</p>
        <div class="home-contact__actions">
          <a href="/contact.html" class="btn btn--primary">${t(f.ctaPrimary.label.replace("Email enquiry","Plan your safari"))}</a>
          <a href="${t(f.ctaSecondary.href)}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">${t(f.ctaSecondary.label)}</a>
        </div>
        <p class="home-contact__meta">${t(I.location)} · ${t(I.phone)}</p>
      </div>
    </section>
  `)}export{da as a,ua as b,ha as c,ga as d,pa as e,_a as f,ca as i,ma as r};
