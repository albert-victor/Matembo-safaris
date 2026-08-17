function v(){const c=window.matchMedia("(prefers-reduced-motion: reduce)").matches,a=window.matchMedia("(hover: hover) and (pointer: fine)").matches;c||!a||document.querySelectorAll("[data-tilt]").forEach(e=>{let t=null,n=!1;const d=()=>{t&&cancelAnimationFrame(t),e.style.transform=""},r=s=>{t&&cancelAnimationFrame(t),t=requestAnimationFrame(()=>{const o=e.getBoundingClientRect(),u=(s.clientX-o.left)/o.width-.5,m=(s.clientY-o.top)/o.height-.5;e.style.transform=`
          perspective(800px)
          rotateX(${-m*3.5}deg)
          rotateY(${u*3.5}deg)
          translateY(-5px)
        `})},l=()=>{n||(n=!0,e.addEventListener("mousemove",r,{passive:!0}))},i=()=>{n&&(n=!1,e.removeEventListener("mousemove",r),d())};e.addEventListener("mouseenter",l),e.addEventListener("mouseleave",i),e.addEventListener("blur",i,!0)})}export{v as initCardTilt};
