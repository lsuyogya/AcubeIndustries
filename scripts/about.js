document.addEventListener("DOMContentLoaded", () => {
  if (!Splide) return;
  const sliderRoot = document.querySelector("#coreValueSlider");
  if (!sliderRoot) return;
  const slider = new Splide(sliderRoot, {
    arrows: false,
    pagination: true,
    perPage: 1,
    perSlide: 1,
    classes: {
      page: "splide__pagination__page page-rounded-rect",
    },
  });
  slider.mount();
});

document.addEventListener("DOMContentLoaded", () => {
  if (!Splide) return;
  const sliderRoots = document.querySelectorAll(".serviceSplide");
  if (!sliderRoots) return;
  sliderRoots.forEach((sliderRoot) => {
    const slider = new Splide(sliderRoot, {
      arrows: false,
      pagination: true,
      perPage: 1,
      perSlide: 1,
      autoplay: true,
      interval: 3000,
      type: "loop",
      classes: {
        page: "splide__pagination__page page-rounded-rect",
      },
    });
    slider.mount();
  });
});
