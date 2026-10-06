// Navbar: fundo ao rolar + barra de progresso
const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('progressBar');

function onScroll() {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 30);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (docHeight > 0 ? (y / docHeight) * 100 : 0) + '%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

navMenu.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  })
);

// Scroll spy: destaca a seção ativa no menu
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((l) => {
          l.classList.toggle(
            'active',
            l.getAttribute('href') === '#' + entry.target.id && !l.classList.contains('nav-cta')
          );
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach((s) => spyObserver.observe(s));

// Reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll(
    '.section-title, .section-tag, .section-sub, .project-card, .skill-category, ' +
    '.timeline-item, .about-text, .stat, .edu-card, .courses-grid li, .contact-actions, .more-projects'
  )
  .forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

// Ano no rodapé
document.getElementById('year').textContent = new Date().getFullYear();
