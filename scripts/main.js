document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const header = document.querySelector("header");
  function bodyStyles() {
    body.style.setProperty("--headerHeight", header.offsetHeight + "px");
    body.style.setProperty("--vh", window.innerHeight + "px");
    body.style.setProperty("--vw", window.innerWidth + "px");
  }

  document.addEventListener("scroll", () => {
    const scrollX = window.scrollX + "px";
    const scrollY = window.scrollY + "px";

    body.style.setProperty("--scrollX", scrollX);
    body.style.setProperty("--scrollY", scrollY);
  });

  const parallexColumns = document.querySelectorAll(".parallexColumns .column");
  parallexColumns.forEach((column, index) => {
    const multiplier = (Math.pow(index, 1.5) + 1) / 20;
    column.style.setProperty("--multiplier", multiplier);
  });

  function updateOpacity() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    const startPoint = 50 * (viewportHeight / 100); // Convert 100vh to px
    const endPoint = 250 * (viewportHeight / 100); // Convert 250vh to px
    const scrollRange = endPoint - startPoint;

    const maxOpacity = 0.3; // Change this to your desired max opacity

    // Normalize progress between 0 and 1
    let progress = (scrollY - startPoint) / scrollRange;
    progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1

    // Apply opacity: Fade in → peak → fade out
    const opacity = maxOpacity * (1 - Math.abs(2 * progress - 1));

    // Update opacity directly
    document.querySelector(".parallexColumns").style.opacity = opacity;

    // Apply additional logic for `.txtContent`
    const txtContentOpacity = Math.max(
      0,
      (scrollY - (125 * viewportHeight) / 100) / 100
    );
    document.querySelector(".txtContent").style.opacity = txtContentOpacity;
  }

  window.addEventListener("scroll", updateOpacity);
  window.addEventListener("resize", updateOpacity); // Handle screen resize
  window.addEventListener("resize", bodyStyles); // Handle screen resize
  updateOpacity(); // Initialize on page load
  bodyStyles(); // Initialize on page load

  var splide = new Splide("#splideProjectsLeft", {
    arrows: false,
    pagination: false,
    perPage: 1,
    perSlide: 1,
  });
  var splide2 = new Splide("#splideProjectsRight", {
    arrows: false,
    pagination: false,
    perPage: 1,
    perSlide: 1,
  });
  splide.sync(splide2);
  splide.mount();
  splide2.mount();

  const slideBtns = document.querySelectorAll(".projectSlideBtn");
  slideBtns.forEach((slideBtn) => {
    const attr = slideBtn.getAttribute("data-page");
    if (attr == "next") {
      slideBtn.addEventListener("click", () => {
        splide.go(">");
      });
    } else {
      slideBtn.addEventListener("click", () => {
        splide.go("<");
      });
    }
  });

  feather.replace();
});
