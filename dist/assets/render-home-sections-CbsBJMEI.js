import{r as D}from"./render-cards-5dEEQBsT.js";import{c as O,n as W,d as m,b as E}from"./render-home-XFWJLOTR.js";import{safariPackages as B}from"./safari-packages-Bwk-a-Z1.js";function F(e){const a=e.dataset.visible;return a?Number(a):window.matchMedia("(min-width: 1200px)").matches?3:window.matchMedia("(min-width: 768px)").matches?2:1}function ae(e=document){const a=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.querySelectorAll("[data-autoslider]").forEach(s=>{const r=s.querySelector("[data-autoslider-track]"),i=s.querySelector("[data-autoslider-dots]"),u=s.querySelector("[data-autoslider-count]"),p=s.querySelector("[data-autoslider-prev]"),h=s.querySelector("[data-autoslider-next]"),_=r?[...r.children]:[];if(!_.length)return;let o=0,b=1,c=0,g=null,T=!1;const H=Number(s.dataset.autoplay||5e3),M=()=>{b=F(s),c=Math.max(0,_.length-b),o>c&&(o=0),r.style.setProperty("--autoslider-visible",String(b))},N=()=>{var l;const d=parseFloat(getComputedStyle(r).gap)||16,n=((l=_[0])==null?void 0:l.getBoundingClientRect().width)||0;return o*(n+d)},z=()=>{if(!i)return;const d=c+1;i.innerHTML=Array.from({length:d},(n,l)=>`
        <button
          type="button"
          class="autoslider__dot ${l===o?"is-active":""}"
          data-autoslider-dot="${l}"
          role="tab"
          aria-selected="${l===o?"true":"false"}"
          aria-label="Go to slide ${l+1}"
        ></button>
      `).join(""),i.querySelectorAll("[data-autoslider-dot]").forEach(n=>{n.addEventListener("click",()=>{v(Number(n.dataset.autosliderDot)),w()})})},P=()=>{if(!u)return;const d=o+1,n=Math.min(o+b,_.length);u.textContent=`${d}–${n} of ${_.length}`},v=d=>{o=(d%(c+1)+(c+1))%(c+1),r.style.transform=`translate3d(-${N()}px, 0, 0)`,i==null||i.querySelectorAll("[data-autoslider-dot]").forEach((n,l)=>{const R=l===o;n.classList.toggle("is-active",R),n.setAttribute("aria-selected",R?"true":"false")}),P()},C=()=>{M(),z(),T&&requestAnimationFrame(()=>v(o))},L=()=>v(o+1),j=()=>v(o-1),f=()=>{g&&(clearInterval(g),g=null)},y=()=>{a||c<=0||(f(),g=setInterval(L,H))},w=()=>{f(),y()};p==null||p.addEventListener("click",()=>{j(),w()}),h==null||h.addEventListener("click",()=>{L(),w()}),s.addEventListener("mouseenter",f),s.addEventListener("mouseleave",y),s.addEventListener("focusin",f),s.addEventListener("focusout",y),window.addEventListener("resize",C,{passive:!0}),"ResizeObserver"in window&&new ResizeObserver(()=>C()).observe(r),M(),z(),requestAnimationFrame(()=>{v(0),T=!0,setTimeout(y,600)})})}function S(e={}){const{id:a="",label:s="Carousel",autoplay:r=5e3,visible:i="",showArrows:u=!0,showCount:p=!0,trackHtml:h=""}=e;return`
    <div
      class="autoslider"
      data-autoslider
      data-autoplay="${r}"
      ${i?`data-visible="${i}"`:""}
      ${a?`id="${a}"`:""}
    >
      ${u?`
        <div class="autoslider__controls">
          <button type="button" class="autoslider__arrow autoslider__arrow--prev" data-autoslider-prev aria-label="Previous">
            <span aria-hidden="true">‹</span>
          </button>
          <button type="button" class="autoslider__arrow autoslider__arrow--next" data-autoslider-next aria-label="Next">
            <span aria-hidden="true">›</span>
          </button>
        </div>
      `:""}
      <div class="autoslider__viewport" tabindex="0" aria-roledescription="carousel" aria-label="${s}">
        <div class="autoslider__track" data-autoslider-track>${h}</div>
      </div>
      <div class="autoslider__footer">
        <div class="autoslider__dots" data-autoslider-dots role="tablist" aria-label="Carousel pages"></div>
        ${p?'<p class="autoslider__count" data-autoslider-count aria-live="polite"></p>':""}
      </div>
    </div>
  `}const $={label:"Popular Destinations",title:"Tanzania's Wild Places",desc:"Serengeti, Ruaha, Mikumi and the parks guests request most – each with journeys ready to tailor."},G=["serengeti","ngorongoro","ruaha","mikumi","tarangire","kilimanjaro","zanzibar","nyerere","manyara","udzungwa","katavi","arusha","mafia","pemba"],k={label:"Popular Itineraries",title:"Game Drives, Serengeti & Southern Icons",desc:"Featured routes – Ruaha from Iringa, Mikumi plains, Serengeti migration days and classic crater drives."},U=["3-days-to-serengeti-national-park-and-ngorongoro-crater","5-days-serengeti-and-ngorongoro-crater-safari","day-trip-to-ngorongoro-crater","2-days-to-tarangire-national-park-ngorongoro-crater","2-days-safari-to-ruaha-national-park","3-days-safari-to-ruaha-national-park","5-days-safari-to-mikumi-ruaha-national-parks","4-days-safari-in-ruaha-national-park","7-days-safari-to-ruaha-udzungwa-and-mikumi-national-parks","10-days-safari-to-nyerere-mikumi-udzungwa-ruaha-national-parks"],V={signature:"Grounded in Tanzania",quote:"Every road we drive, we know by season",body:"Matembo Safari & Tours is built in Iringa – Ruaha is our backyard, the southern circuit our daily work, and the northern parks our second home. We plan routes around how you travel: your dates, your pace, your reason for coming to Tanzania.",cta:{label:"Our Story",href:"/about.html"},image:"/assets/about/main 11.jpg",imageAlt:"Wildlife safari landscape in Tanzania"},A={label:"Trust & Credentials",title:"Licensed, Certified, Accountable",desc:"Matembo operates within Tanzania's regulated tourism framework – licensed guides, registered vehicles and park access."},I=[{id:"ttb",abbr:"TTB",name:"Tanzania Tourist Board",desc:"National tourism standards",href:"https://www.tanzaniatourism.com",logo:"/assets/credentials/ttb.svg"},{id:"tato",abbr:"TATO",name:"Tanzania Assoc. of Tour Operators",desc:"Registered operator member",href:"https://www.tato.org",logo:"/assets/credentials/tato.svg"},{id:"tanapa",abbr:"TANAPA",name:"Tanzania National Parks",desc:"Licensed park access",href:"https://www.tanzaniaparks.go.tz",logo:"/assets/credentials/tanapa.svg"},{id:"ncaa",abbr:"NCAA",name:"Ngorongoro Conservation Area",desc:"Crater authority",href:"https://www.ncaa.go.tz",logo:"/assets/credentials/ncaa.svg"},{id:"unesco",abbr:"UNESCO",name:"World Heritage Sites",desc:"Serengeti · Ngorongoro · Kilimanjaro",href:"https://whc.unesco.org/en/statesparties/tz",logo:"/assets/credentials/unesco.svg"},{id:"mnrt",abbr:"MNRT",name:"Ministry of Natural Resources",desc:"Wildlife regulation",href:"https://www.mnrt.go.tz",logo:"/assets/credentials/mnrt.svg"},{id:"tripadvisor",abbr:"TA",name:"TripAdvisor",desc:"Verified guest reviews",href:"https://www.tripadvisor.com/Attraction_Review-g297913-d29014688-Reviews-MATEMBO_SAFARIS_AND_TOURS-Arusha_Arusha_Region.html",logo:"/assets/credentials/tripadvisor.svg"}],Q="https://www.tripadvisor.com/Attraction_Review-g297913-d29014688-Reviews-MATEMBO_SAFARIS_AND_TOURS-Arusha_Arusha_Region.html",q={label:"Guest Voices",title:"What Travellers Say",desc:"Live reviews from guests on our verified TripAdvisor listing."},x=[];function t(e){const a=document.createElement("div");return a.textContent=e,a.innerHTML}function K(e){return"★".repeat(e)+"☆".repeat(Math.max(0,5-e))}function J(e){return e.map(a=>O.find(s=>s.id===a)||W.find(s=>s.id===a)).filter(Boolean)}function X(e){var r,i;const a=(r=e.images)==null?void 0:r[0],s=((i=e.highlights)==null?void 0:i.slice(0,3))||[];return`
    <article class="dest-teaser-slide autoslider__slide">
      <a class="dest-teaser-slide__link" href="/destinations/${encodeURIComponent(e.id)}.html">
        <div class="dest-teaser-slide__media">
          <img src="${t((a==null?void 0:a.src)||"/assets/about/main3.jpg")}" alt="${t((a==null?void 0:a.alt)||e.name)}" loading="lazy" width="400" height="280" />
          <div class="dest-teaser-slide__overlay" aria-hidden="true"></div>
          <span class="dest-teaser-slide__script">${t(e.scriptLabel)}</span>
        </div>
        <div class="dest-teaser-slide__body">
          <h3 class="dest-teaser-slide__name">${t(e.name)}</h3>
          ${e.journeys?`<p class="dest-teaser-slide__journeys">${t(e.journeys)}</p>`:""}
          ${s.length?`<ul class="dest-teaser-slide__tags">${s.map(u=>`<li>${t(u)}</li>`).join("")}</ul>`:""}
          <span class="dest-teaser-slide__cta">View destination →</span>
        </div>
      </a>
    </article>
  `}function Y(e){return`
    <blockquote class="testimonial-slide autoslider__slide">
      <div class="testimonial-slide__head">
        <img class="testimonial-slide__ta-logo" src="/assets/credentials/tripadvisor.svg" alt="TripAdvisor" width="120" height="28" loading="lazy" />
        <div class="testimonial-slide__stars" aria-label="${e.rating} out of 5">${K(e.rating)}</div>
      </div>
      <p class="testimonial-slide__quote">${t(e.quote)}</p>
      <footer class="testimonial-slide__footer">
        <cite class="testimonial-slide__author">${t(e.author)}</cite>
        <span class="testimonial-slide__meta">${t(e.location)} · ${t(e.tripType||"Safari")} · ${t(e.date||"")}</span>
      </footer>
    </blockquote>
  `}function se(){const e=document.querySelector("#home-popular-destinations");if(!e)return;const s=J(G).map(X).join("");e.innerHTML=`
    <section class="home-section home-section--alt" id="destinations" aria-labelledby="destinations-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${t($.label)}</span>
          <h2 id="destinations-title" class="home-section__title">${t($.title)}</h2>
          <p class="home-section__desc">${t($.desc)}</p>
        </header>
        ${S({label:"Popular destinations",autoplay:5e3,visible:"3",trackHtml:s})}
        <div class="home-section__actions section-reveal">
          <a href="/destinations.html" class="btn btn--secondary">All Destinations</a>
          <a href="/circuits.html" class="btn btn--primary">Browse Circuits</a>
        </div>
      </div>
    </section>
  `}function ie(){const e=document.querySelector("#home-popular-itineraries");if(!e)return;const s=U.map(r=>B.find(i=>i.id===r)).filter(Boolean).map((r,i)=>D(r,i,{inCarousel:!0})).join("");e.innerHTML=`
    <section class="home-section" id="itineraries" aria-labelledby="itineraries-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${t(k.label)}</span>
          <h2 id="itineraries-title" class="home-section__title">${t(k.title)}</h2>
          <p class="home-section__desc">${t(k.desc)}</p>
        </header>
        ${S({label:"Popular itineraries",autoplay:5500,visible:"3",trackHtml:s})}
        <div class="home-section__actions section-reveal">
          <a href="/safaris.html" class="btn btn--secondary">All Safari Packages</a>
          <a href="/contact.html" class="btn btn--primary">Enquire</a>
        </div>
      </div>
    </section>
  `}function re(){const e=document.querySelector("#home-testimonials");if(!e)return;const a=x.map(Y).join(""),s=x.length>0;e.innerHTML=`
    <section class="home-testimonials" id="testimonials" aria-labelledby="testimonials-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${t(q.label)}</span>
          <h2 id="testimonials-title" class="home-section__title">${t(q.title)}</h2>
          <p class="home-section__desc">${t(q.desc)}</p>
        </header>

        <div class="testimonials-ta-bar section-reveal">
          <img class="testimonials-ta-bar__logo" src="/assets/credentials/tripadvisor.svg" alt="TripAdvisor" width="140" height="32" loading="lazy" />
          <a href="${t(Q)}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary testimonials-ta-bar__link">
            Read all reviews on TripAdvisor
          </a>
        </div>

        ${s?S({label:"Guest testimonials",autoplay:6500,visible:"2",trackHtml:a}):`<div class="testimonials-ta-widget section-reveal">
                <iframe
                  title="Matembo Safaris TripAdvisor reviews"
                  src="https://www.tripadvisor.com/WidgetEmbed-cdspropertydetail?locationId=29014688&partnerId=00000000000000000000&display=true"
                  loading="lazy"
                  class="testimonials-ta-widget__frame"
                ></iframe>
              </div>`}
      </div>
    </section>
  `}function oe(){const e=document.querySelector("#home-credentials");if(!e)return;const a=[...I,...I].map(s=>`
        <a class="cred-marquee__item" href="${t(s.href)}" target="_blank" rel="noopener noreferrer" title="${t(s.name)}">
          <img class="cred-marquee__logo" src="${t(s.logo)}" alt="${t(s.name)}" width="120" height="48" loading="lazy" />
          <span class="cred-marquee__name">${t(s.name)}</span>
        </a>
      `).join("");e.innerHTML=`
    <section class="home-credentials" id="credentials" aria-labelledby="credentials-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${t(A.label)}</span>
          <h2 id="credentials-title" class="home-section__title">${t(A.title)}</h2>
          <p class="home-section__desc">${t(A.desc)}</p>
        </header>
      </div>
      <div class="cred-marquee section-reveal" aria-hidden="true">
        <div class="cred-marquee__track">${a}</div>
      </div>
    </section>
  `}function ne(){const e=document.querySelector("#home-sticky-quote");if(!e)return;const a=V;e.innerHTML=`
    <section class="sticky-quote" aria-labelledby="sticky-quote-title">
      <div class="sticky-quote__sticky">
        <div class="sticky-quote__media">
          <img src="${t(a.image)}" alt="${t(a.imageAlt)}" width="1920" height="1080" loading="lazy" />
          <div class="sticky-quote__scrim" aria-hidden="true"></div>
        </div>
        <div class="sticky-quote__content">
          <p class="sticky-quote__signature">${t(a.signature)}</p>
          <h2 id="sticky-quote-title" class="sticky-quote__title">${t(a.quote)}</h2>
          <p class="sticky-quote__body">${t(a.body)}</p>
          <a href="${t(a.cta.href)}" class="btn btn--hero-cream sticky-quote__cta">${t(a.cta.label)}</a>
        </div>
      </div>
      <div class="sticky-quote__spacer" aria-hidden="true"></div>
    </section>
  `}function le(){if(document.querySelector("[data-wa-float]"))return;const a=document.createElement("a");a.className="wa-float",a.href="https://wa.me/255679529700",a.target="_blank",a.rel="noopener noreferrer",a.setAttribute("data-wa-float",""),a.setAttribute("aria-label","WhatsApp safari enquiry"),a.innerHTML=`
    <span class="wa-float__tab">
      <span class="wa-float__icon"><i class="fab fa-whatsapp" aria-hidden="true"></i></span>
      <span class="wa-float__text">Enquire</span>
    </span>
  `,document.body.appendChild(a)}function ce(){const e=document.querySelector("#home-contact");e&&(e.innerHTML=`
    <section class="home-contact" id="contact" aria-labelledby="contact-title">
      <div class="container home-contact__inner section-reveal">
        <span class="home-contact__script">${t(m.signature)}</span>
        <h2 id="contact-title" class="home-contact__title">${t(m.title)}</h2>
        <p class="home-contact__text">${t(m.text)}</p>
        <div class="home-contact__actions">
          <a href="/contact.html" class="btn btn--primary">${t(m.ctaPrimary.label.replace("Email enquiry","Plan your safari"))}</a>
          <a href="${t(m.ctaSecondary.href)}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">${t(m.ctaSecondary.label)}</a>
        </div>
        <p class="home-contact__meta">${t(E.location)} · ${t(E.phone)}</p>
      </div>
    </section>
  `)}export{se as a,ie as b,re as c,oe as d,ne as e,ce as f,ae as i,le as r};
