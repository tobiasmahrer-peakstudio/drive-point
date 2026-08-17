// Scales .mockup-scale elements to exactly fill their .mockup-viewport container,
// at any screen width. Do NOT replace this with a fixed transform:scale() value —
// see SKILL.md for why that breaks. Include this after the mockup markup exists
// in the DOM (e.g. at the end of body, or after DOMContentLoaded).

(function () {
  const mockupScales = document.querySelectorAll('.mockup-scale');
  if (!mockupScales.length) return;

  const fitMockups = () => {
    mockupScales.forEach((scaleEl) => {
      const viewport = scaleEl.parentElement;
      scaleEl.style.transform = 'none';
      const naturalWidth = scaleEl.offsetWidth;
      const naturalHeight = scaleEl.offsetHeight;
      if (!naturalWidth) return;
      const scale = viewport.clientWidth / naturalWidth;
      scaleEl.style.transform = `scale(${scale})`;
      viewport.style.height = `${naturalHeight * scale}px`;
    });
  };

  fitMockups();
  window.addEventListener('load', fitMockups);
  window.addEventListener('resize', () => {
    clearTimeout(window.__mockupResizeTimer);
    window.__mockupResizeTimer = setTimeout(fitMockups, 150);
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitMockups);
  }
})();
