const NOTICE_ENABLED = true;
const NOTICE_SESSION_KEY = "monti-site-construction-notice-dismissed";
const NOTICE_MESSAGE =
  "Our new website is currently being completed. Some pages and links may be temporarily unavailable while we put the finishing touches in place.";

function hasDismissedNotice() {
  try {
    return window.sessionStorage.getItem(NOTICE_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function dismissNotice() {
  try {
    window.sessionStorage.setItem(NOTICE_SESSION_KEY, "true");
  } catch {
    // Session storage may be unavailable in restricted browser modes.
  }

  document.querySelector("[data-site-notice]")?.remove();
  document.body.classList.remove("has-site-notice");
  document.documentElement.style.removeProperty("--site-notice-height");
}

function updateNoticeHeight(notice) {
  document.documentElement.style.setProperty("--site-notice-height", `${notice.offsetHeight}px`);
}

function createNotice() {
  const notice = document.createElement("aside");
  notice.className = "site-notice";
  notice.setAttribute("data-site-notice", "");
  notice.setAttribute("aria-label", "Website update");

  notice.innerHTML = `
    <div class="site-notice__inner">
      <p>${NOTICE_MESSAGE}</p>
      <button class="site-notice__close" type="button" aria-label="Close announcement">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `;

  notice.querySelector("[data-site-notice-close], .site-notice__close")?.addEventListener("click", dismissNotice);
  document.body.prepend(notice);
  document.body.classList.add("has-site-notice");
  updateNoticeHeight(notice);

  window.addEventListener("resize", () => updateNoticeHeight(notice), { passive: true });
}

// TEMPORARY SITE CONSTRUCTION NOTICE: remove this import/module when the website is complete.
if (NOTICE_ENABLED && !hasDismissedNotice()) {
  createNotice();
}
