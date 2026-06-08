document.getElementById('yr').textContent = new Date().getFullYear();

// ── THEME ──
const themeBtn = document.getElementById('theme-btn');
const saved = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  if (window._drawSchem) window._drawSchem();
});

// ── SCHEMATIC IC CANVAS ──
const schemCanvas = document.getElementById('schem-canvas');
if (schemCanvas) {
  const ctx = schemCanvas.getContext('2d');
  const W = 320, H = 460;
  schemCanvas.width = W;
  schemCanvas.height = H;

  function getAccent() {
    return document.documentElement.getAttribute('data-theme') === 'dark'
      ? '#00dcb4' : '#007a60';
  }
  function getDim() {
    return document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'rgba(0,220,180,0.18)' : 'rgba(0,122,96,0.18)';
  }
  function getBg() {
    return document.documentElement.getAttribute('data-theme') === 'dark'
      ? '#0a0e12' : '#dde4d8';
  }
  function getFg3() {
    return document.documentElement.getAttribute('data-theme') === 'dark'
      ? '#2a3e36' : '#8aaa98';
  }

  // IC body dimensions
  const icX = 90, icY = 100, icW = 140, icH = 220;
  const pinCount = 6;
  const pinSpacing = icH / (pinCount + 1);
  const pinLen = 40;

  // Left pins (name, net label)
  const leftPins = ['VCC','GND','GPIO0','SDA','SCL','RST'];
  // Right pins
  const rightPins = ['TX','RX','PWM','INT','ADC','EN'];

  // Current pulses on wires
  let pulses = [];

  function makePulses() {
    pulses = [];
    // left wires
    for (let i = 0; i < pinCount; i++) {
      pulses.push({
        side: 'left', pin: i,
        t: Math.random(),        // position 0..1 along wire
        speed: 0.003 + Math.random() * 0.004,
        active: Math.random() > 0.3
      });
    }
    // right wires
    for (let i = 0; i < pinCount; i++) {
      pulses.push({
        side: 'right', pin: i,
        t: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        active: Math.random() > 0.3
      });
    }
    // extra branch wires going to components
    pulses.push({ side:'branch', branch:0, t: Math.random(), speed:0.005, active:true });
    pulses.push({ side:'branch', branch:1, t: Math.random(), speed:0.004, active:true });
    pulses.push({ side:'branch', branch:2, t: Math.random(), speed:0.006, active:true });
  }
  makePulses();

  function pinY(i) { return icY + pinSpacing * (i + 1); }

  function drawIC(accent, dim, bg, fg3) {
    ctx.clearRect(0, 0, W, H);

    // ── BRANCH WIRES (going to resistors/caps off edges) ──
    // Branch 0: from pin 0 left, goes up to VCC symbol
    const b0x1 = icX - pinLen, b0y = pinY(0);
    const b0x2 = 10;
    ctx.beginPath(); ctx.moveTo(b0x1, b0y); ctx.lineTo(b0x2, b0y);
    ctx.lineTo(b0x2, 30);
    ctx.strokeStyle = dim; ctx.lineWidth = 1.5; ctx.stroke();
    // VCC label
    ctx.font = '9px DM Mono, monospace';
    ctx.fillStyle = fg3; ctx.textAlign = 'center';
    ctx.fillText('VCC', b0x2, 22);
    // arrow up
    ctx.beginPath(); ctx.moveTo(b0x2-4, 28); ctx.lineTo(b0x2, 22); ctx.lineTo(b0x2+4, 28);
    ctx.strokeStyle = dim; ctx.lineWidth = 1; ctx.stroke();

    // Branch 1: from pin 1 left, goes down to GND symbol
    const b1x1 = icX - pinLen, b1y = pinY(1);
    ctx.beginPath(); ctx.moveTo(b1x1, b1y); ctx.lineTo(10, b1y); ctx.lineTo(10, H - 30);
    ctx.strokeStyle = dim; ctx.lineWidth = 1.5; ctx.stroke();
    // GND symbol
    ctx.beginPath(); ctx.moveTo(10, H-30); ctx.lineTo(10, H-22);
    ctx.strokeStyle = dim; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(3, H-22); ctx.lineTo(17, H-22); ctx.strokeStyle = dim; ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(6, H-18); ctx.lineTo(14, H-18); ctx.strokeStyle = dim; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(9, H-14); ctx.lineTo(11, H-14); ctx.strokeStyle = dim; ctx.lineWidth = 1; ctx.stroke();

    // Branch 2: from right pin 0, goes to resistor symbol
    const b2x1 = icX + icW + pinLen, b2y = pinY(0);
    ctx.beginPath(); ctx.moveTo(b2x1, b2y); ctx.lineTo(W-10, b2y);
    ctx.strokeStyle = dim; ctx.lineWidth = 1.5; ctx.stroke();
    // Resistor box at far right
    const rx = W - 36, ry = b2y - 8;
    ctx.strokeStyle = dim; ctx.lineWidth = 1;
    ctx.strokeRect(rx, ry, 26, 16);
    ctx.font = '7px DM Mono, monospace'; ctx.fillStyle = fg3; ctx.textAlign = 'center';
    ctx.fillText('10k', rx+13, ry-3);

    // ── LEFT WIRES ──
    for (let i = 0; i < pinCount; i++) {
      const y = pinY(i);
      const x1 = icX, x2 = icX - pinLen;
      ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y);
      ctx.strokeStyle = dim; ctx.lineWidth = 1.5; ctx.stroke();
      // pin number
      ctx.font = '8px DM Mono, monospace';
      ctx.fillStyle = fg3; ctx.textAlign = 'right';
      ctx.fillText(String(i+1), x2 - 4, y + 3);
      // net label
      ctx.fillStyle = accent; ctx.globalAlpha = 0.7;
      ctx.textAlign = 'right';
      ctx.fillText(leftPins[i], x2 - 14, y + 3);
      ctx.globalAlpha = 1;
      // node dot at IC body
      ctx.beginPath(); ctx.arc(x1, y, 2.5, 0, Math.PI*2);
      ctx.fillStyle = dim; ctx.fill();
    }

    // ── RIGHT WIRES ──
    for (let i = 0; i < pinCount; i++) {
      const y = pinY(i);
      const x1 = icX + icW, x2 = icX + icW + pinLen;
      ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y);
      ctx.strokeStyle = dim; ctx.lineWidth = 1.5; ctx.stroke();
      // pin number
      ctx.font = '8px DM Mono, monospace';
      ctx.fillStyle = fg3; ctx.textAlign = 'left';
      ctx.fillText(String(pinCount*2 - i), x2 + 4, y + 3);
      // net label
      ctx.fillStyle = accent; ctx.globalAlpha = 0.7; ctx.textAlign = 'left';
      ctx.fillText(rightPins[i], x2 + 18, y + 3);
      ctx.globalAlpha = 1;
      ctx.beginPath(); ctx.arc(x1, y, 2.5, 0, Math.PI*2);
      ctx.fillStyle = dim; ctx.fill();
    }

    // ── IC BODY ──
    ctx.fillStyle = bg;
    ctx.fillRect(icX, icY, icW, icH);
    ctx.strokeStyle = accent; ctx.lineWidth = 1.5;
    ctx.strokeRect(icX, icY, icW, icH);

    // notch at top center
    ctx.beginPath();
    ctx.arc(icX + icW/2, icY, 8, Math.PI, 0);
    ctx.strokeStyle = accent; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.fillStyle = bg; ctx.fill();

    // center text
    ctx.textAlign = 'center';
    ctx.font = 'bold 22px Unbounded, sans-serif';
    ctx.fillStyle = accent; ctx.globalAlpha = 0.15;
    ctx.fillText('AA', icX + icW/2, icY + icH/2 - 8);
    ctx.globalAlpha = 1;

    // outline text "AA"
    ctx.font = 'bold 22px Unbounded, sans-serif';
    ctx.strokeStyle = accent; ctx.lineWidth = 1;
    ctx.globalAlpha = 0.9;
    ctx.strokeText('AA', icX + icW/2, icY + icH/2 - 8);
    ctx.globalAlpha = 1;

    ctx.font = '8px DM Mono, monospace';
    ctx.fillStyle = fg3; ctx.globalAlpha = 0.8;
    ctx.fillText('UW-EE-2030', icX + icW/2, icY + icH/2 + 10);
    ctx.fillText('ESP-MCU-v1', icX + icW/2, icY + icH/2 + 22);
    ctx.globalAlpha = 1;

    // ref designator
    ctx.font = '9px DM Mono, monospace';
    ctx.fillStyle = fg3; ctx.textAlign = 'left';
    ctx.fillText('U1', icX + 4, icY + icH - 6);

    // ── CURRENT PULSES ──
    pulses.forEach(p => {
      if (!p.active) return;
      let px, py;
      if (p.side === 'left') {
        const y = pinY(p.pin);
        px = icX - p.t * pinLen;
        py = y;
      } else if (p.side === 'right') {
        const y = pinY(p.pin);
        px = icX + icW + p.t * pinLen;
        py = y;
      } else if (p.side === 'branch') {
        if (p.branch === 0) {
          // VCC branch: left then up
          const totalLen = (icX - pinLen - 10) + (pinY(0) - 30);
          const d = p.t * totalLen;
          if (d < (icX - pinLen - 10)) { px = icX - pinLen - d; py = pinY(0); }
          else { px = 10; py = pinY(0) - (d - (icX - pinLen - 10)); }
        } else if (p.branch === 1) {
          // GND branch
          const totalLen = (icX - pinLen - 10) + (H - 30 - pinY(1));
          const d = p.t * totalLen;
          if (d < (icX - pinLen - 10)) { px = icX - pinLen - d; py = pinY(1); }
          else { px = 10; py = pinY(1) + (d - (icX - pinLen - 10)); }
        } else {
          // Resistor branch
          px = icX + icW + pinLen + p.t * (W - 10 - icX - icW - pinLen);
          py = pinY(0);
        }
      }

      // glow dot
      const grad = ctx.createRadialGradient(px, py, 0, px, py, 7);
      grad.addColorStop(0, accent);
      grad.addColorStop(0.4, accent + '88');
      grad.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI*2);
      ctx.fillStyle = grad; ctx.fill();

      // bright core
      ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI*2);
      ctx.fillStyle = '#ffffff'; ctx.globalAlpha = 0.9; ctx.fill();
      ctx.globalAlpha = 1;
    });
  }

  function animate() {
    const accent = getAccent(), dim = getDim(), bg = getBg(), fg3 = getFg3();
    drawIC(accent, dim, bg, fg3);

    // advance pulses
    pulses.forEach(p => {
      if (!p.active) return;
      p.t += p.speed;
      if (p.t > 1) {
        p.t = 0;
        // randomly deactivate/reactivate
        if (Math.random() < 0.1) p.active = false;
      }
    });
    // randomly reactivate
    pulses.forEach(p => {
      if (!p.active && Math.random() < 0.002) p.active = true;
    });

    requestAnimationFrame(animate);
  }

  window._drawSchem = () => makePulses();
  animate();
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
