document.getElementById('yr').textContent = new Date().getFullYear();

// ── THEME ──
const themeBtn = document.getElementById('theme-btn');
const saved = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

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
