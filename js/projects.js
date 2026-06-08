/* ============================================================
   PROJECTS.JS — Project Data & Filtering
   ============================================================ */

'use strict';

const PROJECTS = [
  {
    id: 1,
    title: 'AI Website Generator',
    category: 'ai',
    tags: ['AI', 'GPT-4', 'Node.js', 'React'],
    icon: '🤖',
    color: '#5b6ef5',
    desc: 'An intelligent system that generates complete, production-ready websites from natural language descriptions using GPT-4 and automated deployment pipelines.',
    challenge: 'Translating vague user requirements into structured, functional code while maintaining design consistency and best practices.',
    solution: 'Implemented a multi-step prompt chain with a design system context window that guides GPT-4 to produce consistent, accessible, and performant HTML/CSS/JS output.',
    results: 'Reduced website creation time from days to minutes. Successfully generated 50+ unique websites in testing phase with 90%+ user satisfaction.',
    tech: ['GPT-4 API', 'Node.js', 'React', 'Tailwind CSS', 'Vercel'],
    demo: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'Smart Portfolio Builder',
    category: 'web',
    tags: ['React', 'TypeScript', 'Firebase'],
    icon: '💼',
    color: '#00d4aa',
    desc: 'A drag-and-drop portfolio builder with real-time preview, custom domain support, and AI-powered content suggestions for professionals.',
    challenge: 'Building a real-time collaborative editor with conflict resolution while maintaining sub-100ms response times.',
    solution: 'Used Firebase Realtime Database with operational transformation algorithms for conflict-free collaborative editing.',
    results: 'Acquired 200+ users in beta. Average portfolio creation time: 15 minutes. 85% of users published their portfolio within 24 hours.',
    tech: ['React', 'TypeScript', 'Firebase', 'DnD Kit', 'Framer Motion'],
    demo: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'Trading Dashboard Concept',
    category: 'ai',
    tags: ['Python', 'FastAPI', 'React', 'NSE API'],
    icon: '📈',
    color: '#f5c842',
    desc: 'A comprehensive algorithmic trading dashboard for NSE/BSE markets featuring real-time data, technical indicators, and automated strategy execution.',
    challenge: 'Processing high-frequency market data (thousands of ticks/second) while keeping the UI responsive and ensuring zero data loss.',
    solution: 'Implemented WebSocket streaming with a ring buffer architecture and efficient React virtualization for handling large datasets without performance degradation.',
    results: 'Paper trading phase shows 12% better returns vs benchmark. Handles 10,000+ data points/second with <50ms UI latency.',
    tech: ['Python', 'FastAPI', 'React', 'WebSocket', 'PostgreSQL', 'Redis'],
    demo: '#',
    github: '#',
  },
  {
    id: 4,
    title: 'AI Content Automation System',
    category: 'automation',
    tags: ['Python', 'OpenAI', 'Make.com', 'WordPress'],
    icon: '✍️',
    color: '#8b5cf6',
    desc: 'End-to-end content pipeline that researches trending topics, generates SEO-optimized articles, creates social media variants, and auto-publishes across platforms.',
    challenge: 'Maintaining consistent brand voice across AI-generated content and ensuring factual accuracy without manual review of every piece.',
    solution: 'Built a two-pass AI system: a generator model produces content while a critic model evaluates tone, accuracy, and SEO factors before publication.',
    results: 'Reduced content creation cost by 70%. Produces 50+ SEO articles/week. Average organic traffic increased 3x in 2 months.',
    tech: ['Python', 'OpenAI API', 'Make.com', 'WordPress REST API', 'Buffer API'],
    demo: '#',
    github: '#',
  },
  {
    id: 5,
    title: 'E-Commerce Website',
    category: 'web',
    tags: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind'],
    icon: '🛒',
    color: '#ff6b6b',
    desc: 'Full-stack e-commerce platform with AI-powered product recommendations, real-time inventory management, and seamless Stripe integration.',
    challenge: 'Implementing a recommendation engine that works with limited data for new users (cold start problem) without sacrificing performance.',
    solution: 'Combined collaborative filtering with content-based recommendations and used session data for cold-start users, with Redis caching for sub-10ms response.',
    results: 'Checkout conversion rate improved 28%. AI recommendations drive 35% of sales. Page load under 1.5s on average.',
    tech: ['Next.js 14', 'MongoDB', 'Stripe', 'Redis', 'TensorFlow.js'],
    demo: '#',
    github: '#',
  },
  {
    id: 6,
    title: 'Productivity Management System',
    category: 'automation',
    tags: ['React', 'Electron', 'SQLite', 'AI'],
    icon: '⚡',
    color: '#00d4aa',
    desc: 'Desktop productivity suite featuring AI task prioritization, focus mode with Pomodoro tracking, habit analytics, and cross-app automation workflows.',
    challenge: 'Integrating with 20+ external apps (Notion, Slack, Calendar, GitHub) while maintaining a unified data model and offline-first capability.',
    solution: 'Designed a plugin architecture with standardized adapters for each integration, using SQLite for offline storage with background sync when online.',
    results: 'Personal productivity improved 40% in user studies. 500+ downloads on GitHub. 4.8/5 average rating from beta users.',
    tech: ['React', 'Electron', 'SQLite', 'OpenAI', 'Node.js'],
    demo: '#',
    github: '#',
  },
];

