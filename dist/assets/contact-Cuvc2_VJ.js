import"./buttons-r323SqNs.js";import{b as c,r as v,a as $,i as S}from"./render-home-DLbeZLdX.js";/* empty css                       */import{renderWhatsAppFloat as w}from"./render-home-sections-CXstbUu9.js";import{i as q}from"./scroll-reveal-BPEmY50i.js";import"./paths-BeSZcpY7.js";import"./autoslider-CMYqkZqS.js";import"./render-cards-DZfqk6t0.js";function n(a){const e=document.createElement("div");return e.textContent=a,e.innerHTML}function s(a,e){return`
    <span class="contact-form__control">
      <span class="contact-form__icon" aria-hidden="true"><i class="${a}"></i></span>
      ${e}
    </span>
  `}const C=["Northern Circuit safari","Southern Circuit safari","Ruaha National Park","Serengeti & migration","Ngorongoro Crater","Kilimanjaro climb","Zanzibar & coast","Walking safari","Day trip","Custom route"],A=["Solo","Couple","3–4 guests","5–8 guests","9+ guests"];function D(){const a=document.querySelector("#contact-page-root");a&&(a.innerHTML=`
    <section class="contact-hero">
      <div class="container contact-hero__inner section-reveal">
        <span class="home-section__label">Plan Your Safari</span>
        <h1 class="contact-hero__title">Tell us your dates – we'll draw the route</h1>
        <p class="contact-hero__lead">Share when you travel, how many you are, and what you want to see. George and the Matembo team reply with a tailored outline, not a template.</p>
      </div>
    </section>

    <section class="contact-main home-section">
      <div class="container contact-main__grid">
        <form class="contact-form section-reveal" id="safari-enquiry-form" novalidate>
          <header class="contact-form__head">
            <span class="contact-form__eyebrow">Safari enquiry</span>
            <p class="contact-form__intro">Complete the form below and we will reply with route ideas matched to your dates.</p>
          </header>

          <fieldset class="contact-form__section">
            <legend class="contact-form__legend">
              <span class="contact-form__legend-icon" aria-hidden="true"><i class="fas fa-route"></i></span>
              Your trip
            </legend>

            <div class="contact-form__row contact-form__row--dates">
              <label class="contact-form__field">
                <span class="contact-form__label">Arrival date</span>
                ${s("fas fa-plane-arrival",'<input type="date" name="arrival" required class="contact-form__input contact-form__input--date" aria-label="Arrival date" />')}
              </label>
              <label class="contact-form__field">
                <span class="contact-form__label">Departure date</span>
                ${s("fas fa-plane-departure",'<input type="date" name="departure" required class="contact-form__input contact-form__input--date" aria-label="Departure date" />')}
              </label>
            </div>

            <label class="contact-form__field">
              <span class="contact-form__label">Safari type</span>
              ${s("fas fa-compass",`<select name="safariType" required class="contact-form__input contact-form__input--select">
                  <option value="" disabled selected>Choose your route focus</option>
                  ${C.map(e=>`<option value="${n(e)}">${n(e)}</option>`).join("")}
                </select>`)}
            </label>

            <label class="contact-form__field">
              <span class="contact-form__label">Group size</span>
              ${s("fas fa-users",`<select name="groupSize" required class="contact-form__input contact-form__input--select">
                  <option value="" disabled selected>How many travellers?</option>
                  ${A.map(e=>`<option value="${n(e)}">${n(e)}</option>`).join("")}
                </select>`)}
            </label>
          </fieldset>

          <fieldset class="contact-form__section">
            <legend class="contact-form__legend">
              <span class="contact-form__legend-icon" aria-hidden="true"><i class="fas fa-user"></i></span>
              Your details
            </legend>

            <div class="contact-form__row">
              <label class="contact-form__field">
                <span class="contact-form__label">Full name</span>
                ${s("fas fa-signature",'<input type="text" name="name" required autocomplete="name" class="contact-form__input" placeholder="First and last name" />')}
              </label>
              <label class="contact-form__field">
                <span class="contact-form__label">Email</span>
                ${s("fas fa-envelope",'<input type="email" name="email" required autocomplete="email" class="contact-form__input" placeholder="name@example.com" />')}
              </label>
            </div>

            <label class="contact-form__field">
              <span class="contact-form__label">Phone / WhatsApp</span>
              ${s("fab fa-whatsapp",'<input type="tel" name="phone" autocomplete="tel" class="contact-form__input" placeholder="+255 679 529 700 or your number" />')}
            </label>

            <label class="contact-form__field">
              <span class="contact-form__label">Message</span>
              ${s("fas fa-pen-to-square",'<textarea name="message" rows="5" class="contact-form__input contact-form__textarea" placeholder="Which parks, lodges, or experiences do you have in mind? Budget range, special occasions, or must-see wildlife."></textarea>')}
            </label>
          </fieldset>

          <button type="submit" class="btn btn--primary contact-form__submit">
            <i class="fas fa-paper-plane" aria-hidden="true"></i>
            Send enquiry
          </button>
          <p class="contact-form__note">
            <i class="fas fa-clock" aria-hidden="true"></i>
            We reply within 24 hours. Prices are quoted directly, not listed on this site.
          </p>
        </form>

        <aside class="contact-aside section-reveal" data-reveal-delay="1">
          <div class="contact-aside__card">
            <h2 class="contact-aside__title">
              <i class="fas fa-headset" aria-hidden="true"></i>
              Reach Matembo directly
            </h2>
            <ul class="contact-aside__list">
              <li>
                <span class="contact-aside__icon"><i class="fas fa-location-dot" aria-hidden="true"></i></span>
                <span>${n(c.location)}</span>
              </li>
              <li>
                <span class="contact-aside__icon"><i class="fas fa-phone" aria-hidden="true"></i></span>
                <a href="tel:+255679529700">${n(c.phone)}</a>
              </li>
              <li>
                <span class="contact-aside__icon"><i class="fas fa-envelope" aria-hidden="true"></i></span>
                <a href="mailto:${n(c.email)}">${n(c.email)}</a>
              </li>
              <li>
                <span class="contact-aside__icon"><i class="fab fa-whatsapp" aria-hidden="true"></i></span>
                <a href="https://wa.me/255679529700" target="_blank" rel="noopener noreferrer">WhatsApp enquiry</a>
              </li>
            </ul>
          </div>

          <div class="contact-aside__card contact-aside__card--alt">
            <h3 class="contact-aside__subtitle">
              <i class="fas fa-list-check" aria-hidden="true"></i>
              What happens next
            </h3>
            <ol class="contact-aside__steps">
              <li><i class="fas fa-calendar-day" aria-hidden="true"></i> We read your dates and group size</li>
              <li><i class="fas fa-map" aria-hidden="true"></i> Route outline with park order and lodge options</li>
              <li><i class="fas fa-comments" aria-hidden="true"></i> WhatsApp or email to refine details</li>
              <li><i class="fas fa-check-circle" aria-hidden="true"></i> Confirmed itinerary before you fly</li>
            </ol>
          </div>
        </aside>
      </div>
    </section>
  `)}function W(){const a=document.querySelector("#safari-enquiry-form");if(!a)return;const e=new Date().toISOString().split("T")[0],t=a.querySelector('[name="arrival"]'),i=a.querySelector('[name="departure"]');t==null||t.setAttribute("min",e),i==null||i.setAttribute("min",e),t==null||t.addEventListener("change",()=>{t.value&&(i==null||i.setAttribute("min",t.value))}),a.addEventListener("submit",p=>{p.preventDefault();const o=new FormData(a),f=o.get("arrival"),m=o.get("departure"),u=o.get("name"),_=o.get("email"),h=o.get("phone")||"Not provided",r=o.get("safariType"),l=o.get("groupSize"),b=o.get("message")||"",y=encodeURIComponent(`Safari enquiry – ${r} (${l})`),g=encodeURIComponent(`Name: ${u}
Email: ${_}
Phone: ${h}

Dates: ${f} to ${m}
Safari type: ${r}
Group: ${l}

Message:
${b}`);window.location.href=`mailto:${c.email}?subject=${y}&body=${g}`})}function d(){try{v(),D(),$(),w(),W(),S()}catch(a){console.error("Contact page init failed:",a)}finally{q()}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",d):d();
