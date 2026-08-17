import"./tokens-9OgEy3cj.js";import{e as s}from"./content-utils-YZbAt33H.js";const h=[{src:"/assets/hero/_candidates/pexels-tanzania-elephant.jpg",focus:"center 42%",focusMobile:"center 38%",kenburns:"a"},{src:"/assets/hero/_candidates/unsplash-elephants-tanzania.jpg",focus:"center 45%",focusMobile:"center 40%",kenburns:"b"},{src:"/assets/hero/_candidates/pexels-elephants-road.jpg",focus:"center 48%",focusMobile:"center 42%",kenburns:"c"},{src:"/assets/photos/Ruaha_National_Park_Elephants_49.jpg",focus:"center 44%",focusMobile:"center 38%",kenburns:"a"},{src:"/assets/hero/_candidates/ruaha-wikimedia-33.jpg",focus:"center 40%",focusMobile:"center 36%",kenburns:"b"}],T="https://matembosafaris.com/bcard.html",p="https://www.tripadvisor.com/Attraction_Review-g297913-d29014688-Reviews-MATEMBO_SAFARIS_AND_TOURS-Arusha_Arusha_Region.html",m="https://wa.me/255679529700",S="+255 679 529 700",A=[{label:"TripAdvisor reviews",href:p,icon:"fa-brands fa-tripadvisor",variant:"tripadvisor"},{label:"Facebook",href:"https://www.facebook.com/share/1EZKbSs1Dr/",icon:"fab fa-facebook-f"},{label:"Instagram",href:"https://www.instagram.com/matembosafarisandtours",icon:"fab fa-instagram"},{label:"TikTok",href:"https://www.tiktok.com/@matembosafarisandtours",icon:"fab fa-tiktok"},{label:"WhatsApp",href:m,icon:"fab fa-whatsapp"}],R=[{id:"save",label:"Save Contact",hint:"Works on iPhone & Android",icon:"fas fa-address-card",primary:!0,action:"save-contact"},{id:"safaris",label:"Browse Safari Packages",hint:"Private journeys across Tanzania",icon:"fas fa-compass",href:"/safaris.html"},{id:"whatsapp",label:"WhatsApp Enquiry",hint:"Chat with us instantly",icon:"fab fa-whatsapp",href:m,external:!0,accent:"whatsapp"},{id:"tripadvisor",label:"TripAdvisor Reviews",hint:"See what travellers say",icon:"fa-brands fa-tripadvisor",href:p,external:!0},{id:"contact",label:"Plan Your Safari",hint:"Start your enquiry",icon:"fas fa-calendar-check",href:"/contact.html",accent:"gold"},{id:"website",label:"Open Full Website",hint:"Explore destinations & tours",icon:"fas fa-globe-africa",href:"/"}],g={pageUrl:T,heroImage:h[0].src,heroAlt:"Elephants on the Ruaha savanna, Tanzania",slideshow:h,emblem:"/assets/about/Matembo logo.jpg",name:"Matembo Safari & Tours",scriptLabel:"Guided from Iringa",tagline:"Crafting private wildlife journeys across Tanzania",location:"Gangilonga, Iringa, Tanzania",phone:"+255 679 529 700",phoneTel:"+255679529700",email:"info@matembosafaris.com",website:"https://matembosafaris.com",whatsAppUrl:m,whatsAppNumber:S,tripAdvisorUrl:p,socialLinks:A,actions:R,vcardFilename:"Matembo-Safaris.vcf"};function M(a=g){return`${["BEGIN:VCARD","VERSION:3.0","N:;Matembo Safari & Tours;;;","FN:Matembo Safari & Tours","ORG:Matembo Safari & Tours","TITLE:Tanzania Safari & Tours Operator",`TEL;TYPE=CELL,VOICE:${a.phoneTel}`,`EMAIL;TYPE=INTERNET,WORK:${a.email}`,`URL:${a.website}`,`URL;TYPE=WORK:${a.pageUrl}`,"ADR;TYPE=WORK:;;Gangilonga;Iringa;;Tanzania","NOTE:Northern & Southern circuit safaris. TripAdvisor verified operator.",...a.socialLinks.map(t=>`X-SOCIALPROFILE;TYPE=${t.label.toLowerCase().replace(/\s+/g,"-")}:${t.href}`),"END:VCARD"].join(`\r
`)}\r
`}function C(a){const e=`<span class="bcard-action__icon"><i class="${s(a.icon)}" aria-hidden="true"></i></span>`,t=a.hint?`<span class="bcard-action__hint">${s(a.hint)}</span>`:"",r=`<span class="bcard-action__copy"><span class="bcard-action__label">${s(a.label)}</span>${t}</span>`,n='<span class="bcard-action__chev" aria-hidden="true"><i class="fas fa-chevron-right"></i></span>',u=a.accent?` bcard-action--${a.accent}`:"",l=`bcard-action${a.primary?" bcard-action--primary":""}${u}`;if(a.action==="save-contact")return`
      <button type="button" class="${l}" data-save-contact>
        ${e}${r}${n}
      </button>`;const d=a.external?' target="_blank" rel="noopener noreferrer"':"";return`
    <a class="${l}" href="${s(a.href)}"${d}>
      ${e}${r}${n}
    </a>`}function I(a){return a.map(e=>`
      <a
        class="bcard-social__link${e.variant?` bcard-social__link--${e.variant}`:""}"
        href="${s(e.href)}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="${s(e.label)}"
        title="${s(e.label)}"
      >
        <i class="${s(e.icon)}" aria-hidden="true"></i>
      </a>`).join("")}function P(){const a=document.getElementById("bcard-root");if(!a)return;const e=g;a.innerHTML=`
        <article class="bcard-glass" aria-label="Matembo Safari & Tours connect page">
          <div class="bcard-glass__kanga" aria-hidden="true"></div>
          <div class="bcard-glass__pattern" aria-hidden="true"></div>
          <span class="bcard-glass__corner bcard-glass__corner--tl" aria-hidden="true"></span>
          <span class="bcard-glass__corner bcard-glass__corner--br" aria-hidden="true"></span>

          <header class="bcard-head">
            <a class="bcard-head__logo-link" href="/" aria-label="Matembo Safari home">
              <img
                class="bcard-head__logo"
                src="${s(e.emblem)}"
                alt=""
                width="64"
                height="64"
                decoding="async"
              />
            </a>
            <p class="bcard-head__eyebrow">Digital business card</p>
            <h1 class="bcard-head__title">${s(e.name)}</h1>
            <p class="bcard-head__tagline">${s(e.tagline)}</p>
            <p class="bcard-head__location">
              <i class="fas fa-location-dot" aria-hidden="true"></i>
              ${s(e.location)}
            </p>
          </header>

          <div class="bcard-glass__rule" aria-hidden="true"></div>

          <nav class="bcard-actions" aria-label="Connect actions">
            ${e.actions.map(C).join("")}
          </nav>

          <div class="bcard-bottom">
            <div class="bcard-social" aria-label="Social profiles">
              ${I(e.socialLinks)}
            </div>

            <footer class="bcard-foot">
              <a href="tel:${s(e.phoneTel)}">${s(e.phone)}</a>
              <span class="bcard-foot__dot" aria-hidden="true">·</span>
              <a href="mailto:${s(e.email)}">${s(e.email)}</a>
            </footer>
          </div>
        </article>
  `}const w=11e3,y=6500,O=2;function N(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function k(a){return new Promise(e=>{const t=new Image;t.decoding="async",t.onload=()=>e(!0),t.onerror=()=>e(!1),t.src=a})}function D(a){if(a.querySelector(".bcard-cinema__kenburns"))return;const e=a.querySelector("img");if(!e)return;const t=document.createElement("div");t.className="bcard-cinema__kenburns",e.parentElement.insertBefore(t,e),t.appendChild(e)}function E(a,e){const t=document.createElement("div");t.className=`bcard-cinema__slide${e===0?" is-active":""}`,t.dataset.index=String(e),a.kenburns&&(t.dataset.kenburns=a.kenburns);const r=document.createElement("div");r.className="bcard-cinema__kenburns";const n=document.createElement("img");return n.src=a.src,n.alt="",n.width=1920,n.height=1080,n.style.setProperty("--bcard-focus",a.focus||"center center"),n.style.setProperty("--bcard-focus-mobile",a.focusMobile||a.focus||"center center"),e===0?(n.fetchPriority="high",n.decoding="sync"):(n.loading="lazy",n.decoding="async"),r.appendChild(n),t.appendChild(r),t}function L(a,e){for(let t=1;t<=O;t+=1){const r=a[(e+t)%a.length];r!=null&&r.src&&k(r.src)}}function b(a){a&&a.classList.add("bcard-cinema--ready")}function U(a,e){const t=a.querySelector(".bcard-cinema__slide");if(!t)return!1;const r=t.querySelector("img");return r?(r.src=e.src,r.style.setProperty("--bcard-focus",e.focus||"center center"),r.style.setProperty("--bcard-focus-mobile",e.focusMobile||e.focus||"center center"),e.kenburns&&(t.dataset.kenburns=e.kenburns),D(t),!0):!1}function j(a=document.getElementById("bcard-slideshow")){const e=h,t=a==null?void 0:a.closest(".bcard-cinema");if(!a||!e.length)return null;U(a,e[0])?e.slice(1).forEach((c,o)=>{a.appendChild(E(c,o+1))}):(a.replaceChildren(),e.forEach((c,o)=>{a.appendChild(E(c,o))}));const n=a.querySelector(".bcard-cinema__slide.is-active img");if(n!=null&&n.complete&&n.naturalWidth>0?b(t):n?(n.addEventListener("load",()=>b(t),{once:!0}),n.addEventListener("error",()=>b(t),{once:!0})):b(t),L(e,0),e.slice(1).forEach(c=>k(c.src)),e.length<2||N())return null;const u=[...a.querySelectorAll(".bcard-cinema__slide")];let l=0,d=null;const _=()=>{const c=u[l];c.classList.remove("is-active"),c.classList.add("is-fading-out"),l=(l+1)%u.length;const o=u[l],i=o.querySelector(".bcard-cinema__kenburns");i&&(i.style.animation="none",i.style.transform="scale(1) translate3d(0, 0, 0)",i.offsetHeight,i.style.animation="",i.style.transform=""),requestAnimationFrame(()=>{o.classList.add("is-active")}),window.setTimeout(()=>{c.classList.remove("is-fading-out")},y+120),L(e,l)};a&&a.style.setProperty("--bcard-fade-duration",`${y}ms`),d=window.setInterval(_,w);const f=window.matchMedia("(prefers-reduced-motion: reduce)"),v=c=>{c.matches?(window.clearInterval(d),d=null,u.forEach((o,i)=>{o.classList.toggle("is-active",i===0)})):d||(l=0,u.forEach((o,i)=>{o.classList.toggle("is-active",i===0)}),d=window.setInterval(_,w))};return typeof f.addEventListener=="function"&&f.addEventListener("change",v),()=>{d&&window.clearInterval(d),typeof f.removeEventListener=="function"&&f.removeEventListener("change",v)}}function B(){const a=new Blob([M()],{type:"text/vcard;charset=utf-8"}),e=URL.createObjectURL(a),t=document.createElement("a");t.href=e,t.download=g.vcardFilename,document.body.appendChild(t),t.click(),t.remove(),URL.revokeObjectURL(e)}function F(){document.querySelectorAll("[data-save-contact]").forEach(a=>{a.addEventListener("click",B)})}function $(){try{document.documentElement.classList.add("bcard-body"),document.body.classList.add("bcard-body"),P(),F(),j()}catch(a){console.error("Business card page init failed:",a)}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",$):$();
