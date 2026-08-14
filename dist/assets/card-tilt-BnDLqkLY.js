function l(){const r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s=window.matchMedia("(pointer: coarse)").matches;r||s||document.querySelectorAll("[data-tilt]").forEach(e=>{let t=null;const o=()=>{t&&cancelAnimationFrame(t),e.style.transform=""},c=i=>{t&&cancelAnimationFrame(t),t=requestAnimationFrame(()=>{const n=e.getBoundingClientRect(),a=(i.clientX-n.left)/n.width-.5,d=(i.clientY-n.top)/n.height-.5;e.style.transform=`
          perspective(800px)
          rotateX(${-d*3.5}deg)
          rotateY(${a*3.5}deg)
          translateY(-5px)
        `})};e.addEventListener("mousemove",c,{passive:!0}),e.addEventListener("mouseleave",o),e.addEventListener("blur",o,!0)})}export{l as initCardTilt};
