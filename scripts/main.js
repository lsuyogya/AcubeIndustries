document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  document.addEventListener("scroll", () => {
    const scrollX = window.scrollX + "px";
    const scrollY = window.scrollY + "px";

    body.style.setProperty("--scrollX", scrollX);
    body.style.setProperty("--scrollY", scrollY);
    body.style.setProperty("--vh", window.innerHeight + "px");
    body.style.setProperty("--vw", window.innerWidth + "px");
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
  updateOpacity(); // Initialize on page load
});