/* ── Render Projects ── */
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(p => `
    <article class="project-card reveal" data-category="${p.category}" onclick="openProjectModal(${p.id})" role="button" tabindex="0" aria-label="View ${p.title} project details">
      <div class="project-thumb">
        <div class="project-thumb-bg" style="background: linear-gradient(135deg, ${p.color}15, ${p.color}05)"></div>
        <div class="project-thumb-icon" style="text-shadow: 0 0 30px ${p.color}80">${p.icon}</div>
        <div class="project-thumb-overlay">
          <button class="btn btn-primary" onclick="event.stopPropagation(); window.open('${p.demo}','_blank')" style="font-size:0.8rem; padding:0.5rem 1rem">
            🚀 Live Demo
          </button>
          <button class="btn btn-outline" onclick="event.stopPropagation(); window.open('${p.github}','_blank')" style="font-size:0.8rem; padding:0.5rem 1rem; color:#fff; border-color:rgba(255,255,255,0.3)">
            ⚡ GitHub
          </button>
        </div>
      </div>
      <div class="project-body">
        <div class="project-tags">
          ${p.tags.slice(0, 3).map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc.slice(0, 110)}…</p>
        <div class="project-links">
          <a href="${p.demo}" class="project-link project-link-demo" target="_blank" rel="noopener" onclick="event.stopPropagation()">🚀 Demo</a>
          <a href="${p.github}" class="project-link project-link-gh" target="_blank" rel="noopener" onclick="event.stopPropagation()">⚡ Code</a>
        </div>
      </div>
    </article>
  `).join('');

  // Re-init reveal
  setTimeout(() => {
    document.querySelectorAll('#projects-grid .reveal').forEach(el => {
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { el.classList.add('visible'); io.unobserve(el); }
      }, { threshold: 0.1 });
      io.observe(el);
    });
  }, 50);
}

/* ── Project Modal ── */
function openProjectModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;

  const modal = document.getElementById('project-modal');
  const content = document.getElementById('project-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="modal-header">
      <div>
        <div style="font-size:2.5rem; margin-bottom:0.5rem">${p.icon}</div>
        <h2 class="text-h2">${p.title}</h2>
        <div class="project-tags" style="margin-top:0.5rem">
          ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
      </div>
      <button class="modal-close" onclick="closeModal('project-modal')" aria-label="Close modal">✕</button>
    </div>
    <div class="modal-body">
      <div style="background:linear-gradient(135deg,${p.color}15,${p.color}05);height:180px;border-radius:var(--r-lg);display:flex;align-items:center;justify-content:center;font-size:5rem;margin-bottom:var(--space-lg)">
        ${p.icon}
      </div>

      <h3 class="text-h3" style="margin-bottom:0.5rem">Overview</h3>
      <p style="color:var(--clr-text-muted);margin-bottom:var(--space-lg)">${p.desc}</p>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md);margin-bottom:var(--space-lg)">
        <div style="padding:var(--space-md);background:rgba(255,107,107,0.06);border:1px solid rgba(255,107,107,0.15);border-radius:var(--r-lg)">
          <h4 style="font-family:var(--font-display);margin-bottom:0.5rem;color:var(--clr-accent2)">⚡ Challenge</h4>
          <p style="font-size:0.875rem;color:var(--clr-text-muted)">${p.challenge}</p>
        </div>
        <div style="padding:var(--space-md);background:rgba(0,212,170,0.06);border:1px solid rgba(0,212,170,0.15);border-radius:var(--r-lg)">
          <h4 style="font-family:var(--font-display);margin-bottom:0.5rem;color:var(--clr-accent)">💡 Solution</h4>
          <p style="font-size:0.875rem;color:var(--clr-text-muted)">${p.solution}</p>
        </div>
      </div>

      <div style="padding:var(--space-md);background:rgba(91,110,245,0.06);border:1px solid rgba(91,110,245,0.15);border-radius:var(--r-lg);margin-bottom:var(--space-lg)">
        <h4 style="font-family:var(--font-display);margin-bottom:0.5rem;color:var(--clr-primary-glow)">🏆 Results</h4>
        <p style="font-size:0.875rem;color:var(--clr-text-muted)">${p.results}</p>
      </div>

      <h3 class="text-h3" style="margin-bottom:var(--space-sm)">Tech Stack</h3>
      <div class="tech-stack" style="justify-content:flex-start;margin-bottom:var(--space-lg)">
        ${p.tech.map(t => `<div class="tech-item"><span class="tech-item-icon">⚙️</span>${t}</div>`).join('')}
      </div>

      <div style="display:flex;gap:var(--space-sm)">
        <a href="${p.demo}" target="_blank" rel="noopener" class="btn btn-primary">🚀 Live Demo</a>
        <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-outline">⚡ View Code</a>
      </div>
    </div>
  `;

  openModal('project-modal');
}

window.openProjectModal = openProjectModal;

/* ── Filter Buttons ── */
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      const grid = document.getElementById('projects-grid');
      if (grid) {
        grid.style.opacity = '0';
        grid.style.transform = 'translateY(10px)';
        setTimeout(() => {
          renderProjects(filter);
          grid.style.transition = 'opacity 0.35s, transform 0.35s';
          grid.style.opacity = '1';
          grid.style.transform = 'translateY(0)';
        }, 200);
      }
    });
  });
});
