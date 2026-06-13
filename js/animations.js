/* ============================================================
   ANIMATIONS.JS — Page-Specific Interactive Features
   ============================================================ */

'use strict';

/* ── Blog Search ── */
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('blog-search');
  const blogCards   = document.querySelectorAll('.blog-card[data-keywords]');
  if (!searchInput || !blogCards.length) return;

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    blogCards.forEach(card => {
      const keywords = card.dataset.keywords.toLowerCase();
      const title    = card.querySelector('.blog-title')?.textContent.toLowerCase() || '';
      const match    = !q || keywords.includes(q) || title.includes(q);
      card.style.display = match ? '' : 'none';
      card.style.opacity = match ? '1' : '0';
    });
  });
});


/* ── About Page — Mission Words Highlight ── */
document.addEventListener('DOMContentLoaded', () => {
  const highlights = document.querySelectorAll('[data-highlight]');
  highlights.forEach(el => {
    el.style.cursor = 'default';
    el.addEventListener('mouseenter', () => {
      el.style.color = 'var(--clr-primary-glow)';
      el.style.textShadow = '0 0 20px rgba(212,160,23,0.5)';
      el.style.transition = 'all 0.3s';
    });
    el.addEventListener('mouseleave', () => {
      el.style.color = '';
      el.style.textShadow = '';
    });
  });
});


/* ── Cert Card Click → Preview Modal ── */
document.addEventListener('DOMContentLoaded', () => {
  const modal   = document.getElementById('cert-modal');
  const certImg = document.getElementById('cert-preview-img');
  const certName = document.getElementById('cert-modal-name');
  const certIssuer = document.getElementById('cert-modal-issuer');

  document.querySelectorAll('.cert-card[data-cert]').forEach(card => {
    card.addEventListener('click', () => {
      const data = JSON.parse(card.dataset.cert || '{}');
      if (certName)   certName.textContent   = data.name   || 'Certificate';
      if (certIssuer) certIssuer.textContent = data.issuer || '';
      if (certImg) {
        certImg.src = data.img || 'assets/certificates/placeholder.svg';
        certImg.alt = data.name || 'Certificate';
      }
      if (modal) openModal('cert-modal');
    });
  });
});


/* ── Timeline Stagger ── */
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach((e, idx) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateX(0)';
        }, idx * 100);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.5s, transform 0.5s';
    io.observe(item);
  });
});


/* ── Radial Skill Charts (SVG) ── */
document.addEventListener('DOMContentLoaded', () => {
  const rings = document.querySelectorAll('[data-radial]');
  rings.forEach(svg => {
    const circle = svg.querySelector('.progress-ring-circle');
    const pct    = parseInt(svg.dataset.radial || '0', 10);
    const r      = parseInt(circle?.getAttribute('r') || '40', 10);
    const circumference = 2 * Math.PI * r;

    if (circle) {
      circle.style.strokeDasharray  = `${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;

      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            const offset = circumference - (pct / 100) * circumference;
            circle.style.strokeDashoffset = offset;
          }, 300);
          io.unobserve(svg);
        }
      }, { threshold: 0.4 });
      io.observe(svg);
    }
  });
});


/* ── Achievement Tracker ── */
document.addEventListener('DOMContentLoaded', () => {
  const tracker = document.getElementById('achievement-tracker');
  if (!tracker) return;

  const achievements = [
    { id: 'first-project',   label: 'First Project Live',    icon: '🚀', done: true },
    { id: 'ai-certification', label: 'AI Certification',      icon: '🤖', done: true },
    { id: 'open-source',     label: 'Open Source Contributor', icon: '⚡', done: false },
    { id: '100-hours',       label: '100h Learning Logged',   icon: '📚', done: true },
    { id: 'first-collab',    label: 'First Collaboration',    icon: '🤝', done: false },
  ];

  tracker.innerHTML = achievements.map(a => `
    <div class="flex gap-sm" style="align-items:center;padding:0.75rem;border-radius:var(--r-md);background:${a.done ? 'rgba(39,174,96,0.07)' : 'rgba(255,255,255,0.03)'};border:1px solid ${a.done ? 'rgba(39,174,96,0.2)' : 'var(--clr-border)'}">
      <span style="font-size:1.3rem">${a.icon}</span>
      <span style="font-size:0.875rem;flex:1;${!a.done ? 'color:var(--clr-text-muted)' : ''}">${a.label}</span>
      <span style="font-size:0.9rem">${a.done ? '✅' : '⏳'}</span>
    </div>
  `).join('');
});


/* ── Productivity Dashboard Demo ── */
document.addEventListener('DOMContentLoaded', () => {
  const chart = document.getElementById('productivity-chart');
  if (!chart) return;

  const data = [65, 80, 72, 90, 85, 95, 78, 88, 92, 76, 84, 96];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const max = Math.max(...data);

  chart.innerHTML = `
    <div style="display:flex;align-items:flex-end;gap:8px;height:120px;padding:0 0.5rem">
      ${data.map((v, i) => `
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
          <div style="flex:1;display:flex;align-items:flex-end;width:100%">
            <div style="width:100%;background:var(--grad-primary);border-radius:4px 4px 0 0;height:${(v/max)*100}%;min-height:4px;transition:height 1s cubic-bezier(0.4,0,0.2,1) ${i*0.05}s;opacity:0.8" class="bar-animate" data-h="${(v/max)*100}"></div>
          </div>
          <span style="font-size:0.6rem;color:var(--clr-text-dim)">${months[i]}</span>
        </div>
      `).join('')}
    </div>
  `;

  // Animate bars in
  setTimeout(() => {
    chart.querySelectorAll('.bar-animate').forEach(bar => {
      bar.style.height = bar.dataset.h + '%';
    });
  }, 100);
});
