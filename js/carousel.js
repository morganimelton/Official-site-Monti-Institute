const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach((carousel) => {
  const track = carousel.querySelector("[data-carousel-track]");
  const prev = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");

  function updateControls() {
    if (!track) return;

    const canScroll = track.scrollWidth > track.clientWidth + 1;
    [prev, next].forEach((button) => {
      button?.toggleAttribute("disabled", !canScroll);
      button?.setAttribute("aria-disabled", String(!canScroll));
    });
  }

  function scrollByCard(direction) {
    const firstCard = track?.querySelector(".provider-card");
    if (!track || !firstCard) return;

    const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
    const distance = firstCard.getBoundingClientRect().width + gap;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  let isDragging = false;
  let dragStartX = 0;
  let dragStartScroll = 0;

  track?.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    isDragging = true;
    dragStartX = event.clientX;
    dragStartScroll = track.scrollLeft;
    track.classList.add("is-dragging");
    track.setPointerCapture?.(event.pointerId);
  });

  track?.addEventListener("pointermove", (event) => {
    if (!isDragging || !track) return;
    track.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
  });

  function endDrag(event) {
    if (!isDragging) return;
    isDragging = false;
    track?.classList.remove("is-dragging");
    if (event?.pointerId) track?.releasePointerCapture?.(event.pointerId);
  }

  prev?.addEventListener("click", () => scrollByCard(-1));
  next?.addEventListener("click", () => scrollByCard(1));
  track?.addEventListener("pointerup", endDrag);
  track?.addEventListener("pointercancel", endDrag);
  track?.addEventListener("pointerleave", endDrag);
  track?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    }
  });
  track?.addEventListener("scroll", updateControls, { passive: true });
  window.addEventListener("resize", updateControls);
  updateControls();
});
