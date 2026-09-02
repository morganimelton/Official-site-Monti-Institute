const header = document.querySelector("[data-site-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobilePanel = document.querySelector("[data-mobile-panel]");
const mobileLinks = document.querySelectorAll(".mobile-nav a");
const careMenuRoot = document.querySelector("[data-care-menu-root]");
const careMenuTrigger = document.querySelector("[data-care-menu-trigger]");
const mobileNavQuery = window.matchMedia("(max-width: 767px)");

function setScrolledState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
}

function closeMenu() {
  header?.classList.remove("is-open");
  document.body.classList.remove("nav-locked");
  menuToggle?.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  const isOpen = header?.classList.toggle("is-open");
  document.body.classList.toggle("nav-locked", Boolean(isOpen));
  menuToggle?.setAttribute("aria-expanded", String(Boolean(isOpen)));
}

function setCareMenu(open) {
  if (open) careMenuRoot?.classList.remove("is-menu-suppressed");
  careMenuRoot?.classList.toggle("is-menu-open", open);
  careMenuTrigger?.setAttribute("aria-expanded", String(open));
}

menuToggle?.addEventListener("click", toggleMenu);

careMenuTrigger?.addEventListener("click", (event) => {
  if (mobileNavQuery.matches) return;
  event.preventDefault();
  setCareMenu(true);
});

careMenuRoot?.addEventListener("pointerenter", () => {
  if (!mobileNavQuery.matches) setCareMenu(true);
});

careMenuRoot?.addEventListener("pointerleave", () => {
  if (!mobileNavQuery.matches) {
    careMenuRoot.classList.remove("is-menu-suppressed");
    setCareMenu(false);
  }
});

careMenuRoot?.addEventListener("focusin", () => {
  if (!mobileNavQuery.matches) setCareMenu(true);
});

careMenuRoot?.addEventListener("focusout", (event) => {
  if (mobileNavQuery.matches) return;
  if (!careMenuRoot.contains(event.relatedTarget)) setCareMenu(false);
});

document.addEventListener("click", (event) => {
  if (mobileNavQuery.matches) return;
  if (!careMenuRoot?.contains(event.target)) setCareMenu(false);
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

mobilePanel?.addEventListener("click", (event) => {
  if (event.target === mobilePanel) closeMenu();
});

window.addEventListener("scroll", setScrolledState, { passive: true });
window.addEventListener("resize", () => {
  if (!mobileNavQuery.matches) closeMenu();
  if (mobileNavQuery.matches) setCareMenu(false);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
  if (event.key === "Escape") {
    setCareMenu(false);
    careMenuRoot?.classList.add("is-menu-suppressed");
    if (careMenuRoot?.contains(document.activeElement)) document.activeElement.blur();
  }
});

setScrolledState();
