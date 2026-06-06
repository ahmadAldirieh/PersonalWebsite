// Year
document.getElementById('yr').textContent = new Date().getFullYear();

// Typewriter
const phrases = ['Hardware Engineer', 'PCB Designer', 'Robot Builder', 'ML Developer', 'Software Builder'];
let pi = 0, ci = 0, deleting = false;
const tw = document.getElementById('tw');
function type() {
  const word = phrases[pi];
  tw.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  let delay = deleting ? 50 : 90;
  if (!deleting && ci > word.length) { delay = 1800; deleting = true; }
  if (deleting && ci < 0) { deleting = false; pi = (pi + 1) % phrases.length; ci = 0; delay = 300; }
  setTimeout(type, delay);
}
type();

// Theme toggle
const themeBtn = document.getElementById('theme-btn');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
themeBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Mobile nav
const burger = document.getElementById('burger');
const mobMenu = document.getElementById('mob-menu');
burger.addEventListener('click', () => mobMenu.classList.toggle('open'));
mobMenu.querySelectorAll('.mm-link').forEach(l => l.addEventListener('click', () => mobMenu.classList.remove('open')));

// Scroll reveal
const revEls = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (i * 0.07) + 's';
      e.target.classList.add('vis');
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revEls.forEach(el => ro.observe(el));

// Active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nl');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}, { passive: true });
