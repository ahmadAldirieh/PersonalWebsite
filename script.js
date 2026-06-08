document.getElementById('yr').textContent = new Date().getFullYear();

// ── THEME ──
const themeBtn = document.getElementById('theme-btn');
const saved = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  if (window._initCanvas) window._initCanvas();
});

// ── PARTICLE CANVAS (index only) ──
const canvas = document.getElementById('bg-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [], animId;

  function getColor() {
    return document.documentElement.getAttribute('data-theme') === 'dark'
      ? [0, 220, 180] : [0, 122, 96];
  }
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }

  class Particle {
    constructor() { this.reset(true); }
    reset(initial) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : canvas.height + 10;
      this.size = Math.random() * 1.3 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.22;
      this.speedY = -(Math.random() * 0.32 + 0.08);
      this.life = 0;
      this.maxLife = Math.random() * 450 + 200;
    }
    get alpha() {
      const t = this.life / this.maxLife;
      return t < 0.1 ? t * 5 * 0.5 : t > 0.8 ? (1 - t) * 5 * 0.5 : 0.5;
    }
    update() {
      this.x += this.speedX; this.y += this.speedY; this.life++;
      if (this.life >= this.maxLife || this.y < -10) this.reset(false);
    }
    draw() {
      const [r,g,b] = getColor();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${this.alpha})`;
      ctx.fill();
    }
  }

  function drawConnections() {
    const [r,g,b] = getColor();
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${(1-d/100)*0.08})`;
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
    const count = Math.min(50, Math.floor((canvas.width * canvas.height) / 22000));
    particles = Array.from({ length: count }, () => new Particle());
    animate();
  }
  window._initCanvas = initCanvas;
  window.addEventListener('resize', () => resize(), { passive: true });
  initCanvas();
}

// ── MOBILE NAV ──
const burger = document.getElementById('burger');
const mobMenu = document.getElementById('mob-menu');
burger.addEventListener('click', () => mobMenu.classList.toggle('open'));
mobMenu.querySelectorAll('.mm-link').forEach(l => l.addEventListener('click', () => mobMenu.classList.remove('open')));

// ── SCROLL REVEAL ──
const revEls = document.querySelectorAll('.reveal');
if (revEls.length) {
  const ro = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (i * 0.07) + 's';
        e.target.classList.add('vis');
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  revEls.forEach(el => ro.observe(el));
}

// ── ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nl');
if (sections.length) {
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }, { passive: true });
}

// ── GALLERY (project pages) ──
const galleryMain = document.getElementById('gallery-main');
if (galleryMain) {
  // Use event delegation on the thumbs container — no timing issues
  const thumbsContainer = document.querySelector('.gallery-thumbs');
  if (thumbsContainer) {
    thumbsContainer.addEventListener('click', e => {
      const thumb = e.target.closest('.gthumb');
      if (!thumb) return;
      document.querySelectorAll('.gthumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const type = thumb.dataset.type;
      const src = thumb.dataset.src;
      if (type === 'video') {
        galleryMain.innerHTML = `<video class="active-media" controls playsinline autoplay style="width:100%;height:100%;object-fit:contain;background:#000"><source src="${src}" type="video/mp4"></video>`;
      } else {
        galleryMain.innerHTML = `<img src="${src}" alt="" class="active-media" style="width:100%;height:100%;object-fit:contain">`;
      }
    });
  }
}
