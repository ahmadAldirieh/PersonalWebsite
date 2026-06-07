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
      e.target.style.transitionDelay = (i * 0.08) + 's';
      e.target.classList.add('vis');
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
revEls.forEach(el => ro.observe(el));

// Active nav
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nl');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}, { passive: true });

// Firefighter gallery switcher
const mainVideo = document.querySelector('.proj-video');
const thumbs = document.querySelectorAll('.ph-thumb');
const vidThumbs = document.querySelectorAll('.ph-vid-thumb');

thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    // Switch to image view — hide video, show image
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    const mainEl = document.querySelector('.ph-main');
    // Replace main content with image
    mainEl.innerHTML = `<img src="${thumb.src}" alt="" style="width:100%;max-height:320px;object-fit:cover;display:block;">`;
  });
});

vidThumbs.forEach(vt => {
  vt.addEventListener('click', () => {
    const src = vt.dataset.video;
    const mainEl = document.querySelector('.ph-main');
    mainEl.innerHTML = `<video class="proj-video" controls playsinline autoplay style="width:100%;max-height:320px;object-fit:cover;"><source src="${src}" type="video/mp4"></video>`;
    thumbs.forEach(t => t.classList.remove('active'));
  });
});

// Lightbox for sumo battle video
const lightbox = document.getElementById('lightbox');
const lbVideo = document.getElementById('lb-video');
const lbClose = document.getElementById('lb-close');

document.querySelectorAll('.vid-overlay').forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.dataset.video;
    lbVideo.innerHTML = `<source src="${src}" type="video/mp4">`;
    lbVideo.load();
    lbVideo.play();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lbVideo.pause();
  lbVideo.innerHTML = '';
  document.body.style.overflow = '';
}
lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
