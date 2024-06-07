window.addEventListener("load", () => {
  const images = document.querySelectorAll(".image");
  const videos = document.querySelectorAll(".ig-reels video");

  images.forEach((x) => {
    ImageHover(x);
  });
  setTimeout(() => {
    removeAuto();
  }, 5000);
  videos.forEach((video) => {
    video.addEventListener("mouseenter", function () {
      video.play();
    });

    video.addEventListener("mouseleave", function () {
      video.pause();
    });
  });

  function removeAuto() {
    videos.forEach((x) => {
      x.pause();
    });
  }
  // function addAuto() {
  //   videos.forEach((x) => {
  //     x.remove;
  //   });
  // }
});

function createHoverTimeline(
  innerElems,
  property,
  duration,
  ease,
  stagger,
  initialScale
) {
  let animationProperties = {
    duration: duration,
    ease: ease,
    stagger: stagger,
  };

  animationProperties[property] = (i) => +!i;

  let firstInnerElementProperties = {};
  firstInnerElementProperties[property] = initialScale;

  return gsap
    .timeline({ paused: true })
    .set(innerElems[0], firstInnerElementProperties)
    .to(innerElems, animationProperties, 0);
}

function initEvents(DOM_el, hoverTimeline) {
  const onMouseEnter = () => {
    hoverTimeline.play();
  };
  const onMouseLeave = () => hoverTimeline.reverse();

  DOM_el.addEventListener("mouseenter", onMouseEnter);
  DOM_el.addEventListener("mouseleave", onMouseLeave);
}

function ImageHover(DOM_el) {
  // DOM elements
  const DOM = {
    // main element (.image)
    el: DOM_el,
    // .image__element
    innerElems: null,
  };

  // Background image path
  const bgImage = /(?:\(['"]?)(.*?)(?:['"]?\))/.exec(
    DOM.el.style.backgroundImage
  )[1];

  //   const bgImage = DOM_el.src;
  // Total inner image elements
  let totalInnerElems = +DOM.el.dataset.repetitionElems || 4;
  // Minimum of two inner elements
  totalInnerElems = totalInnerElems <= 1 ? 2 : totalInnerElems;

  let innerHTML = "";

  for (let i = 0; i < totalInnerElems; ++i) {
    innerHTML +=
      i === 0
        ? `<div class="image__wrap"><div class="image__element" style="background-image:url(${bgImage})"></div></div>`
        : `<div class="image__element" style="background-image:url(${bgImage})"></div>`;
  }

  // Append
  DOM.el.innerHTML = innerHTML;

  // Get inner .image__element
  DOM.innerElems = DOM.el.querySelectorAll(".image__element");

  // transform origin
  gsap.set([DOM.el, DOM.innerElems[0]], {
    transformOrigin: DOM.el.dataset.repetitionOrigin || "50% 50%",
  });

  // Create Hover timeline
  const hoverTimeline = createHoverTimeline(
    DOM.innerElems,
    DOM.el.dataset.repetitionAnimate || "scale",
    DOM.el.dataset.repetitionDuration || 0.8,
    DOM.el.dataset.repetitionEase || "power2.inOut",
    DOM.el.dataset.repetitionStagger || -0.1,
    DOM.el.dataset.repetitionInitialScale || 2
  );

  // Initialize events
  initEvents(DOM.el, hoverTimeline);
}
