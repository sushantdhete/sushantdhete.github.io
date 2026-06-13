/* ============================================================
   MAIN.JS — Core JavaScript
   Portfolio Website
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════
   1. LOADER
   ══════════════════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    }
    // Start page-specific init after load
    initRevealAnimations();
    initCounters();
  }, 2000);
});


/* ══════════════════════════════════════════════════
   2. THEME SYSTEM
   ══════════════════════════════════════════════════ */
const THEME_KEY = 'portfolio-theme';

function getTheme() {
  return localStorage.getItem(THEME_KEY) ||
    (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// Init theme on all pages
applyTheme(getTheme());

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  if (toggle) toggle.addEventListener('click', toggleTheme);
});


/* ══════════════════════════════════════════════════
   3. SCROLL PROGRESS BAR
   ══════════════════════════════════════════════════ */
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
scrollProgress.style.width = '0%';
document.body.prepend(scrollProgress);

window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollProgress.style.width = `${Math.min(pct, 100)}%`;
});


/* ══════════════════════════════════════════════════
   4. NAVBAR
   ══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  // Scroll shrink
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 60);

    // Back to top
    const btt = document.getElementById('back-top');
    if (btt) btt.classList.toggle('visible', window.scrollY > 400);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});


/* ══════════════════════════════════════════════════
   5. TYPING ANIMATION
   ══════════════════════════════════════════════════ */
function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = [
    'AI Developer',
    'Web Developer',
    'Automation Enthusiast',
    'Problem Solver',
    'Future Software Engineer',
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let paused = false;

  function tick() {
    const phrase = phrases[phraseIdx];

    if (paused) {
      paused = false;
      setTimeout(tick, deleting ? 80 : 120);
      return;
    }

    if (!deleting) {
      charIdx++;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx === phrase.length) {
        paused = true;
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      charIdx--;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
    }

    setTimeout(tick, deleting ? 55 : 90);
  }

  tick();
}

document.addEventListener('DOMContentLoaded', initTyping);


/* ══════════════════════════════════════════════════
   6. PARTICLE CANVAS
   ══════════════════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles;

  const resize = () => {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };

  resize();
  window.addEventListener('resize', resize);

  const PARTICLE_COUNT = 80;

  const makeParticle = () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.5 + 0.5,
    a: Math.random() * 0.5 + 0.1,
  });

  particles = Array.from({ length: PARTICLE_COUNT }, makeParticle);

  let mouse = { x: W / 2, y: H / 2 };
  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

  function draw() {
    ctx.clearRect(0, 0, W, H);

    const color = isDark() ? '212, 160, 23' : '212, 160, 23';

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${p.a})`;
      ctx.fill();
    });

    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${color}, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}

document.addEventListener('DOMContentLoaded', initParticles);


/* ══════════════════════════════════════════════════
   7. REVEAL ON SCROLL
   ══════════════════════════════════════════════════ */
function initRevealAnimations() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => io.observe(el));

  // Stagger children
  document.querySelectorAll('.stagger-children').forEach(parent => {
    const io2 = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        parent.classList.add('animate');
        io2.unobserve(parent);
      }
    }, { threshold: 0.1 });
    io2.observe(parent);
  });
}


/* ══════════════════════════════════════════════════
   8. ANIMATED COUNTERS
   ══════════════════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 2000;
      const start = performance.now();

      const step = (now) => {
        const pct = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(easeOut(pct) * target) + suffix;
        if (pct < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });

  counters.forEach(c => io.observe(c));
}


/* ══════════════════════════════════════════════════
   9. SKILL BAR ANIMATION
   ══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = e.target;
        const pct = fill.dataset.pct || '0';
        setTimeout(() => { fill.style.width = pct + '%'; }, 200);
        io.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });

  fills.forEach(f => io.observe(f));
});


/* ══════════════════════════════════════════════════
   10. MODAL SYSTEM
   ══════════════════════════════════════════════════ */
let activeModal = null;

function openModal(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  activeModal = overlay;

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal(id);
  });
}

function closeModal(id) {
  const overlay = id ? document.getElementById(id) : activeModal;
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  activeModal = null;
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && activeModal) closeModal();
});

// Make available globally
window.openModal = openModal;
window.closeModal = closeModal;


