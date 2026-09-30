const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#site-menu');
function closeMenu() {
  menu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menu.hidden = isOpen;
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
});
menu.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !menu.hidden) {
    closeMenu();
    menuButton.focus();
  }
});
const filters = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('[data-category]');
function filterProjects(button) {
  filters.forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  let count = 0;
  projects.forEach(project => {
    project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
    if (!project.hidden) count += 1;
  });
  document.querySelector('#filter-status').textContent = count + ' project' + (count === 1 ? '' : 's') + ' shown';
}
document.querySelector('.project-filters').hidden = false;
filters.forEach(button => button.addEventListener('click', () => filterProjects(button)));

const scroller = document.querySelector('#client-scroller');
const scrollButtons = document.querySelectorAll('[data-scroll]');
document.querySelector('.scroller-controls').hidden = false;
function updateScrollButtons() {
  scrollButtons[0].disabled = scroller.scrollLeft <= 1;
  scrollButtons[1].disabled = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 1;
}
scrollButtons.forEach(button => {
  button.addEventListener('click', () => {
    scroller.scrollBy({
      left: Number(button.dataset.scroll) * scroller.clientWidth * 0.8,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  });
});
scroller.addEventListener('scroll', updateScrollButtons, { passive: true });
window.addEventListener('resize', updateScrollButtons);
updateScrollButtons();


// Move gently in both directions, without duplicating client links.
const clientsSection = scroller.closest('.clients');
const pauseButton = document.querySelector('.scroll-pause');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = false;
let hovered = false;
let visible = false;
let direction = 1;
let frame = null;
let previousTime = null;
let position = scroller.scrollLeft;
let resumeAfter = 0;

function canAnimate() {
  return visible && !document.hidden && !reducedMotion.matches && !paused && !hovered && !clientsSection.contains(document.activeElement);
}
function animateClients(time) {
  frame = null;
  if (!canAnimate()) return;
  const elapsed = previousTime === null ? 0 : Math.min(time - previousTime, 50);
  previousTime = time;
  const limit = scroller.scrollWidth - scroller.clientWidth;
  if (time >= resumeAfter && limit > 0) {
    position = Math.max(0, Math.min(limit, position + direction * elapsed * 0.028));
    scroller.scrollLeft = position;
    if (position >= limit) direction = -1;
    if (position <= 0) direction = 1;
  } else {
    position = scroller.scrollLeft;
  }
  frame = requestAnimationFrame(animateClients);
}
function syncAutoscroll() {
  if (frame !== null) cancelAnimationFrame(frame);
  frame = null;
  previousTime = null;
  position = scroller.scrollLeft;
  scroller.classList.toggle('auto-scrolling', !reducedMotion.matches);
  pauseButton.hidden = reducedMotion.matches;
  if (canAnimate()) frame = requestAnimationFrame(animateClients);
}
pauseButton.addEventListener('click', () => {
  paused = !paused;
  pauseButton.setAttribute('aria-pressed', String(paused));
  pauseButton.setAttribute('aria-label', paused ? 'Resume automatic scrolling' : 'Pause automatic scrolling');
  pauseButton.textContent = paused ? '▶' : 'Ⅱ';
  syncAutoscroll();
});
clientsSection.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse') { hovered = true; syncAutoscroll(); }
});
clientsSection.addEventListener('pointerleave', () => { hovered = false; syncAutoscroll(); });
clientsSection.addEventListener('focusin', syncAutoscroll);
clientsSection.addEventListener('focusout', () => requestAnimationFrame(syncAutoscroll));
for (const eventName of ['pointerdown', 'touchmove', 'wheel']) {
  scroller.addEventListener(eventName, () => { resumeAfter = performance.now() + 5000; }, { passive: true });
}
new IntersectionObserver(entries => {
  visible = entries[0].isIntersecting;
  syncAutoscroll();
}).observe(scroller);
document.addEventListener('visibilitychange', syncAutoscroll);
reducedMotion.addEventListener('change', syncAutoscroll);
window.addEventListener('resize', syncAutoscroll);
syncAutoscroll();

function revealCase(hash, focus = false) {
  const project = [...projects].find(item => '#' + item.id === hash);
  if (!project) return;
  if (project.hidden) filterProjects(document.querySelector('[data-filter="all"]'));
  project.querySelector('details').open = true;
  if (focus) {
    project.scrollIntoView({ block: 'start' });
    project.querySelector('h3').focus({ preventScroll: true });
  }
}
scroller.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  history.pushState(null, '', link.hash);
  revealCase(link.hash, true);
});
window.addEventListener('hashchange', () => revealCase(location.hash, true));
revealCase(location.hash);
