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
