document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const header = document.querySelector('#topHeader');
  function bodyStyles() {
    body.style.setProperty('--headerHeight', header.offsetHeight + 'px');
    body.style.setProperty('--vh', window.innerHeight + 'px');
    body.style.setProperty('--vw', window.innerWidth + 'px');
  }

  document.addEventListener('scroll', () => {
    const scrollX = window.scrollX + 'px';
    const scrollY = window.scrollY + 'px';

    body.style.setProperty('--scrollX', scrollX);
    body.style.setProperty('--scrollY', scrollY);
  });

  function txtOpacity() {
    const rootElement = document.querySelector(
      '.parallexColumns + .txtContent div:has(> p:first-child):has(> p:last-child)'
    );
    const paras = rootElement.querySelectorAll('p');

    paras.forEach((para) => {
      let htmlString = '';
      let letterArray = para.textContent.split('');
      letterArray.forEach((letter, index) => {
        if (letter != '') htmlString += `<span>${letterArray[index]}</span>`;
      });
      para.innerHTML = htmlString;
    });

    const spans = rootElement.querySelectorAll('span');
    //VH calculation, persoanl monitor reference;
    const startPointPx = 2000;
    const endPointPx = 2400;
    const vhPx = 959;
    const startPointVh = startPointPx / vhPx;
    const endPointVh = endPointPx / vhPx;
    let trueStartPointPx = 0;
    // debugger;
    if (window.innerWidth < 1000) {
      trueStartPointPx = window.innerHeight * 0.6;
    } else {
      trueStartPointPx = window.innerHeight * startPointVh;
    }
    function reveal() {
      spans.forEach((span) => {
        let { top, left } = span.getBoundingClientRect();
        const scrollRatio = window.scrollY / trueStartPointPx;
        if (scrollRatio < 4) {
          const closestDiv = span.closest('div');
          const closestDivTop = closestDiv.getBoundingClientRect().top;
          top = (top - closestDivTop) / 550;
          left = left / 1000 / 1.5;
          const opacityValue =
            scrollRatio - (top + left) < 0.1 ? 0.1 : scrollRatio - (top + left);
          span.style.opacity = opacityValue;
          span.style.setProperty('--top', top);
          span.style.setProperty('--left', left);
          span.style.setProperty('--trueStartingPoint', trueStartPointPx);
        }
      });
    }
    document.addEventListener('scroll', reveal);
    reveal();
  }

  function updateOpacity() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    const startPoint = 50 * (viewportHeight / 100); // Convert 100vh to px
    const endPoint = 300 * (viewportHeight / 100); // Convert 250vh to px
    const scrollRange = endPoint - startPoint;

    const maxOpacity = 0.3; // Change this to your desired max opacity

    // Normalize progress between 0 and 1
    let progress = (scrollY - startPoint) / scrollRange;
    progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1

    // Apply opacity: Fade in → peak → fade out
    const opacity = maxOpacity * (1 - Math.abs(2 * progress - 1));

    // Update opacity directly
    document.querySelector('.parallexColumns').style.opacity = opacity;

    // Apply additional logic for `.txtContent`
    const txtContentOpacity = Math.max(
      0,
      (scrollY - (105 * viewportHeight) / 100) / 100
    );
    document.querySelector('.txtContent').style.opacity = txtContentOpacity;
  }

  if (window.innerWidth >= 1000) {
    window.addEventListener('scroll', updateOpacity);
    window.addEventListener('resize', updateOpacity); // Handle screen resize
    window.addEventListener('resize', bodyStyles); // Handle screen resize
    const parallexColumns = document.querySelectorAll(
      '.parallexColumns .column'
    );
    parallexColumns.forEach((column, index) => {
      const multiplier = (Math.pow(index, 1.5) + 1) / 20;
      column.style.setProperty('--multiplier', multiplier); //css will use this to translate, at different speeds
    });
    updateOpacity(); // Initialize on page load
  }
  txtOpacity();
  bodyStyles(); // Initialize on page load

  var splideProjectsLeft = new Splide('#splideProjectsLeft', {
    arrows: false,
    pagination: false,
    perPage: 1,
    perSlide: 1,
  });
  var splideProjectsRight = new Splide('#splideProjectsRight', {
    arrows: false,
    pagination: false,
    perPage: 1,
    perSlide: 1,
  });
  splideProjectsLeft.sync(splideProjectsRight);
  splideProjectsLeft.mount();
  splideProjectsRight.mount();

  const slideBtns = document.querySelectorAll('.projectSlideBtn');
  slideBtns.forEach((slideBtn) => {
    const attr = slideBtn.getAttribute('data-page');
    if (attr == 'next') {
      slideBtn.addEventListener('click', () => {
        splideProjectsLeft.go('>');
      });
    } else {
      slideBtn.addEventListener('click', () => {
        splideProjectsLeft.go('<');
      });
    }
  });

  feather.replace();

  // Menu Gap...not needed anymore
  // const menuAnchors = document.querySelectorAll('.menuNav>a');
  // menuAnchors.forEach((menuAnchor, index) => {
  //   if (index % 2 != 0) index = index - 1;
  //   menuAnchor.style.setProperty('--order', index);
  // });

  //Menu
  const openBtn = document.querySelector('.hamburger');
  const closeBtn = document.querySelector('.menuOverlay .close');
  openBtn.addEventListener('click', () => {
    body.setAttribute('data-menu', 'open');
  });
  closeBtn.addEventListener('click', () => {
    body.setAttribute('data-menu', 'close');
  });
});
