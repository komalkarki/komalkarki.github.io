document.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.querySelector('section.about');
  if (aboutSection) aboutSection.classList.add('is-loaded');

  const root = document.querySelector('.about-cards');
  if (!root) return;

  const single = root.getAttribute('data-accordion') !== 'multi';
  const triggers = Array.from(root.querySelectorAll('button.about-card[aria-controls]'));
  const tabs = Array.from(root.querySelectorAll('.skill-tab.card'));

  function clampLevel(raw) {
    const n = Number(raw);
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(100, n));
  }

  function setBars(panel, open) {
    const meters = panel.querySelectorAll('.skill-meter');
    meters.forEach((meter) => {
      const fill = meter.querySelector('.skill-meter__fill');
      if (!fill) return;

      const level = clampLevel(meter.getAttribute('data-level'));
      fill.style.width = open ? `${level}%` : '0%';
    });
  }

  function getPanel(trigger) {
    const id = trigger.getAttribute('aria-controls');
    if (!id) return null;
    return document.getElementById(id);
  }

  function syncCardHeight(tab) {
    const front = tab.querySelector('.card-front .about-card');
    const back = tab.querySelector('.card-back .about-panel');
    if (!front || !back) return;

    const frontHeight = front.scrollHeight;
    const backHeight = back.scrollHeight;
    const flipped = tab.classList.contains('flipped');
    tab.style.height = `${flipped ? backHeight : frontHeight}px`;
  }

  function syncAllCardHeights() {
    tabs.forEach((tab) => syncCardHeight(tab));
  }

  function computeMaxFrontHeight() {
    let max = 0;
    tabs.forEach((tab) => {
      const front = tab.querySelector('.card-front .about-card');
      if (!front) return;
      const h = front.scrollHeight;
      if (h > max) max = h;
    });
    return max;
  }

  function applyEqualInitialHeights() {
    const maxFront = computeMaxFrontHeight();
    if (!maxFront) return;
    tabs.forEach((tab) => {
      // only set if not flipped
      if (!tab.classList.contains('flipped')) tab.style.height = `${maxFront}px`;
    });
  }

  function close(trigger) {
    const panel = getPanel(trigger);
    if (!panel) return;
    const tab = trigger.closest('.skill-tab');
    if (tab) {
      tab.classList.remove('active');
      tab.classList.remove('flipped');
      syncCardHeight(tab);
    }
    trigger.classList.remove('active');

    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-selected', 'false');
    panel.setAttribute('aria-hidden', 'true');
    setBars(panel, false);
  }

  function open(trigger) {
    const panel = getPanel(trigger);
    if (!panel) return;
    const tab = trigger.closest('.skill-tab');
    if (tab) {
      tab.classList.add('active');
      tab.classList.add('flipped');
      syncCardHeight(tab);
    }
    trigger.classList.add('active');

    trigger.setAttribute('aria-expanded', 'true');
    trigger.setAttribute('aria-selected', 'true');
    panel.setAttribute('aria-hidden', 'false');

    // Animate bars only after the card enters active/open state.
    requestAnimationFrame(() => setBars(panel, true));
  }

  function toggle(trigger) {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      close(trigger);
      return;
    }

    if (single) {
      triggers.forEach((t) => {
        if (t !== trigger) close(t);
      });
    }

    open(trigger);
  }

  // Initialize closed state (bars at 0, panels collapsed)
  triggers.forEach((trigger) => {
    const panel = getPanel(trigger);
    if (!panel) return;
    const tab = trigger.closest('.skill-tab');
    if (tab) tab.classList.remove('active');
    trigger.classList.remove('active');

    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-selected', 'false');
    panel.setAttribute('aria-hidden', 'true');
    setBars(panel, false);

    trigger.addEventListener('click', () => toggle(trigger));

    const flipTab = trigger.closest('.skill-tab.card');
    if (flipTab) {
      flipTab.addEventListener('mouseleave', () => {
        if (flipTab.classList.contains('flipped')) close(trigger);
      });
    }
  });

  // Apply equal initial heights, then keep syncing
  applyEqualInitialHeights();
  syncAllCardHeights();
  window.addEventListener('load', () => { applyEqualInitialHeights(); syncAllCardHeights(); });
  window.addEventListener('resize', () => { applyEqualInitialHeights(); syncAllCardHeights(); });
});