/* ══════════════════════════════════════════════════
   11. FORM VALIDATION
   ══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const validators = {
    name: v => v.trim().length >= 2 ? '' : 'Please enter your full name.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email.',
    subject: v => v.trim().length >= 3 ? '' : 'Subject must be at least 3 characters.',
    message: v => v.trim().length >= 20 ? '' : 'Message must be at least 20 characters.',
  };

  function showError(id, msg) {
    const input = document.getElementById(id);
    const err   = document.getElementById(`${id}-error`);
    if (input) input.classList.toggle('error', !!msg);
    if (err)   { err.textContent = msg; err.style.display = msg ? 'block' : 'none'; }
  }

  function validate() {
    let valid = true;
    Object.entries(validators).forEach(([id, fn]) => {
      const el = document.getElementById(id);
      if (!el) return;
      const msg = fn(el.value);
      showError(id, msg);
      if (msg) valid = false;
    });
    return valid;
  }

  // Live validation on blur
  Object.keys(validators).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('blur', () => showError(id, validators[id](el.value)));
      el.addEventListener('input', () => {
        if (el.classList.contains('error')) showError(id, validators[id](el.value));
      });
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;

    const btn = form.querySelector('[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '⏳ Sending…';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = orig;
      btn.disabled = false;
      form.reset();
      showNotification('✅ Message sent! I\'ll get back to you soon.', 'success');
    }, 2000);
  });
});


/* ══════════════════════════════════════════════════
   12. NOTIFICATIONS
   ══════════════════════════════════════════════════ */
function showNotification(message, type = 'info') {
  const n = document.createElement('div');
  n.className = `notification ${type}`;
  n.innerHTML = `<span class="notif-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                 <span class="notif-text">${message}</span>`;
  document.body.appendChild(n);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => n.classList.add('show'));
  });

  setTimeout(() => {
    n.classList.remove('show');
    setTimeout(() => n.remove(), 400);
  }, 4000);
}

window.showNotification = showNotification;


/* ══════════════════════════════════════════════════
   13. AI ASSISTANT WIDGET
   ══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const btn     = document.getElementById('ai-widget-btn');
  const chat    = document.getElementById('ai-chat');
  const input   = document.getElementById('ai-input');
  const sendBtn = document.getElementById('ai-send');
  const msgs    = document.getElementById('ai-messages');

  if (!btn || !chat) return;

  let isOpen = false;
  const botResponses = [
    "Hi! I'm a demo AI assistant. For real AI interaction, explore the projects section! 🤖",
    "Check out my Trading Dashboard project for real-time data processing! 📊",
    "I specialize in AI tools and automation. Let's build something amazing! ✨",
    "Feel free to contact me via the Contact page for collaboration opportunities!",
    "I'm powered by modern web technologies — no backend needed for this demo! 💡",
    "My skill set includes AI, automation, and full-stack development. Ask away!",
  ];
  let responseIdx = 0;

  btn.addEventListener('click', () => {
    isOpen = !isOpen;
    chat.classList.toggle('open', isOpen);
    btn.textContent = isOpen ? '✕' : '🤖';
  });

  function addMessage(text, isUser) {
    const msg = document.createElement('div');
    msg.className = `ai-msg ${isUser ? 'ai-msg-user' : 'ai-msg-bot'}`;
    msg.textContent = text;
    msgs.appendChild(msg);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, true);
    input.value = '';

    setTimeout(() => {
      addMessage(botResponses[responseIdx % botResponses.length], false);
      responseIdx++;
    }, 800);
  }

  sendBtn?.addEventListener('click', sendMessage);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
});


/* ══════════════════════════════════════════════════
   14. BACK TO TOP
   ══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('back-top');
  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});


/* ══════════════════════════════════════════════════
   15. CURSOR EFFECT (desktop only)
   ══════════════════════════════════════════════════ */
if (!('ontouchstart' in window)) {
  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .project-card, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hover'); ring.classList.remove('hover'); });
  });

  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
}


/* ══════════════════════════════════════════════════
   16. VISITOR COUNTER (simulated)
   ══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('visitor-count');
  if (!el) return;

  const base = 1200;
  const stored = parseInt(localStorage.getItem('visit-count') || base.toString(), 10);
  const count = stored + Math.floor(Math.random() * 3);
  localStorage.setItem('visit-count', count.toString());
  el.textContent = count.toLocaleString();
});


/* ══════════════════════════════════════════════════
   17. TESTIMONIALS CAROUSEL
   ══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.testimonials-inner');
  const dots  = document.querySelectorAll('.testimonials-dot');
  if (!track || !dots.length) return;

  let current = 0;
  const getSlideWidth = () => {
    const card = track.querySelector('.testimonial-card');
    if (!card) return 0;
    const style = getComputedStyle(track);
    const gap = parseInt(style.gap || '24', 10);
    return card.offsetWidth + gap;
  };

  const goTo = idx => {
    current = idx;
    const offset = window.innerWidth > 1024 ? 0 : getSlideWidth() * idx;
    track.style.transform = `translateX(-${offset}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  };

  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  goTo(0);

  // Auto-advance
  setInterval(() => goTo((current + 1) % dots.length), 5000);
});


/* ══════════════════════════════════════════════════
   18. SMOOTH ANCHOR LINKS
   ══════════════════════════════════════════════════ */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const target = document.querySelector(a.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  const offset = 80;
  window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
});
