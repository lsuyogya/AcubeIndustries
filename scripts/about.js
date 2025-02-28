document.addEventListener('DOMContentLoaded', () => {
  if (!Splide) return;
  const slider = new Splide('#coreValueSlider', {
    arrows: false,
    pagination: true,
    perPage: 1,
    perSlide: 1,
    classes: {
      page: 'splide__pagination__page page-rounded-rect',
    },
  });
  slider.mount();
});
