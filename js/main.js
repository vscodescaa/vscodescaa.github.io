/**
 * main.js
 * -----------------------------------------------------------------------
 * Toda la interacción del sitio: nav morph, menú móvil, reveals on scroll,
 * tilt 3D del teléfono, parallax de la sección de educación, y el aplicado
 * de datos dinámicos (fechas/semestre) definidos en js/data.js.
 * -----------------------------------------------------------------------
 */

/* =========================
   DATOS DINÁMICOS
   Rellena cualquier elemento marcado con data-dynamic="clave"
   usando los valores calculados en CV_DATA (js/data.js).
========================= */
function applyDynamicData() {
  if (typeof CV_DATA === "undefined") return;

  document.querySelectorAll("[data-dynamic]").forEach(el => {
    const key = el.getAttribute("data-dynamic");
    if (key in CV_DATA) {
      el.textContent = CV_DATA[key];
    }
  });
}

/* =========================
   LOAD
========================= */
window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    document.body.classList.add("loaded");
  });
});

/* =========================
   NAV MORPH
========================= */
function initNavMorph() {
  const navWrap = document.getElementById("navWrap");
  if (!navWrap) return;

  function updateNavbar() {
    if (window.scrollY > 70) {
      navWrap.classList.add("scrolled");
    } else {
      navWrap.classList.remove("scrolled");
    }
  }

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });
}

/* =========================
   MOBILE NAV
========================= */
function initMobileNav() {
  const navWrap = document.getElementById("navWrap");
  const menuButton = document.getElementById("menuButton");
  if (!navWrap || !menuButton) return;

  menuButton.addEventListener("click", () => {
    navWrap.classList.toggle("mobile-open");
    const isOpen = navWrap.classList.contains("mobile-open");
    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navWrap.classList.remove("mobile-open");
      menuButton.textContent = "☰";
    });
  });
}

/* =========================
   REVEALS
========================= */
function initReveals() {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  document.querySelectorAll(".reveal").forEach(el => {
    revealObserver.observe(el);
  });
}

/* =========================
   PHONE 3D ON SCROLL
========================= */
function initPhoneTilt() {
  const phoneVisual = document.getElementById("phoneVisual");
  const phoneFloat = document.getElementById("phoneFloat");

  function updatePhoneTilt() {
    if (!phoneVisual || !phoneFloat) return;

    const rect = phoneVisual.getBoundingClientRect();
    const vh = window.innerHeight;

    const center = rect.top + rect.height / 2;
    const progress = (center - vh / 2) / vh;

    const rotateX = progress * -18;
    const rotateY = progress * 10;
    const translateY = progress * -22;

    phoneFloat.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px)`;
  }

  window.addEventListener("scroll", updatePhoneTilt, { passive: true });
  window.addEventListener("resize", updatePhoneTilt);
  updatePhoneTilt();
}

/* =========================
   EDUCATION ART PARALLAX
========================= */
function initEducationParallax() {
  const education = document.querySelector(".education-section");
  const educationArt = document.querySelector(".education-art");

  function updateEducationArt() {
    if (!education || !educationArt) return;

    const rect = education.getBoundingClientRect();
    const vh = window.innerHeight;

    if (rect.bottom < 0 || rect.top > vh) return;

    const progress = (vh - rect.top) / (vh + rect.height);
    const offset = (progress - .5) * 22;

    educationArt.style.transform = `translateY(${offset}px)`;
  }

  window.addEventListener("scroll", updateEducationArt, { passive: true });
  updateEducationArt();
}

/* =========================
   INIT
========================= */
function initSite() {
  applyDynamicData();
  initNavMorph();
  initMobileNav();
  initReveals();
  initPhoneTilt();
  initEducationParallax();
}

document.addEventListener("DOMContentLoaded", initSite);
