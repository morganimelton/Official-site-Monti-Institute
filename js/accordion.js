const accordions = document.querySelectorAll("[data-accordion]");

accordions.forEach((accordion) => {
  const rows = accordion.querySelectorAll(".treatment-row");

  rows.forEach((row) => {
    const trigger = row.querySelector(".treatment-row__trigger");
    const panel = row.querySelector(".treatment-row__panel");
    const icon = row.querySelector(".treatment-row__icon");

    trigger?.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      trigger.setAttribute("aria-expanded", String(!isOpen));
      row.classList.toggle("is-open", !isOpen);
      if (icon) icon.textContent = isOpen ? "+" : "-";
      if (panel) panel.style.maxHeight = isOpen ? "0px" : `${panel.scrollHeight}px`;
    });
  });
});
