document.addEventListener("DOMContentLoaded", () => {
  const headerContentContainer = document.getElementById("headerContentContainer");
  const burgerButton = document.getElementById("burgerButton");
  const mainNavMenu = document.getElementById("mainNavMenu");
  const backdrop = document.getElementById("backdrop");
  const burgerIcon = document.getElementById("burgerIcon");
  const closeIcon = document.getElementById("closeIcon");
  const body = document.body;

  function setMenuState(open) {
    mainNavMenu.classList.toggle("hidden", !open);
    backdrop.classList.toggle("hidden", !open);
    burgerIcon.classList.toggle("hidden", open);
    closeIcon.classList.toggle("hidden", !open);
    body.classList.toggle("no-scroll", open);
    headerContentContainer.classList.toggle("menu-open", open);
  }

  function updateMenuDisplay() {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      mainNavMenu.classList.remove("hidden");
      backdrop.classList.add("hidden");
      body.classList.remove("no-scroll");
      headerContentContainer.classList.remove("menu-open");
    } else {
      setMenuState(false);
    }
  }

  updateMenuDisplay();

  window.addEventListener("resize", updateMenuDisplay);

  burgerButton.addEventListener("click", () => {
    const isHidden = mainNavMenu.classList.contains("hidden");
    setMenuState(isHidden);
  });

  backdrop.addEventListener("click", () => setMenuState(false));
});
