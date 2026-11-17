// Año del footer
document.getElementById('year').textContent = new Date().getFullYear();

// Tema claro / oscuro
const root = document.documentElement;
document.getElementById('themeToggle').addEventListener('click', () => {
  const isDark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;
  const next = isDark ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Borde del nav al hacer scroll
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Aparición suave de secciones
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Detalle de proyectos (modal)
const modal = document.getElementById('projectModal');
const mTitle = document.getElementById('modalTitle');
const mTags = document.getElementById('modalTags');
const mBody = document.getElementById('modalBody');
const mRepo = document.getElementById('modalRepo');

function openProject(card) {
  mTitle.innerHTML = card.querySelector('h3').innerHTML;
  mTags.innerHTML = card.querySelector('.tags').innerHTML;
  mBody.innerHTML = card.querySelector('.details').innerHTML;
  mRepo.href = card.querySelector('.card-top a').href;
  modal.showModal();
  document.body.classList.add('modal-open');
  modal.scrollTop = 0;
}

document.querySelectorAll('.card').forEach((card) => {
  card.querySelector('.card-top a').addEventListener('click', (e) => e.stopPropagation());
  card.addEventListener('click', () => openProject(card));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProject(card); }
  });
});
document.getElementById('modalClose').addEventListener('click', () => modal.close());
modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
modal.addEventListener('close', () => document.body.classList.remove('modal-open'));

// Enlace activo en el menú
const links = document.querySelectorAll('.nav-links a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));
