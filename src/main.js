import certResponsibleAi from "./assets/certificates/dict-responsible-ai.jpg";
import certCisco from "./assets/certificates/cisco-intro-to-cybersecurity.jpg";
import certStaySafe from "./assets/certificates/dict-stay-safe-online.jpg";
import certRoadDigital from "./assets/certificates/dict-road-to-digitalization.jpg";
import certFelta from "./assets/certificates/felta-robotics-workshop.jpg";

const certImages = {
  "dict-responsible-ai": certResponsibleAi,
  "cisco-intro-to-cybersecurity": certCisco,
  "dict-stay-safe-online": certStaySafe,
  "dict-road-to-digitalization": certRoadDigital,
  "felta-robotics-workshop": certFelta,
};

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
const pendingReveal = new Set();
let revealObserver = null;

function showReveal(el) {
  el.classList.add("is-visible");
  revealObserver?.unobserve(el);
}
function releaseReveals() {
  pendingReveal.forEach(showReveal);
  pendingReveal.clear();
}

if ("IntersectionObserver" in window) {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (document.body.classList.contains("is-loading")) {
          pendingReveal.add(entry.target); // wait until the loading screen is gone
          return;
        }
        showReveal(entry.target);
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
  const data = new FormData(form);
  const subject = `Portfolio message from ${data.get("name")}`;
  const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
  window.location.href =
    "mailto:alvarojohncarl495@gmail.com" +
    `?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const original = submitBtn.textContent;
  submitBtn.textContent = "Opening your email app...";
  setTimeout(() => {
    submitBtn.textContent = original || "Send via email";
  }, 3000);
});

// ========== Footer year ==========
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// ========== Loading screen ==========
const loader = document.getElementById("loader");

if (loader) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const codeEl = document.getElementById("loader-code");
  const box = document.getElementById("loader-box");
  const title = document.getElementById("loader-title");
  const dots = document.getElementById("loader-dots");
  const fill = document.getElementById("loader-fill");
  const pct = document.getElementById("loader-pct");
  const msg = document.getElementById("loader-msg");

  if (reduce || !(codeEl && box && title && dots && fill && pct && msg)) {
    loader.remove();
  } else {
    document.body.classList.add("is-loading");
    let finished = false;
    const timers = [];

    function finish() {
      if (finished) return;
      finished = true;
      timers.forEach(clearInterval);
      loader.classList.add("hide");
      document.body.classList.remove("is-loading");
      releaseReveals();
      setTimeout(() => loader.remove(), 800);
    }
    setTimeout(finish, 9000); // failsafe

    const el = (cls, title, parent) => {
      const d = document.createElement("div");
      d.className = cls;
      if (title) d.dataset.title = title;
      parent.appendChild(d);
      return d;
    };
    const rand = (n) => Math.floor(Math.random() * n);

    // pane 1: scrolling source code
    const snippet = [
      "static int verify_token(const char *t) {",
      "    uint8_t digest[32];",
      "    sha256(t, strlen(t), digest);",
      "    return memcmp(digest, stored, 32);",
      "}",
      "",
      "const scan = (host, ports) => {",
      "  for (const p of ports) {",
      "    if (probe(host, p) === 'open') report(p);",
      "  }",
      "};",
      "",
      "$ nmap -sV 192.168.1.0/24",
      "22/tcp   open   ssh",
      "80/tcp   open   http",
      "443/tcp  open   https",
      "",
      "if (attempts > 3) lockAccount(user);",
      "firewall.allow('443');",
      "firewall.deny('*');",
      "rbac.check(user, 'read');",
      "",
      "class Incident {",
      "  detect()  { /* ... */ }",
      "  contain() { /* ... */ }",
      "  recover() { /* ... */ }",
      "}",
      "",
    ].join("\n");
    const block = (snippet + "\n").repeat(3);
    const p1 = el("pane", "root@jc:~# source.c", codeEl);
    el("loader-col", "", p1).textContent = block + block;

    // pane 2: banner + matrix rain
    const mid = el("loader-stack", "", codeEl);
    const banner = el("pane banner", "alert.log", mid);
    banner.textContent = [
      "+------------------------------+",
      "|  SECURE SYSTEM DETECTED      |",
      "|  trace route ....... active  |",
      "|  intrusion alert ... armed   |",
      "|  firewall .......... ONLINE  |",
      "+------------------------------+",
    ].join("\n");
    const rain = el("pane matrix", "matrix", mid);
    const cv = document.createElement("canvas");
    rain.appendChild(cv);
    const cx = cv.getContext ? cv.getContext("2d") : null;
    if (cx) {
      const glyphs = "01ABCDEF<>/{}$#%&*+=".split("");
      const fs = 14;
      let cw = 0, ch = 0, drops = [];
      const fit = () => {
        cw = cv.width = rain.clientWidth || 300;
        ch = cv.height = rain.clientHeight || 300;
        drops = Array.from({ length: Math.ceil(cw / fs) }, () => rand(ch / fs));
      };
      fit();
      timers.push(setInterval(() => {
        if (!cw || !drops.length) fit();
        cx.fillStyle = "rgba(6, 9, 8, 0.18)";
        cx.fillRect(0, 0, cw, ch);
        cx.fillStyle = "#b6ff3b";
        cx.font = fs + "px monospace";
        drops.forEach((y, i) => {
          cx.fillText(glyphs[rand(glyphs.length)], i * fs, y * fs);
          drops[i] = y * fs > ch && Math.random() > 0.96 ? 0 : y + 1;
        });
      }, 55));
    }

    // pane 3: live log + hex dump
    const right = el("loader-stack right even", "", codeEl);
    const log = el("pane log", "intrusion.log", right);
    const logLines = [
      () => `[+] connecting to 10.0.${rand(255)}.${rand(255)}`,
      () => `[+] port ${[21, 22, 80, 443, 3306, 8080][rand(6)]}/tcp open`,
      () => "[+] handshake complete",
      () => "[+] bypassing firewall rule " + rand(99),
      () => "[+] decrypting packet " + rand(9999).toString(16),
      () => "[+] privilege escalation: ok",
      () => "[!] intrusion attempt blocked",
      () => "[+] session key: " + Math.random().toString(16).slice(2, 12),
    ];
    timers.push(setInterval(() => {
      const line = document.createElement("div");
      const text = logLines[rand(logLines.length)]();
      line.textContent = text;
      if (text.startsWith("[!]")) line.className = "warn";
      log.appendChild(line);
      while (log.children.length > 28) log.removeChild(log.firstChild);
    }, 110));

    const hex = el("pane", "hexdump", right);
    const hexLines = Array.from({ length: 60 }, (_, i) =>
      (i * 16).toString(16).padStart(4, "0") + ": " +
      Array.from({ length: 8 }, () => rand(256).toString(16).padStart(2, "0")).join(" ")
    ).join("\n");
    el("loader-col", "", hex).textContent = hexLines + "\n" + hexLines;
    hex.firstElementChild.style.animationDuration = "24s";

    // progress + messages
    const messages = [
      [0, "> initializing secure connection"],
      [25, "> bypassing firewall"],
      [50, "> decrypting profile"],
      [75, "> loading portfolio"],
    ];
    const START_DELAY = 1200; // short pause before the bar starts
    const DURATION = 1400;
    const start = performance.now() + START_DELAY;
    let pageLoaded = document.readyState === "complete";
    if (!pageLoaded) window.addEventListener("load", () => { pageLoaded = true; }, { once: true });

    function tick(now) {
      if (finished) return;
      let p = Math.min(Math.max((now - start) / DURATION, 0), 1);
      if (!pageLoaded) p = Math.min(p, 0.99);
      const val = Math.floor(p * 100);
      fill.style.width = val + "%";
      pct.textContent = val + "%";
      for (const [at, text] of messages) if (val >= at) msg.textContent = text;

      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        title.textContent = "ACCESS GRANTED";
        dots.classList.add("off");
        msg.textContent = "> welcome";
        box.classList.add("granted");
        setTimeout(finish, 1000);
      }
    }
    requestAnimationFrame(tick);
  }
}

// ========== Certificate viewer ==========
const certModal = document.getElementById("cert-modal");

if (certModal) {
  const certImg = document.getElementById("cert-modal-img");
  const certTitle = document.getElementById("cert-modal-title");
  const certOpen = document.getElementById("cert-modal-open");
  const certError = document.getElementById("cert-modal-error");
  const certClose = certModal.querySelector(".cert-modal-close");
  let lastTrigger = null;

  function openCert(link) {
    const href = certImages[link.dataset.cert] || "";
    const card = link.closest(".project-card");
    const name = card?.querySelector("h3")?.textContent.trim() || "Certificate";
    lastTrigger = link;
    certTitle.textContent = name;
    certOpen.href = href;
    // data: URLs can't be opened in a new tab directly, so use a blob URL
    if (href.startsWith("data:")) {
      fetch(href)
        .then((r) => r.blob())
        .then((b) => { certOpen.href = URL.createObjectURL(b); })
        .catch(() => {});
    }
    certError.hidden = true;
    certImg.hidden = false;
    certImg.alt = `${name} certificate`;
    certImg.src = href;
    certModal.hidden = false;
    document.body.classList.add("modal-open");
    certClose.focus();
  }

  function closeCert() {
    certModal.hidden = true;
    document.body.classList.remove("modal-open");
    certImg.removeAttribute("src");
    lastTrigger?.focus();
  }

  certImg.addEventListener("error", () => {
    if (!certImg.getAttribute("src")) return;
    certImg.hidden = true;
    certError.hidden = false;
  });

  document.addEventListener("click", (e) => {
    const link = e.target.closest?.(".cert-link");
    if (link) {
      e.preventDefault();
      openCert(link);
    } else if (e.target.closest?.("[data-close]") && !certModal.hidden) {
      closeCert();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (certModal.hidden) return;
    if (e.key === "Escape") closeCert();
    if (e.key === "Tab") {
      const focusable = [certClose, certOpen];
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}