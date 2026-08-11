import{_ as G}from"./preload-helper-DsQV4sYi.js";import{l as J}from"./scroll-reveal-B17FauD6.js";import{a as K}from"./render-cards-lSM9ICI4.js";import{c as Q,n as Y,d as g,b as j}from"./render-home-miLWeeLX.js";function H(e,t,a){for(let o=t;o<Math.min(t+a,e.length);o++)J(e[o],{priority:o===t})}function Z(e){const t=Number(e.dataset.visible)||3;return window.matchMedia("(min-width: 1200px)").matches?t:window.matchMedia("(min-width: 768px)").matches?Math.min(2,t):1}function _e(e=document){const t=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.querySelectorAll("[data-autoslider]").forEach(a=>{const o=a.querySelector("[data-autoslider-track]"),r=a.querySelector("[data-autoslider-dots]"),l=a.querySelector("[data-autoslider-count]"),u=a.querySelector("[data-autoslider-prev]"),p=a.querySelector("[data-autoslider-next]"),h=o?[...o.children]:[];if(!h.length)return;let c=0,_=1,m=0,$=null,z=!1,T=!1,y=null,f=null;const W=Number(a.dataset.autoplay||5e3),B=42,E=()=>{_=Z(a),m=Math.max(0,h.length-_),c>m&&(c=0),o.style.setProperty("--autoslider-visible",String(_))},U=()=>{var d;const i=parseFloat(getComputedStyle(o).gap)||16,n=((d=h[0])==null?void 0:d.getBoundingClientRect().width)||0;return c*(n+i)},R=()=>{if(!r)return;const i=m+1;r.innerHTML=Array.from({length:i},(n,d)=>`
        <button
          type="button"
          class="autoslider__dot ${d===c?"is-active":""}"
          data-autoslider-dot="${d}"
          role="tab"
          aria-selected="${d===c?"true":"false"}"
          aria-label="Go to slide ${d+1}"
        ></button>
      `).join(""),r.querySelectorAll("[data-autoslider-dot]").forEach(n=>{n.addEventListener("click",()=>{b(Number(n.dataset.autosliderDot)),S()})})},V=()=>{if(!l)return;const i=c+1,n=Math.min(c+_,h.length);l.textContent=`${i}–${n} of ${h.length}`},b=i=>{c=(i%(m+1)+(m+1))%(m+1),T=!0,a.classList.add("is-advancing"),o.style.transform=`translate3d(-${U()}px, 0, 0)`,r==null||r.querySelectorAll("[data-autoslider-dot]").forEach((n,d)=>{const N=d===c;n.classList.toggle("is-active",N),n.setAttribute("aria-selected",N?"true":"false")}),V(),H(h,c,_),window.setTimeout(()=>{T=!1,a.classList.remove("is-advancing")},320)},X=()=>{E(),R(),z&&requestAnimationFrame(()=>b(c))};let x=null,k=0;const P=()=>{k+=1,window.__perfAutosliderLayouts=(window.__perfAutosliderLayouts||0)+1,clearTimeout(x),x=window.setTimeout(()=>{X(),(k===1||k%10===0)&&fetch("http://127.0.0.1:7315/ingest/1b98e4f6-7f8e-4c21-a775-a6108c5ffb25",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"260cb5"},body:JSON.stringify({sessionId:"260cb5",location:"autoslider.js:scheduleLayout",message:"autoslider layout",data:{layoutCount:k,slideCount:h.length,sliderId:a.id||"anon"},hypothesisId:"D",timestamp:Date.now()})}).catch(()=>{})},120)},A=()=>b(c+1),D=()=>b(c-1),v=()=>{$&&(clearInterval($),$=null)},w=()=>{t||m<=0||(v(),$=setInterval(A,W))},S=()=>{v(),w()};u==null||u.addEventListener("click",()=>{D(),S()}),p==null||p.addEventListener("click",()=>{A(),S()}),a.addEventListener("mouseenter",v),a.addEventListener("mouseleave",w),a.addEventListener("focusin",v),a.addEventListener("focusout",i=>{a.contains(i.relatedTarget)||w()}),a.addEventListener("pointerdown",i=>{y={x:i.clientX,y:i.clientY},(i.pointerType==="touch"||i.pointerType==="pen")&&(f=i.clientX,v())},{passive:!0}),a.addEventListener("pointermove",i=>{f!=null&&i.clientX-f},{passive:!0}),a.addEventListener("pointerup",i=>{if(f==null)return;const n=i.clientX-f;f=null,Math.abs(n)>=B?(n<0?A():D(),S()):w()},{passive:!0}),a.addEventListener("click",i=>{if(T){i.preventDefault(),i.stopPropagation();return}if(y){const n=Math.abs(i.clientX-y.x)>8||Math.abs(i.clientY-y.y)>8;y=null,n&&(i.preventDefault(),i.stopPropagation())}},!0),window.addEventListener("resize",P,{passive:!0}),"ResizeObserver"in window&&new ResizeObserver(P).observe(o),E(),R(),requestAnimationFrame(()=>{b(0),H(h,0,_),z=!0,setTimeout(w,600)})})}function I(e={}){const{id:t="",label:a="Carousel",autoplay:o=5e3,visible:r="",showArrows:l=!0,showCount:u=!0,trackHtml:p=""}=e;return`
    <div
      class="autoslider"
      data-autoslider
      data-autoplay="${o}"
      ${r?`data-visible="${r}"`:""}
      ${t?`id="${t}"`:""}
    >
      ${l?`
        <div class="autoslider__controls">
          <button type="button" class="autoslider__arrow autoslider__arrow--prev" data-autoslider-prev aria-label="Previous">
            <span aria-hidden="true">‹</span>
          </button>
          <button type="button" class="autoslider__arrow autoslider__arrow--next" data-autoslider-next aria-label="Next">
            <span aria-hidden="true">›</span>
          </button>
        </div>
      `:""}
      <div class="autoslider__viewport" tabindex="0" aria-roledescription="carousel" aria-label="${a}">
        <div class="autoslider__track" data-autoslider-track>${p}</div>
      </div>
      <div class="autoslider__footer">
        <div class="autoslider__dots" data-autoslider-dots role="tablist" aria-label="Carousel pages"></div>
        ${u?'<p class="autoslider__count" data-autoslider-count aria-live="polite"></p>':""}
      </div>
    </div>
  `}const q={label:"Popular Destinations",title:"Tanzania's Wild Places",desc:"Serengeti, Ruaha, Mikumi and the parks guests request most – each with journeys ready to tailor."},ee=["serengeti","ngorongoro","ruaha","mikumi","tarangire","kilimanjaro","zanzibar","nyerere","manyara","udzungwa","katavi","arusha","mafia","pemba"],C={label:"Popular Itineraries",title:"Game Drives, Serengeti & Southern Icons",desc:"Featured routes – Ruaha from Iringa, Mikumi plains, Serengeti migration days and classic crater drives."},te=["3-days-to-serengeti-national-park-and-ngorongoro-crater","5-days-serengeti-and-ngorongoro-crater-safari","day-trip-to-ngorongoro-crater","2-days-to-tarangire-national-park-ngorongoro-crater","2-days-safari-to-ruaha-national-park","3-days-safari-to-ruaha-national-park","5-days-safari-to-mikumi-ruaha-national-parks","4-days-safari-in-ruaha-national-park","7-days-safari-to-ruaha-udzungwa-and-mikumi-national-parks","10-days-safari-to-nyerere-mikumi-udzungwa-ruaha-national-parks"],ae={signature:"Grounded in Tanzania",quote:"Every road we drive, we know by season",body:"Matembo Safari & Tours is built in Iringa – Ruaha is our backyard, the southern circuit our daily work, and the northern parks our second home. We plan routes around how you travel: your dates, your pace, your reason for coming to Tanzania.",cta:{label:"Our Story",href:"/about.html"},image:"/assets/about/sticky-section.jpg",imageAlt:"African elephant in the Tanzanian savanna"},M={label:"Trust & Credentials",title:"Licensed, Certified, Accountable",desc:"Matembo operates within Tanzania's regulated tourism framework – licensed guides, registered vehicles and park access."},O=[{id:"ttb",abbr:"TTB",name:"Tanzania Tourist Board",desc:"National tourism standards",href:"https://www.tanzaniatourism.com",logo:"/assets/credentials/ttb.svg"},{id:"tato",abbr:"TATO",name:"Tanzania Assoc. of Tour Operators",desc:"Registered operator member",href:"https://www.tato.org",logo:"/assets/credentials/tato.svg"},{id:"tanapa",abbr:"TANAPA",name:"Tanzania National Parks",desc:"Licensed park access",href:"https://www.tanzaniaparks.go.tz",logo:"/assets/credentials/tanapa.svg"},{id:"ncaa",abbr:"NCAA",name:"Ngorongoro Conservation Area",desc:"Crater authority",href:"https://www.ncaa.go.tz",logo:"/assets/credentials/ncaa.svg"},{id:"unesco",abbr:"UNESCO",name:"World Heritage Sites",desc:"Serengeti · Ngorongoro · Kilimanjaro",href:"https://whc.unesco.org/en/statesparties/tz",logo:"/assets/credentials/unesco.svg"},{id:"mnrt",abbr:"MNRT",name:"Ministry of Natural Resources",desc:"Wildlife regulation",href:"https://www.mnrt.go.tz",logo:"/assets/credentials/mnrt.svg"},{id:"tripadvisor",abbr:"TA",name:"TripAdvisor",desc:"Verified guest reviews",href:"https://www.tripadvisor.com/Attraction_Review-g297913-d29014688-Reviews-MATEMBO_SAFARIS_AND_TOURS-Arusha_Arusha_Region.html",logo:"/assets/credentials/tripadvisor.svg"}],se="https://www.tripadvisor.com/Attraction_Review-g297913-d29014688-Reviews-MATEMBO_SAFARIS_AND_TOURS-Arusha_Arusha_Region.html",L={label:"Guest Voices",title:"What Travellers Say",desc:"Notes from guests who travelled with Matembo – routes tailored, guides who read the bush, and honest communication from Iringa."},F=[{quote:"Our guide read every movement on the plain. Close elephant time near Tarangire and never felt rushed between stops.",author:"Sarah M.",country:"United Kingdom",countryCode:"gb",rating:5,tripType:"Wildlife Safari",date:"Feb 2025"},{quote:"Clear communication before we flew in, solid vehicle, and a crater day that matched what we were promised. Would book again.",author:"James K.",country:"Germany",countryCode:"de",rating:5,tripType:"Ngorongoro Safari",date:"Jan 2025"},{quote:"Matembo adjusted our route when rains shifted the migration. That flexibility made the trip feel personal, not packaged.",author:"Anna L.",country:"Netherlands",countryCode:"nl",rating:5,tripType:"Serengeti Migration",date:"Dec 2024"},{quote:"Ruaha from Iringa felt effortless – long drives broken with thoughtful stops, and a guide who knew where cats were resting.",author:"Marco R.",country:"Italy",countryCode:"it",rating:5,tripType:"Southern Circuit",date:"Nov 2024"},{quote:"Family safari with teenagers – patient pacing, great camp choices, and a walking day we still talk about at dinner.",author:"Emily T.",country:"United States",countryCode:"us",rating:5,tripType:"Family Safari",date:"Oct 2024"},{quote:"Professional from first WhatsApp message to drop-off in Arusha. Honest about seasons and what to expect each park.",author:"Pierre D.",country:"France",countryCode:"fr",rating:5,tripType:"Northern Circuit",date:"Sep 2024"}];function s(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function ie(e){return"★".repeat(e)+"☆".repeat(Math.max(0,5-e))}function re(e){return e.map(t=>Q.find(a=>a.id===t)||Y.find(a=>a.id===t)).filter(Boolean)}function oe(e){return!e||e.length!==2?"":e.toUpperCase().split("").map(t=>String.fromCodePoint(127397+t.charCodeAt(0))).join("")}function ne(e,t="",a=0){return(e!=null&&e.length?e:[{src:"/assets/about/main3.jpg",alt:"Safari destination"}]).map((r,l)=>`
        <div class="dest-slideshow__slide ${t} ${l===0?"is-active":""}" data-slide>
          <img
            data-src="${s(r.src)}"
            data-img-preset="card"
            src=""
            alt="${s(r.alt||"")}"
            width="400"
            height="280"
            loading="lazy"
            decoding="async"
          />
        </div>
      `).join("")}function le(e){return e<=1?"":Array.from({length:e},(t,a)=>`<button type="button" class="dest-slideshow__dot ${a===0?"is-active":""}" data-slide-dot aria-label="Show image ${a+1}" aria-selected="${a===0?"true":"false"}"></button>`).join("")}function ce(e,t=0){var l,u;const a=(l=e.images)!=null&&l.length?e.images:[{src:"/assets/about/main3.jpg",alt:e.name}],o=((u=e.highlights)==null?void 0:u.slice(0,3))||[],r=`/destinations/${encodeURIComponent(e.id)}.html`;return`
    <article class="dest-teaser-slide autoslider__slide">
      <div class="dest-teaser-slide__media" data-slideshow data-interval="4500">
        <div class="dest-slideshow__track">
          ${ne(a,"dest-slideshow__slide--motion",t)}
        </div>
        <div class="dest-teaser-slide__overlay" aria-hidden="true"></div>
        <span class="dest-teaser-slide__script">${s(e.scriptLabel)}</span>
        ${a.length>1?`<div class="dest-slideshow__dots dest-slideshow__dots--compact dest-teaser-slide__dots">${le(a.length)}</div>`:""}
      </div>
      <div class="dest-teaser-slide__body">
        <h3 class="dest-teaser-slide__name">${s(e.name)}</h3>
        ${e.journeys?`<p class="dest-teaser-slide__journeys">${s(e.journeys)}</p>`:""}
        ${o.length?`<ul class="dest-teaser-slide__tags">${o.map(p=>`<li>${s(p)}</li>`).join("")}</ul>`:""}
        <a class="dest-teaser-slide__cta" href="${s(r)}">View destination →</a>
      </div>
    </article>
  `}function de(e){const t=oe(e.countryCode);return`
    <blockquote class="testimonial-card autoslider__slide">
      <div class="testimonial-card__head">
        <span class="testimonial-card__flag" aria-label="${s(e.country)}" title="${s(e.country)}">${t}</span>
        <div class="testimonial-card__stars" aria-label="${e.rating} out of 5">${ie(e.rating)}</div>
      </div>
      <p class="testimonial-card__quote">"${s(e.quote)}"</p>
      <footer class="testimonial-card__footer">
        <cite class="testimonial-card__author">${s(e.author)}</cite>
        <span class="testimonial-card__meta">${s(e.country)} · ${s(e.tripType||"Safari")} · ${s(e.date||"")}</span>
      </footer>
      <img class="testimonial-card__ta" src="/assets/credentials/tripadvisor.svg" alt="" width="88" height="18" loading="lazy" aria-hidden="true" />
    </blockquote>
  `}function fe(){const e=document.querySelector("#home-popular-destinations");if(!e)return;const a=re(ee).map((o,r)=>ce(o,r)).join("");e.innerHTML=`
    <section class="home-section home-section--alt" id="destinations" aria-labelledby="destinations-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${s(q.label)}</span>
          <h2 id="destinations-title" class="home-section__title">${s(q.title)}</h2>
          <p class="home-section__desc">${s(q.desc)}</p>
        </header>
        ${I({label:"Popular destinations",autoplay:5e3,visible:"3",trackHtml:a})}
        <div class="home-section__actions section-reveal">
          <a href="/destinations.html" class="btn btn--secondary">All Destinations</a>
          <a href="/circuits.html" class="btn btn--primary">Browse Circuits</a>
        </div>
      </div>
    </section>
  `}async function ge(){const e=document.querySelector("#home-popular-itineraries");if(!e)return;const{safariPackages:t}=await G(async()=>{const{safariPackages:r}=await import("./safari-packages-Bwk-a-Z1.js");return{safariPackages:r}},[]),o=te.map(r=>t.find(l=>l.id===r)).filter(Boolean).map((r,l)=>K(r,l,{inCarousel:!0})).join("");e.innerHTML=`
    <section class="home-section" id="itineraries" aria-labelledby="itineraries-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${s(C.label)}</span>
          <h2 id="itineraries-title" class="home-section__title">${s(C.title)}</h2>
          <p class="home-section__desc">${s(C.desc)}</p>
        </header>
        ${I({label:"Popular itineraries",autoplay:5500,visible:"3",trackHtml:o})}
        <div class="home-section__actions section-reveal">
          <a href="/safaris.html" class="btn btn--secondary">All Safari Packages</a>
          <a href="/contact.html" class="btn btn--primary">Enquire</a>
        </div>
      </div>
    </section>
  `}function ye(){const e=document.querySelector("#home-testimonials");if(!e)return;const t=F.map(de).join(""),a=F.length>0;e.innerHTML=`
    <section class="home-testimonials" id="testimonials" aria-labelledby="testimonials-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${s(L.label)}</span>
          <h2 id="testimonials-title" class="home-section__title">${s(L.title)}</h2>
          <p class="home-section__desc">${s(L.desc)}</p>
        </header>

        <div class="testimonials-ta-bar section-reveal">
          <img class="testimonials-ta-bar__logo" src="/assets/credentials/tripadvisor.svg" alt="TripAdvisor" width="140" height="32" loading="lazy" />
          <a href="${s(se)}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary testimonials-ta-bar__link">
            Read all reviews on TripAdvisor
          </a>
        </div>

        ${a?I({label:"Guest testimonials",autoplay:6500,visible:"2",trackHtml:t}):`<div class="testimonials-ta-widget section-reveal">
                <iframe
                  title="Matembo Safaris TripAdvisor reviews"
                  src="https://www.tripadvisor.com/WidgetEmbed-cdspropertydetail?locationId=29014688&partnerId=00000000000000000000&display=true"
                  loading="lazy"
                  class="testimonials-ta-widget__frame"
                ></iframe>
              </div>`}
      </div>
    </section>
  `}function be(){const e=document.querySelector("#home-credentials");if(!e)return;const t=[...O,...O].map(a=>`
        <a class="cred-marquee__item" href="${s(a.href)}" target="_blank" rel="noopener noreferrer" title="${s(a.name)}">
          <img class="cred-marquee__logo" src="${s(a.logo)}" alt="${s(a.name)}" width="120" height="48" loading="lazy" />
          <span class="cred-marquee__name">${s(a.name)}</span>
        </a>
      `).join("");e.innerHTML=`
    <section class="home-credentials" id="credentials" aria-labelledby="credentials-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${s(M.label)}</span>
          <h2 id="credentials-title" class="home-section__title">${s(M.title)}</h2>
          <p class="home-section__desc">${s(M.desc)}</p>
        </header>
      </div>
      <div class="cred-marquee section-reveal" aria-hidden="true">
        <div class="cred-marquee__track">${t}</div>
      </div>
    </section>
  `}function ve(){const e=document.querySelector("#home-sticky-quote");if(!e)return;const t=ae;e.innerHTML=`
    <section class="sticky-quote" aria-labelledby="sticky-quote-title">
      <div class="sticky-quote__panel">
        <div class="sticky-quote__media">
          <img data-src="${s(t.image)}" data-img-preset="hero" src="" alt="${s(t.imageAlt)}" width="1920" height="1080" loading="lazy" decoding="async" />
          <div class="sticky-quote__scrim" aria-hidden="true"></div>
        </div>
        <div class="sticky-quote__content">
          <p class="sticky-quote__signature">${s(t.signature)}</p>
          <h2 id="sticky-quote-title" class="sticky-quote__title">${s(t.quote)}</h2>
          <p class="sticky-quote__body">${s(t.body)}</p>
          <a href="${s(t.cta.href)}" class="btn btn--ghost sticky-quote__cta">${s(t.cta.label)}</a>
        </div>
      </div>
    </section>
  `}function we(){if(document.querySelector("[data-wa-float]"))return;const t=document.createElement("a");t.className="wa-float",t.href="/contact.html",t.target="_blank",t.rel="noopener noreferrer",t.setAttribute("data-wa-float",""),t.setAttribute("aria-label","WhatsApp safari enquiry"),t.innerHTML=`
    <span class="wa-float__tab">
      <span class="wa-float__pulse" aria-hidden="true"></span>
      <span class="wa-float__icon"><i class="fab fa-whatsapp" aria-hidden="true"></i></span>
      <span class="wa-float__copy">
        <span class="wa-float__label">Safari chat</span>
        <span class="wa-float__text">Enquire</span>
      </span>
    </span>
  `,document.body.appendChild(t)}function $e(){const e=document.querySelector("#home-contact");e&&(e.innerHTML=`
    <section class="home-contact" id="contact" aria-labelledby="contact-title">
      <div class="container home-contact__inner section-reveal">
        <span class="home-contact__script">${s(g.signature)}</span>
        <h2 id="contact-title" class="home-contact__title">${s(g.title)}</h2>
        <p class="home-contact__text">${s(g.text)}</p>
        <div class="home-contact__actions">
          <a href="/contact.html" class="btn btn--primary">${s(g.ctaPrimary.label.replace("Email enquiry","Plan your safari"))}</a>
          <a href="${s(g.ctaSecondary.href)}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">${s(g.ctaSecondary.label)}</a>
        </div>
        <p class="home-contact__meta">${s(j.location)} · ${s(j.phone)}</p>
      </div>
    </section>
  `)}export{fe as a,ge as b,ye as c,be as d,ve as e,$e as f,_e as i,we as r};
