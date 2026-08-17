import"./tokens-9OgEy3cj.js";import{e as s}from"./content-utils-YZbAt33H.js";const o="https://matembosafaris.com/bcard.html",i="https://www.tripadvisor.com/Attraction_Review-g297913-d29014688-Reviews-MATEMBO_SAFARIS_AND_TOURS-Arusha_Arusha_Region.html",n="https://wa.me/255679529700",d="+255 679 529 700",l=[{label:"TripAdvisor reviews",href:i,icon:"fab fa-tripadvisor",variant:"tripadvisor"},{label:"Facebook",href:"https://www.facebook.com/share/1EZKbSs1Dr/",icon:"fab fa-facebook-f"},{label:"Instagram",href:"https://www.instagram.com/matembosafarisandtours",icon:"fab fa-instagram"},{label:"TikTok",href:"https://www.tiktok.com/@matembosafarisandtours",icon:"fab fa-tiktok"},{label:"WhatsApp",href:n,icon:"fab fa-whatsapp"}],r={pageUrl:o,heroImage:"/assets/hero/ruaha-elephants-hero.jpg",heroAlt:"Elephants on the Ruaha savanna, Tanzania",emblem:"/assets/about/Matembo logo.jpg",name:"Matembo Safari & Tours",scriptLabel:"Guided from Iringa",tagline:"Safari & Tours",headline:"Tanzania safari people who know the road",location:"Gangilonga, Iringa, Tanzania",phone:"+255 679 529 700",phoneTel:"+255679529700",email:"info@matembosafaris.com",website:"https://matembosafaris.com",whatsAppUrl:n,whatsAppNumber:d,tripAdvisorUrl:i,socialLinks:l,vcardFilename:"Matembo-Safaris.vcf"};function b(e=r){return`${["BEGIN:VCARD","VERSION:3.0","N:;Matembo Safari & Tours;;;","FN:Matembo Safari & Tours","ORG:Matembo Safari & Tours","TITLE:Tanzania Safari & Tours Operator",`TEL;TYPE=CELL,VOICE:${e.phoneTel}`,`EMAIL;TYPE=INTERNET,WORK:${e.email}`,`URL:${e.website}`,`URL;TYPE=WORK:${e.pageUrl}`,"ADR;TYPE=WORK:;;Gangilonga;Iringa;;Tanzania","NOTE:Northern & Southern circuit safaris. TripAdvisor verified operator.",...e.socialLinks.map(c=>`X-SOCIALPROFILE;TYPE=${c.label.toLowerCase().replace(/\s+/g,"-")}:${c.href}`),"END:VCARD"].join(`\r
`)}\r
`}function p(e){return e.map(a=>`
      <a
        class="bcard-social__link${a.variant?` bcard-social__link--${a.variant}`:""}"
        href="${s(a.href)}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="${s(a.label)}"
        title="${s(a.label)}"
      >
        <i class="${s(a.icon)}" aria-hidden="true"></i>
      </a>`).join("")}function _(){const e=document.getElementById("bcard-root");if(!e)return;const a=r;e.innerHTML=`
    <div class="bcard-page">
      <div class="bcard-page__bg" aria-hidden="true">
        <img
          class="bcard-page__bg-img"
          src="${s(a.heroImage)}"
          alt=""
          width="1920"
          height="1080"
          decoding="async"
          fetchpriority="high"
        />
        <div class="bcard-page__bg-shade"></div>
        <div class="bcard-page__bg-glow"></div>
      </div>

      <header class="bcard-top">
        <a class="bcard-top__brand" href="/">
          <img class="bcard-top__emblem" src="${s(a.emblem)}" alt="" width="36" height="36" decoding="async" />
          <span class="bcard-top__name">Matembo</span>
        </a>
        <a class="bcard-top__site" href="/">
          <span>Visit website</span>
          <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
        </a>
      </header>

      <div class="bcard-shell">
        <article class="bcard-card" aria-label="Matembo Safari & Tours digital business card">
          <div class="bcard-card__frame">
            <div class="bcard-card__shine" aria-hidden="true"></div>

            <div class="bcard-card__hero">
              <img
                class="bcard-card__logo"
                src="${s(a.emblem)}"
                alt="${s(a.name)} logo"
                width="88"
                height="88"
                decoding="async"
              />
              <p class="bcard-card__script">${s(a.scriptLabel)}</p>
              <h1 class="bcard-card__title">${s(a.name)}</h1>
              <p class="bcard-card__tagline">${s(a.tagline)}</p>
              <p class="bcard-card__headline">${s(a.headline)}</p>
            </div>

            <div class="bcard-card__divider" aria-hidden="true"></div>

            <ul class="bcard-contacts">
              <li>
                <a class="bcard-contacts__item" href="tel:${s(a.phoneTel)}">
                  <span class="bcard-contacts__icon"><i class="fas fa-phone" aria-hidden="true"></i></span>
                  <span class="bcard-contacts__body">
                    <span class="bcard-contacts__label">Phone / WhatsApp</span>
                    <span class="bcard-contacts__value">${s(a.phone)}</span>
                  </span>
                </a>
              </li>
              <li>
                <a class="bcard-contacts__item" href="mailto:${s(a.email)}">
                  <span class="bcard-contacts__icon"><i class="fas fa-envelope" aria-hidden="true"></i></span>
                  <span class="bcard-contacts__body">
                    <span class="bcard-contacts__label">Email</span>
                    <span class="bcard-contacts__value">${s(a.email)}</span>
                  </span>
                </a>
              </li>
              <li>
                <span class="bcard-contacts__item bcard-contacts__item--static">
                  <span class="bcard-contacts__icon"><i class="fas fa-location-dot" aria-hidden="true"></i></span>
                  <span class="bcard-contacts__body">
                    <span class="bcard-contacts__label">Based in</span>
                    <span class="bcard-contacts__value">${s(a.location)}</span>
                  </span>
                </span>
              </li>
              <li>
                <a class="bcard-contacts__item" href="${s(a.website)}" target="_blank" rel="noopener noreferrer">
                  <span class="bcard-contacts__icon"><i class="fas fa-globe-africa" aria-hidden="true"></i></span>
                  <span class="bcard-contacts__body">
                    <span class="bcard-contacts__label">Website</span>
                    <span class="bcard-contacts__value">matembosafaris.com</span>
                  </span>
                </a>
              </li>
            </ul>

            <div class="bcard-quick">
              <a class="bcard-quick__btn bcard-quick__btn--call" href="tel:${s(a.phoneTel)}">
                <i class="fas fa-phone" aria-hidden="true"></i>
                Call
              </a>
              <a class="bcard-quick__btn bcard-quick__btn--wa" href="${s(a.whatsAppUrl)}" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-whatsapp" aria-hidden="true"></i>
                WhatsApp
              </a>
              <a class="bcard-quick__btn bcard-quick__btn--mail" href="mailto:${s(a.email)}">
                <i class="fas fa-envelope" aria-hidden="true"></i>
                Email
              </a>
            </div>

            <div class="bcard-social">
              <p class="bcard-social__label">Connect with Matembo</p>
              <div class="bcard-social__grid">
                ${p(a.socialLinks)}
              </div>
            </div>

            <div class="bcard-save">
              <p class="bcard-save__label">Save contact</p>
              <div class="bcard-save__actions">
                <button type="button" class="bcard-save__btn" data-save-contact="iphone">
                  <i class="fab fa-apple" aria-hidden="true"></i>
                  Save to iPhone
                </button>
                <button type="button" class="bcard-save__btn" data-save-contact="android">
                  <i class="fab fa-android" aria-hidden="true"></i>
                  Save to Android
                </button>
              </div>
              <a class="bcard-save__file" href="/matembo-safaris.vcf" download="${s(a.vcardFilename)}">
                <i class="fas fa-address-card" aria-hidden="true"></i>
                Download .vcf file
              </a>
            </div>

            <div class="bcard-qr">
              <div class="bcard-qr__frame">
                <img
                  class="bcard-qr__image"
                  src="/assets/bcard/qr.png"
                  alt="QR code — scan to open Matembo Safari digital business card"
                  width="220"
                  height="220"
                  decoding="async"
                />
              </div>
              <div class="bcard-qr__copy">
                <p class="bcard-qr__title">Scan Matembo card</p>
                <p class="bcard-qr__text">Point your camera at this code on a printed card or screen to open this digital contact.</p>
                <p class="bcard-qr__url">${s(a.pageUrl.replace("https://",""))}</p>
              </div>
            </div>
          </div>
        </article>
      </div>

      <footer class="bcard-foot">
        <p>Northern &amp; Southern circuit safaris · Private 4×4 fleet · TripAdvisor verified</p>
      </footer>
    </div>
  `}function h(){const e=new Blob([b()],{type:"text/vcard;charset=utf-8"}),a=URL.createObjectURL(e),c=document.createElement("a");c.href=a,c.download=r.vcardFilename,document.body.appendChild(c),c.click(),c.remove(),URL.revokeObjectURL(a)}function f(){document.querySelectorAll("[data-save-contact]").forEach(e=>{e.addEventListener("click",h)})}function t(){try{_(),f()}catch(e){console.error("Business card page init failed:",e)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t();
