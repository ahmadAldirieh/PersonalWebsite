// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Typewriter
const phrases = ['Hardware Engineer', 'Software Builder', 'PCB Designer', 'ML Enthusiast', 'Co-op Seeker'];
let pi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');
function type() {
  const word = phrases[pi];
  tw.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  let delay = deleting ? 55 : 90;
  if (!deleting && ci > word.length) { delay = 1600; deleting = true; }
  if (deleting && ci < 0) { deleting = false; pi = (pi + 1) % phrases.length; ci = 0; delay = 300; }
  setTimeout(type, delay);
}
type();

// Mobile nav
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
hamburger.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => mobileNav.classList.remove('open')));

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (i * 0.08) + 's';
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// Smooth active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
}, { passive: true });
