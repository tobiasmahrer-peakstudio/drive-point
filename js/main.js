// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
    });
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => document.body.classList.remove("nav-open"));
    });
  }

  // Accordion (Angebot detail panels)
  document.querySelectorAll(".acc-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".acc-item");
      const panel = item.querySelector(".acc-panel");
      const isOpen = item.classList.contains("open");

      item.parentElement.querySelectorAll(".acc-item.open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".acc-panel").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("open");
        panel.style.maxHeight = null;
      } else {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  // Scroll reveal (elements are visible by default; JS opts them into the fade-in)
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    revealEls.forEach((el) => el.classList.add("pre"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  // Footer year
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Formula widget (interactive sliders that unlock a photo at 100/100)
  const formulaPreview = document.getElementById("formula-preview");
  const sliders = document.querySelectorAll(".slider-input");
  if (formulaPreview && sliders.length) {
    const statusLabels = {
      verstaendnis: ["Ungeduldig", "Wird besser", "Fast geschafft", "Eingespielt", "Volles Verständnis"],
      ruhe: ["Angespannt", "Lockert sich", "Fast entspannt", "Sehr gelassen", "Absolute Ruhe"],
    };

    const statusFor = (key, val) => {
      const steps = statusLabels[key] || [];
      const idx = Math.min(steps.length - 1, Math.floor(val / (100 / steps.length)));
      return steps[idx] || "";
    };

    const update = () => {
      let allFull = true;
      sliders.forEach((input) => {
        const key = input.dataset.key;
        const val = Number(input.value);
        const fill = formulaPreview.parentElement.querySelector(`.slider-fill[data-fill-for="${key}"]`);
        const valueEl = formulaPreview.parentElement.querySelector(`.slider-value[data-value-for="${key}"]`);
        const statusEl = formulaPreview.parentElement.querySelector(`.slider-status[data-status-for="${key}"]`);
        if (fill) fill.style.width = val + "%";
        if (valueEl) valueEl.textContent = val + "%";
        if (statusEl) statusEl.textContent = statusFor(key, val);
        if (val < 100) allFull = false;
      });
      if (allFull) formulaPreview.classList.add("unlocked");
    };

    sliders.forEach((input) => input.addEventListener("input", update));
    update();
  }
});
