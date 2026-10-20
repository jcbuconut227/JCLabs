// ========== Theme ==========
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

function getPreferredTheme() {
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  return "dark";
}

function applyTheme(theme) {
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
}

applyTheme(getPreferredTheme());

themeToggle?.addEventListener("click", () => {
  const next = root.classList.contains("dark") ? "light" : "dark";
  applyTheme(next);
});

// ========== Mobile menu ==========
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
  menuToggle?.classList.remove("menu-open");
  navLinks?.classList.remove("mobile-open");
}

menuToggle?.addEventListener("click", () => {
  menuToggle.classList.toggle("menu-open");
  navLinks?.classList.toggle("mobile-open");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// ========== Sticky header ==========
const header = document.getElementById("header");

function onScrollHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 20);
}
onScrollHeader();
window.addEventListener("scroll", onScrollHeader, { passive: true });

// ========== Back to top ==========
const backTop = document.getElementById("back-top");

function onScrollTop() {
  backTop?.classList.toggle("visible", window.scrollY > 500);
}
onScrollTop();
window.addEventListener("scroll", onScrollTop, { passive: true });

backTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ========== Scroll reveal ==========
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// ========== Skill bars ==========
const skillFills = document.querySelectorAll(".skill-fill");

if ("IntersectionObserver" in window && skillFills.length) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const level = entry.target.getAttribute("data-level") || "0";
          entry.target.style.width = `${level}%`;
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  skillFills.forEach((el) => skillObserver.observe(el));
} else {
  skillFills.forEach((el) => {
    el.style.width = `${el.getAttribute("data-level") || 0}%`;
  });
}

// ========== Contact form ==========
const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!submitBtn) return;
  const original = submitBtn.textContent;
  submitBtn.textContent = "Thanks! Message sent.";
  submitBtn.disabled = true;
  form.reset();
  setTimeout(() => {
    submitBtn.textContent = original || "Send message";
    submitBtn.disabled = false;
  }, 3500);
});

// ========== Footer year ==========
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
