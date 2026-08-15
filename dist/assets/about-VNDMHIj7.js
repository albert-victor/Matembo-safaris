import"./buttons-r323SqNs.js";import{e as o,f as e,s as h,r as g,a as f,i as _}from"./render-home-V4yjOGkn.js";/* empty css             *//* empty css                       */import{renderWhatsAppFloat as p}from"./render-home-sections-Dc8KTcBX.js";import{i as v}from"./scroll-reveal-6DLuizO8.js";import"./paths-BeSZcpY7.js";import"./destinations-data-D-DgQGhw.js";import"./autoslider-CLGcF2WU.js";import"./card-motion-CgCTZbYj.js";import"./render-cards-Dtef6nii.js";const y=["003c5e51-b6e7-4f9c-ae6f-86c78febe640","0c5353d6-d895-44ef-b140-7e32b050d827","2d111bf3-7626-49ad-a7bc-e05fe3223485","3dbfe127-834f-418e-9187-ea65f9ae89ac","47371c2b-c109-4b7e-9f47-e92ab7d119b7","513c5ad1-6cd4-4377-b83b-a885baaaa6d6","6259d38a-5ad0-41cb-a1cb-e44b244bc63c","710d9d18-1fc9-4ac7-b808-4817d4728b7c","855b437f-4576-4d5b-b185-864c7c8aa101","941777d5-8bf3-4ede-bc16-43e4df0f1e46","a11d367e-8208-49d0-a5f0-4fb198ef63e7","b7242c53-cf7e-4eca-b91c-0483fed99cc8","69cc52ba-11cc-43a3-8f55-e33aa92025fa","78bb030f-3792-48be-900d-8d001cfce5d4","fe2887bc-6096-4984-98c9-09dc63991d84"].filter(Boolean);function l(s,r){return{src:`/assets/about/${s}.jpg`,alt:r}}const $={hero:{signature:"Matembo Safari & Tours",title:"People who know the road",lead:"A Tanzanian operator built on field knowledge – from Gangilonga, Iringa, across every circuit you can name.",image:"/assets/about/about hero.jpg"},story:{label:"Our Story",title:"Safari people, not brochure promises",paragraphs:["Matembo Safari & Tours was founded by George and a team of guides who live the seasons – not just the brochure. Based in Gangilonga, Iringa, we are minutes from Ruaha National Park and at the heart of Tanzania's southern circuit.","We plan wildlife routes across the north and south, match lodges to your budget without cutting corners on guides or vehicles, and stay on call from your first WhatsApp to your last flight home.","Whether you want a week on the Serengeti plains, a crater day from Arusha, or a southern loop through Mikumi and Ruaha, the itinerary is drawn around how you travel – not a fixed template pulled from a shelf."],stats:[{value:"Northern & Southern",label:"Circuits covered"},{value:"Private 4×4",label:"Safari fleet"},{value:"Ruaha · Iringa",label:"Home ground"}],image:"/assets/about/main 11.jpg"},moments:{label:"Moments",title:"In the field with Matembo",desc:"Sunrise drives, river bends, crater rims and the quiet hours between sightings.",images:[l("003c5e51-b6e7-4f9c-ae6f-86c78febe640","Safari moment in Tanzania"),l("47371c2b-c109-4b7e-9f47-e92ab7d119b7","Wildlife on the plains"),l("6259d38a-5ad0-41cb-a1cb-e44b244bc63c","Game drive at dawn"),l("855b437f-4576-4d5b-b185-864c7c8aa101","Elephants in the bush"),l("941777d5-8bf3-4ede-bc16-43e4df0f1e46","Safari landscape Tanzania"),l("a11d367e-8208-49d0-a5f0-4fb198ef63e7","Guide and guests on safari")]},gallery:{label:"Gallery",title:"Through our lens",desc:"Scenes from routes we run every week – Ruaha, Serengeti, coast and highlands.",images:[{src:"/assets/about/main.jpg",alt:"Tanzania safari"},{src:"/assets/about/main 1.jpg",alt:"Wildlife safari Tanzania"},{src:"/assets/about/main 5.jpg",alt:"Highland landscape"},{src:"/assets/about/main 7.jpg",alt:"Plains wildlife"},{src:"/assets/about/main 8.jpg",alt:"Coast and islands"},{src:"/assets/about/ngorongoro.jpg",alt:"Ngorongoro Crater"},{src:"/assets/about/cultural visits.jpg",alt:"Cultural experience"},{src:"/assets/about/binoculars.jpg",alt:"Game viewing"},...y.slice(0,8).map((s,r)=>l(s,`Safari gallery ${r+1}`))]},team:{label:"Reach Us",title:"George & the Matembo team",text:"Call, email or WhatsApp – we reply with route ideas tailored to your dates, not templates. Based in Iringa, operating across Tanzania.",contact:{phone:"+255 679 529 700",email:"info@matembosafaris.com",location:"Gangilonga, Iringa, Tanzania"}}};function w(){const s=document.querySelector("#about-hero"),r=document.querySelector("#about-story"),n=document.querySelector("#about-moments"),c=document.querySelector("#about-gallery"),d=document.querySelector("#about-team"),b=document.querySelector("#about-social"),a=$;if(s){const t=Array.from({length:5},(i,u)=>`<span class="about-hero__particle" style="--i:${u}"></span>`).join("");s.innerHTML=`
      <section class="about-hero">
        <div class="about-hero__media">
          <div class="about-hero__media-motion">
            <img
              src="${o(a.hero.image)}"
              alt="${o(a.hero.title)}"
              width="1920"
              height="1080"
              loading="eager"
              decoding="async"
              fetchpriority="high"
            />
          </div>
        </div>
        <div class="about-hero__overlay" aria-hidden="true">
          <div class="about-hero__overlay-tint"></div>
          <div class="about-hero__overlay-vignette"></div>
          <div class="about-hero__overlay-scrim"></div>
          <div class="about-hero__overlay-glow"></div>
        </div>
        <div class="about-hero__film" aria-hidden="true">
          <div class="about-hero__film-gradient"></div>
          <div class="about-hero__particles">${t}</div>
        </div>
        <div class="container about-hero__content">
          <p class="about-hero__signature">${e(a.hero.signature)}</p>
          <h1 class="about-hero__title">${e(a.hero.title)}</h1>
          <p class="about-hero__lead">${e(a.hero.lead)}</p>
        </div>
      </section>
    `}r&&(r.innerHTML=`
      <section class="about-story home-section" aria-labelledby="about-story-title">
        <div class="container about-story__grid">
          <div class="about-story__media section-reveal">
            <img src="${o(a.story.image)}" alt="Matembo Safari team in Tanzania" loading="lazy" width="520" height="600" />
          </div>
          <div class="about-story__content section-reveal">
            <span class="home-section__label">${e(a.story.label)}</span>
            <h2 id="about-story-title" class="home-section__title">${e(a.story.title)}</h2>
            ${a.story.paragraphs.map(t=>`<p class="about-story__text">${e(t)}</p>`).join("")}
            <dl class="home-about__stats">
              ${a.story.stats.map(t=>`
                <div class="home-about__stat">
                  <dt>${e(t.label)}</dt>
                  <dd>${e(t.value)}</dd>
                </div>
              `).join("")}
            </dl>
          </div>
        </div>
      </section>
    `),n&&(n.innerHTML=`
      <section class="about-moments home-section home-section--alt" aria-labelledby="about-moments-title">
        <div class="container">
          <header class="home-section__header section-reveal">
            <span class="home-section__label">${e(a.moments.label)}</span>
            <h2 id="about-moments-title" class="home-section__title">${e(a.moments.title)}</h2>
            <p class="home-section__desc">${e(a.moments.desc)}</p>
          </header>
          <div class="about-moments__grid">
            ${a.moments.images.map((t,i)=>`
              <figure class="about-moments__item" data-reveal ${i%3?`data-reveal-delay="${i%3}"`:""}>
                <img src="${o(t.src)}" alt="${e(t.alt)}" loading="lazy" width="400" height="300" />
              </figure>
            `).join("")}
          </div>
        </div>
      </section>
    `),c&&(c.innerHTML=`
      <section class="about-gallery home-section" id="about-gallery" aria-labelledby="about-gallery-title">
        <div class="container">
          <header class="home-section__header section-reveal">
            <span class="home-section__label">${e(a.gallery.label)}</span>
            <h2 id="about-gallery-title" class="home-section__title">${e(a.gallery.title)}</h2>
            <p class="home-section__desc">${e(a.gallery.desc)}</p>
          </header>
          <div class="about-gallery__grid">
            ${a.gallery.images.map((t,i)=>`
              <figure class="about-gallery__item${i%5===0?" about-gallery__item--wide":""}" data-reveal ${i%4?`data-reveal-delay="${i%4}"`:""}>
                <img src="${o(t.src)}" alt="${e(t.alt)}" loading="lazy" width="360" height="280" />
              </figure>
            `).join("")}
          </div>
        </div>
      </section>
    `),d&&(d.innerHTML=`
      <section class="about-team home-section home-section--alt" aria-labelledby="about-team-title">
        <div class="container about-team__inner section-reveal">
          <span class="home-section__label">${e(a.team.label)}</span>
          <h2 id="about-team-title" class="home-section__title">${e(a.team.title)}</h2>
          <p class="about-team__text">${e(a.team.text)}</p>
          <dl class="about-team__contact">
            <div><dt>Location</dt><dd>${e(a.team.contact.location)}</dd></div>
            <div><dt>Phone</dt><dd><a href="tel:+255679529700">${e(a.team.contact.phone)}</a></dd></div>
            <div><dt>Email</dt><dd><a href="mailto:${o(a.team.contact.email)}">${e(a.team.contact.email)}</a></dd></div>
          </dl>
          <a href="/contact.html" class="btn btn--primary">Plan your safari</a>
        </div>
      </section>
    `),b&&(b.innerHTML=`
      <section class="about-social" aria-label="Follow Matembo">
        <div class="container about-social__inner section-reveal">
          <span class="about-social__label">Follow Matembo</span>
          <div class="about-social__links">
            ${h.map(t=>`
              <a href="${o(t.href)}" target="_blank" rel="noopener noreferrer" class="about-social__link" aria-label="${o(t.label)}">
                <i class="${o(t.icon)}" aria-hidden="true"></i>
              </a>
            `).join("")}
          </div>
        </div>
      </section>
    `)}function m(){try{g(),w(),f(),p(),_()}catch(s){console.error("About page init failed:",s)}finally{v()}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",m):m();
