const initAboutGallery = () => {
  const galleryTrack = document.querySelector("[data-about-gallery-track]");
  const galleryButtons = Array.from(document.querySelectorAll("[data-gallery-index]"));
  const lightbox = document.querySelector("[data-about-lightbox]");
  const lightboxImage = document.querySelector("[data-lightbox-image]");
  const closeButton = document.querySelector("[data-lightbox-close]");
  const prevButton = document.querySelector("[data-lightbox-prev]");
  const nextButton = document.querySelector("[data-lightbox-next]");

  if (!galleryTrack || !galleryButtons.length || !lightbox || !lightboxImage) return;

  let activeIndex = 0;
  let dragStartX = 0;
  let scrollStartX = 0;
  let isDragging = false;
  let didDrag = false;
  let touchStartX = 0;

  const galleryImages = galleryButtons.map((button) => {
    const image = button.querySelector("img");
    return {
      alt: image?.alt || "",
      src: image?.currentSrc || image?.src || "",
    };
  });

  const showImage = (index) => {
    activeIndex = (index + galleryImages.length) % galleryImages.length;
    lightboxImage.src = galleryImages[activeIndex].src;
    lightboxImage.alt = galleryImages[activeIndex].alt;
  };

  const openLightbox = (index) => {
    showImage(index);
    lightbox.hidden = false;
    document.body.classList.add("is-about-lightbox-open");
    closeButton?.focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.classList.remove("is-about-lightbox-open");
    galleryButtons[activeIndex]?.focus();
  };

  const showPrevious = () => showImage(activeIndex - 1);
  const showNext = () => showImage(activeIndex + 1);

  galleryButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (didDrag) {
        didDrag = false;
        return;
      }

      openLightbox(index);
    });
  });

  galleryTrack.addEventListener("pointerdown", (event) => {
    isDragging = true;
    didDrag = false;
    dragStartX = event.clientX;
    scrollStartX = galleryTrack.scrollLeft;
    galleryTrack.classList.add("is-dragging");
    galleryTrack.setPointerCapture(event.pointerId);
  });

  galleryTrack.addEventListener("pointermove", (event) => {
    if (!isDragging) return;

    const distance = event.clientX - dragStartX;
    if (Math.abs(distance) > 6) didDrag = true;
    galleryTrack.scrollLeft = scrollStartX - distance;
  });

  const stopDragging = (event) => {
    if (!isDragging) return;

    isDragging = false;
    galleryTrack.classList.remove("is-dragging");
    if (galleryTrack.hasPointerCapture(event.pointerId)) {
      galleryTrack.releasePointerCapture(event.pointerId);
    }

    window.setTimeout(() => {
      didDrag = false;
    }, 120);
  };

  galleryTrack.addEventListener("pointerup", stopDragging);
  galleryTrack.addEventListener("pointercancel", stopDragging);
  galleryTrack.addEventListener("pointerleave", stopDragging);

  closeButton?.addEventListener("click", closeLightbox);
  prevButton?.addEventListener("click", showPrevious);
  nextButton?.addEventListener("click", showNext);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  lightbox.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0]?.clientX || 0;
  }, { passive: true });

  lightbox.addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0]?.clientX || 0;
    const distance = touchEndX - touchStartX;
    if (Math.abs(distance) < 48) return;

    if (distance > 0) {
      showPrevious();
    } else {
      showNext();
    }
  }, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      showNext();
    }
  });

  window.aboutGalleryReady = true;
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAboutGallery);
} else {
  initAboutGallery();
}
