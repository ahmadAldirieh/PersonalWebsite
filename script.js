// Year
document.getElementById('yr').textContent = new Date().getFullYear();

// Theme
const themeBtn = document.getElementById('theme-btn');
const saved = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  initCanvas(); // re-init canvas with new color
});

// ===== PARTICLE CANVAS =====
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animId;

function getAccentRGB() {
  const theme = document.documentElement.getAttribute('data-theme');
  return theme === 'dark' ? [255, 107, 53] : [232, 68, 10];
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() { this.reset(true); }
  reset(initial) {
    this.x = Math.random() * canvas.width;
    this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = -(Math.random() * 0.4 + 0.1);
    this.opacity = Math.random() * 0.5 + 0.1;
    this.life = 0;
    this.maxLife = Math.random() * 400 + 200;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;
    // fade in/out
    const t = this.life / this.maxLife;
    this.opacity = t < 0.1 ? t * 5 * 0.5 : t > 0.8 ? (1 - t) * 5 * 0.5 : 0.5;
    if (this.life >= this.maxLife || this.y < -10) this.reset(false);
  }
  draw() {
    const [r, g, b] = getAccentRGB();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${this.opacity})`;
    ctx.fill();
  }
}

// Connection lines between nearby particles
function drawConnections() {
  const [r, g, b] = getAccentRGB();
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const alpha = (1 - dist / 120) * 0.08;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  animId = requestAnimationFrame(animate);
}

function initCanvas() {
  cancelAnimationFrame(animId);
  resize();
  // Use fewer particles for performance — 60 is plenty
  const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 18000));
  particles = Array.from({ length: count }, () => new Particle());
  animate();
}

window.addEventListener('resize', () => { resize(); });
initCanvas();

// Mobile nav
const burger = document.getElementById('burger');
const mobMenu = document.getElementById('mob-menu');
burger.addEventListener('click', () => mobMenu.classList.toggle('open'));
mobMenu.querySelectorAll('.mm-link').forEach(l => l.addEventListener('click', () => mobMenu.classList.remove('open')));

// Scroll reveal
const revEls = document.querySelectorAll('.reveal');
if (revEls.length) {
  const ro = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (i * 0.08) + 's';
        e.target.classList.add('vis');
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  revEls.forEach(el => ro.observe(el));
}

// Active nav
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nl');
if (sections.length) {
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }, { passive: true });
}

// Gallery switcher (project pages)
const galleryMain = document.getElementById('gallery-main');
const gthumbs = document.querySelectorAll('.gthumb');
if (galleryMain && gthumbs.length) {
  gthumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      gthumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const type = thumb.dataset.type;
      const src = thumb.dataset.src;
      if (type === 'video') {
        galleryMain.innerHTML = `<video class="active-media" controls playsinline autoplay><source src="${src}" type="video/mp4"></video>`;
      } else {
        galleryMain.innerHTML = `<img src="${src}" alt="" class="active-media">`;
      }
    });
  });
}
