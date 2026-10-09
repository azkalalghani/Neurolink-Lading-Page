/**
 * NEUROLINK - DOM SCRIPTING APPLICATION
 * Built entirely via Document Object Model (DOM) Scripting in script.js
 * Figma Design Reference: Node 94:12215
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. DOM SCRIPTING HELPERS & UTILITIES
  // ==========================================================================

  /**
   * Helper to create DOM elements with attributes, event listeners, and children
   */
  function el(tag, attrs = {}, ...children) {
    const element = document.createElement(tag);

    for (const [key, value] of Object.entries(attrs)) {
      if (value === undefined || value === null) continue;

      if (key.startsWith('on') && typeof value === 'function') {
        const eventName = key.slice(2).toLowerCase();
        element.addEventListener(eventName, value);
      } else if (key === 'className' || key === 'class') {
        element.className = value;
      } else if (key === 'dataset' && typeof value === 'object') {
        for (const [dataKey, dataVal] of Object.entries(value)) {
          element.dataset[dataKey] = dataVal;
        }
      } else if (key === 'innerHTML') {
        element.innerHTML = value;
      } else if (key === 'textContent' || key === 'text') {
        element.textContent = value;
      } else if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else {
        element.setAttribute(key, value);
      }
    }

    for (const child of children.flat(Infinity)) {
      if (child === undefined || child === null || child === false) continue;
      if (typeof child === 'string' || typeof child === 'number') {
        element.appendChild(document.createTextNode(String(child)));
      } else if (child instanceof Node) {
        element.appendChild(child);
      }
    }

    return element;
  }

  /**
   * Helper to create SVG icons inline
   */
  function svgIcon(name, size = 16, color = 'currentColor') {
    const icons = {
      logo: `<svg width="${size}" height="${size}" viewBox="0 0 27 23" fill="none"><path d="M12.3426 1.22005L24.5599 12.9961V19.3181H18.8585V15.2688L9.98485 6.71556H8.14153V19.3181H2.4401V1.22005H12.3426ZM18.8585 7.50064V1.22005H24.5599V7.50064H18.8585Z" fill="${color}"/></svg>`,
      check: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
      calendar: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
      flag: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
      message: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
      file: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
      plus: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
      search: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
      bell: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
      share: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
      chevronRight: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
      chevronDown: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
      filter: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
      hourglass: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>`,
      gitPull: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>`,
      trash: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
      dots: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`,
      menu: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
      close: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
    };

    const span = document.createElement('span');
    span.className = 'icon-svg-wrapper';
    span.style.display = 'inline-flex';
    span.style.alignItems = 'center';
    span.style.justifyContent = 'center';
    span.innerHTML = icons[name] || '';
    return span;
  }

  /**
   * Toast notification helper
   */
  function showToast(message) {
    // let container = document.querySelector('.toast-container');
    // if (!container) {
    //   container = el('div', { className: 'toast-container' });
    //   document.body.appendChild(container);
    // }

    // const toast = el('div', { className: 'toast' },
    //   svgIcon('check', 16, '#24A746'),
    //   el('span', {}, message)
    // );

    // container.appendChild(toast);

    // setTimeout(() => {
    //   toast.style.transition = 'opacity 200ms ease, transform 200ms ease';
    //   toast.style.opacity = '0';
    //   toast.style.transform = 'translateY(10px)';
    //   setTimeout(() => toast.remove(), 200);
    // }, 3200);
  }

  // ==========================================================================
  // 2. HEADER COMPONENT (Navigation)
  // ==========================================================================

  function createHeader() {
    let mobileOpen = false;

    const toggleBtn = el('button', {
      className: 'mobile-menu-toggle',
      'aria-label': 'Toggle navigation menu',
      onclick: () => toggleMobile(!mobileOpen)
    }, svgIcon('menu', 20));

    const mobileDrawer = el('div', { className: 'mobile-nav-drawer' },
      el('a', {
        href: '#features',
        className: 'mobile-nav-link',
        onclick: () => toggleMobile(false)
      }, 'Features'),
      el('a', {
        href: '#views',
        className: 'mobile-nav-link',
        onclick: () => toggleMobile(false)
      }, 'Views'),
      el('a', {
        href: '#workflows',
        className: 'mobile-nav-link',
        onclick: () => toggleMobile(false)
      }, 'Workflows'),
      el('a', {
        href: '#pricing',
        className: 'mobile-nav-link',
        onclick: () => toggleMobile(false)
      }, 'Pricing'),
      el('div', { className: 'mobile-nav-divider' }),
      el('button', {
        className: 'btn-ghost mobile-btn',
        onclick: () => {
          toggleMobile(false);
          showToast('Opening login portal...');
        }
      }, 'Log in'),
      el('button', {
        className: 'btn-primary mobile-btn',
        onclick: () => {
          toggleMobile(false);
          const emailInput = document.querySelector('.hero-input');
          if (emailInput) {
            emailInput.focus();
            emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            showToast('Welcome to Neurolink! Enter your email to begin.');
          }
        }
      }, 'Get Started')
    );

    function toggleMobile(open) {
      mobileOpen = open;
      if (mobileOpen) {
        mobileDrawer.classList.add('open');
        toggleBtn.innerHTML = '';
        toggleBtn.appendChild(svgIcon('close', 20));
      } else {
        mobileDrawer.classList.remove('open');
        toggleBtn.innerHTML = '';
        toggleBtn.appendChild(svgIcon('menu', 20));
      }
    }

    return el('header', { className: 'top-navbar' },
      el('div', { className: 'nav-inner' },
        // Brand
        el('a', { href: '#', className: 'nav-brand' },
          el('img', { src: 'assets/logo.png', alt: 'Neurolink', className: 'nav-logo-img', width: 28, height: 28 }),
          el('span', {}, 'Neurolink')
        ),

        // Navigation Links
        el('nav', { className: 'nav-links' },
          el('a', { href: '#features', className: 'nav-link' }, 'Features'),
          el('a', { href: '#views', className: 'nav-link' }, 'Views'),
          el('a', { href: '#workflows', className: 'nav-link' }, 'Workflows'),
          el('a', { href: '#pricing', className: 'nav-link' }, 'Pricing')
        ),

        // Actions
        el('div', { className: 'nav-actions' },
          el('button', {
            className: 'btn-ghost',
            onclick: () => showToast('Opening login portal...')
          }, 'Log in'),
          el('button', {
            className: 'btn-primary',
            onclick: () => {
              const emailInput = document.querySelector('.hero-input');
              if (emailInput) {
                emailInput.focus();
                emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
              } else {
                showToast('Welcome to Neurolink! Enter your email to begin.');
              }
            }
          }, 'Get Started'),
          toggleBtn
        )
      ),
      mobileDrawer
    );
  }

  // ==========================================================================
  // 3. HERO SECTION WITH FIXED DASHBOARD PICTURE SHOWCASE
  // ==========================================================================

  function createHeroDashboardImage() {
    return el('div', { className: 'hero-dashboard-frame' },
      el('picture', {},
        el('source', { srcset: 'assets/Task Management Dashboard (Board).webp', type: 'image/webp' }),
        el('img', {
          src: 'assets/Task Management Dashboard (Board).webp',
          alt: 'Neurolink Task Management Dashboard',
          className: 'hero-dashboard-img',
          loading: 'eager',
          decoding: 'async',
          fetchpriority: 'high',
          width: 1152,
          height: 615
        })
      )
    );
  }

  function createHeroSection() {
    // Email Form
    const emailInput = el('input', {
      type: 'email',
      className: 'hero-input',
      placeholder: 'Enter your work email',
      required: true
    });

    const form = el('form', {
      className: 'hero-form',
      onsubmit: (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        if (email) {
          showToast(`🚀 Free workspace link sent to ${email}`);
          emailInput.value = '';
        }
      }
    },
      emailInput,
      el('button', { type: 'submit', className: 'hero-submit' }, 'Start Free Workspace')
    );

    // Trust Row
    const trustRow = el('div', { className: 'hero-trust-row' },
      el('div', { className: 'trust-item' }, 'Free forever for individuals'),
      el('span', { className: 'trust-dot' }),
      el('div', { className: 'trust-item' }, 'No credit card required'),
      el('span', { className: 'trust-dot' }),
      el('div', { className: 'trust-item' }, 'Real-time sync')
    );

    // Dashboard Fixed Picture Mockup
    const dashboard = createHeroDashboardImage();

    return el('section', { className: 'hero-section' },
      el('h1', { className: 'hero-heading' },
        'Your tasks, notes, and workflows.',
        el('span', { className: 'hero-editorial' }, 'Structured your way.')
      ),
      el('p', { className: 'hero-subhead' },
        'Escape rigid to-do apps. Combine fluid markdown notes, draggable block checklists, and multi-view databases inside a single, calm workspace.'
      ),
      el('div', { className: 'hero-form-wrapper' }, form),
      trustRow,
      el('div', { className: 'hero-dashboard-container' }, dashboard)
    );
  }

  // ==========================================================================
  // 4. TRUST STRIP / SOCIAL PROOF
  // ==========================================================================

  function createTrustStrip() {
    const brands = ['Linear', 'Raycast', 'Vercel', 'Supabase', 'Loom'];

    return el('section', { className: 'trust-strip-section' },
      el('div', { className: 'container' },
        el('div', { className: 'trust-strip-label' },
          'TRUSTED BY 40,000+ MAKERS, DESIGNERS, AND ENGINEERING TEAMS'
        ),
        el('div', { className: 'trust-logos' },
          brands.map(name => el('div', { className: 'trust-logo-item' },
            el('span', {}, name)
          ))
        )
      )
    );
  }

  // ==========================================================================
  // 5. BENTO GRID FEATURES
  // ==========================================================================

  function createBentoSection() {
    // Card 1: Everything is a block
    const card1 = el('div', { className: 'bento-card' },
      el('div', { className: 'bento-card-header' },
        el('span', { className: 'bento-card-tag' }, 'Block System'),
        el('h3', { className: 'bento-card-title' }, 'Everything is a drag-and-drop block'),
        el('p', { className: 'bento-card-desc' },
          'Nest checklists, embed markdown code blocks, or convert any paragraph into an actionable task with its own due date and assignee.'
        )
      ),
      el('div', { className: 'bento-drag-demo' },
        el('div', { className: 'drag-item' },
          el('span', {}, '1. Prototype user onboarding journey'),
          el('span', { className: 'badge-tag badge-uiux' }, 'In Design')
        ),
        el('div', { className: 'drag-ghost' },
          svgIcon('plus', 14, 'var(--accent-blue)'),
          'Drop block to reorganize priority'
        ),
        el('div', { className: 'drag-item' },
          el('span', {}, '2. Architecture review with engineering'),
          el('span', { className: 'badge-tag badge-dev' }, 'Review')
        )
      )
    );

    // Card 2: Instant Slash Commands
    const slashInput = el('input', {
      type: 'text',
      className: 'key-badge',
      style: { width: '100%', padding: '7px 10px', marginTop: '10px' },
      placeholder: 'Type / to test command palette...',
      oninput: (e) => {
        if (e.target.value.includes('/')) {
          showToast('⚡ Command palette triggered: [/todo, /date, /flag, /page]');
        }
      }
    });

    const card2 = el('div', { className: 'bento-card' },
      el('div', { className: 'bento-card-header' },
        el('span', { className: 'bento-card-tag' }, 'Keyboard Speed'),
        el('h3', { className: 'bento-card-title' }, 'Slash commands at thought speed'),
        el('p', { className: 'bento-card-desc' },
          'Press "/" to summon checklists, deadlines, priority flags, or sub-pages instantly.'
        )
      ),
      el('div', { className: 'bento-slash-demo' },
        el('div', { className: 'slash-row-header' },
          el('span', {}, 'Action'),
          el('span', {}, 'Shortcut')
        ),
        el('div', { className: 'slash-row' },
          el('div', { className: 'slash-row-left' }, svgIcon('check', 13), 'Checklist'),
          el('span', { className: 'key-badge' }, '/todo')
        ),
        el('div', { className: 'slash-row' },
          el('div', { className: 'slash-row-left' }, svgIcon('calendar', 13), 'Deadline'),
          el('span', { className: 'key-badge' }, '/date')
        ),
        el('div', { className: 'slash-row' },
          el('div', { className: 'slash-row-left' }, svgIcon('flag', 13), 'Priority'),
          el('span', { className: 'key-badge' }, '/flag')
        ),
        el('div', { className: 'slash-row' },
          el('div', { className: 'slash-row-left' }, svgIcon('file', 13), 'Sub-page'),
          el('span', { className: 'key-badge' }, '/page')
        ),
        slashInput
      )
    );

    // Card 3: Custom Properties
    const card3 = el('div', { className: 'bento-card' },
      el('div', { className: 'bento-card-header' },
        el('span', { className: 'bento-card-tag' }, 'Metadata'),
        el('h3', { className: 'bento-card-title' }, 'Rich, customizable properties'),
        el('p', { className: 'bento-card-desc' },
          'Assign multi-select tags, estimate hours, set recurrence, or attach contextual files.'
        )
      ),
      el('div', { className: 'bento-props-demo' },
        el('div', { className: 'prop-box' },
          el('div', { className: 'prop-label' }, 'Customize Tags'),
          el('div', { className: 'prop-tags-row' },
            el('span', { className: 'badge-tag badge-dev' }, 'Development'),
            el('span', { className: 'badge-tag badge-uiux' }, 'UI/UX'),
            el('span', { className: 'badge-tag badge-mobile' }, 'Mobile'),
            el('span', { className: 'badge-tag badge-dev' }, 'Frontend'),
            el('span', { className: 'badge-tag badge-uiux' }, 'Research')
          )
        ),
        el('div', { className: 'prop-box' },
          el('div', { className: 'prop-label' }, 'Deadlines & Timing'),
          el('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
            el('div', { className: 'deadline-pill' }, svgIcon('hourglass', 12), '5 hours left'),
            el('div', { className: 'deadline-pill' }, svgIcon('calendar', 12), '12 / 04 / 2026'),
            el('div', { className: 'deadline-pill' }, svgIcon('flag', 12, 'var(--accent-blue)'), 'Sprint Cycle')
          )
        )
      )
    );

    // Card 4: Multi-View Engine
    const miniContentArea = el('div', { className: 'mini-kanban-row' });

    function renderMiniView(viewType) {
      miniContentArea.innerHTML = '';
      if (viewType === 'board') {
        miniContentArea.className = 'mini-kanban-row';
        miniContentArea.append(
          el('div', { className: 'mini-col' },
            el('div', { className: 'mini-col-header' }, 'To Do', '2'),
            el('div', { className: 'mini-card' }, 'Mobile viewport...'),
            el('div', { className: 'mini-card' }, 'Copy draft for hero')
          ),
          el('div', { className: 'mini-col' },
            el('div', { className: 'mini-col-header' }, 'In Progress', '1'),
            el('div', { className: 'mini-card' }, 'SAML SSO config')
          ),
          el('div', { className: 'mini-col' },
            el('div', { className: 'mini-col-header' }, 'Complete', '3'),
            el('div', { className: 'mini-card', style: { textDecoration: 'line-through', opacity: '0.7' } }, 'Design system spec')
          )
        );
      } else if (viewType === 'list') {
        miniContentArea.className = '';
        miniContentArea.style.display = 'flex';
        miniContentArea.style.flexDirection = 'column';
        miniContentArea.style.gap = '6px';
        [
          'Mobile viewport fixes [High]',
          'Copy draft for hero section [Medium]',
          'SAML SSO configuration [In Review]',
          'Design system spec documentation [Completed]'
        ].forEach(item => {
          miniContentArea.appendChild(
            el('div', { className: 'mini-card', style: { display: 'flex', alignItems: 'center', gap: '8px' } },
              svgIcon('check', 12), item
            )
          );
        });
      } else if (viewType === 'calendar') {
        miniContentArea.className = '';
        miniContentArea.style.display = 'grid';
        miniContentArea.style.gridTemplateColumns = 'repeat(4, 1fr)';
        miniContentArea.style.gap = '6px';
        ['Mon 16', 'Tue 17', 'Wed 18', 'Thu 19'].forEach((day, i) => {
          miniContentArea.appendChild(
            el('div', { className: 'mini-col', style: { textAlign: 'center', padding: '6px' } },
              el('strong', { style: { fontSize: '10px' } }, day),
              el('div', { className: 'mini-card', style: { fontSize: '9px', marginTop: '4px' } }, i === 1 ? 'Sprint End' : '2 tasks')
            )
          );
        });
      }
    }

    renderMiniView('board');

    const viewTabs = ['List', 'Board', 'Calendar'].map(tabName => {
      const btn = el('button', {
        className: `view-btn ${tabName === 'Board' ? 'active' : ''}`,
        onclick: (e) => {
          document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderMiniView(tabName.toLowerCase());
        }
      }, tabName);
      return btn;
    });

    const card4 = el('div', { className: 'bento-card' },
      el('div', { className: 'bento-card-header' },
        el('span', { className: 'bento-card-tag' }, 'Databases'),
        el('h3', { className: 'bento-card-title' }, 'One database. Unlimited visual views.'),
        el('p', { className: 'bento-card-desc' },
          'Switch seamlessly from a clean checklist to an agile Kanban board or a timeline calendar without re-entering your tasks.'
        )
      ),
      el('div', { className: 'bento-views-demo' },
        el('div', { className: 'view-switcher-bar' }, ...viewTabs),
        miniContentArea
      )
    );

    return el('section', { id: 'features', className: 'bento-section' },
      el('div', { className: 'bento-header' },
        el('span', { className: 'section-tag' }, 'MODULAR ARCHITECTURE'),
        el('h2', { className: 'section-title' }, 'Built like building blocks. Flexible like paper.'),
        el('p', { className: 'section-desc' },
          'Everything in Neurolink is an atomic block. Turn notes into action items, and checklists into multi-column Kanban pipelines in two keystrokes.'
        )
      ),
      el('div', { className: 'bento-grid' }, card1, card2, card3, card4)
    );
  }

  // ==========================================================================
  // 6. INTERACTIVE IN-PAGE DEMO PLAYGROUND
  // ==========================================================================

  function createPlaygroundSection() {
    let tasks = [
      { id: 1, text: 'Design review with engineering', completed: true },
      { id: 2, text: 'Implement responsive DOM breakpoints', completed: false },
      { id: 3, text: 'Deploy to production on Railway', completed: false }
    ];

    const tasksList = el('div', { className: 'playground-tasks-list' });
    const progressBadge = el('span', { className: 'task-progress-badge' });

    function updateProgress() {
      const completedCount = tasks.filter(t => t.completed).length;
      progressBadge.textContent = `${completedCount} of ${tasks.length} tasks completed`;
    }

    function renderTasks() {
      tasksList.innerHTML = '';

      tasks.forEach(task => {
        const checkbox = el('div', {
          className: `task-checkbox ${task.completed ? 'checked' : ''}`,
          onclick: () => {
            task.completed = !task.completed;
            renderTasks();
            updateProgress();
            showToast(task.completed ? 'Marked task as completed!' : 'Marked task as pending');
          }
        }, task.completed ? svgIcon('check', 12, '#FFFFFF') : null);

        const taskText = el('span', {
          className: `task-text ${task.completed ? 'completed' : ''}`,
          onclick: () => {
            task.completed = !task.completed;
            renderTasks();
            updateProgress();
          }
        }, task.text);

        const deleteBtn = el('button', {
          className: 'task-delete-btn',
          title: 'Delete task',
          onclick: () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
            updateProgress();
            showToast('Task removed');
          }
        }, svgIcon('trash', 14));

        const item = el('div', { className: 'playground-task-item' },
          el('div', { className: 'task-left' }, checkbox, taskText),
          el('div', { className: 'task-actions' },
            el('span', {
              className: `badge-tag ${task.completed ? 'badge-uiux' : 'badge-dev'}`
            }, task.completed ? 'Done' : 'Active'),
            deleteBtn
          )
        );

        tasksList.appendChild(item);
      });

      updateProgress();
    }

    renderTasks();

    const addInput = el('input', {
      type: 'text',
      className: 'add-task-input',
      placeholder: "Type a task and hit Enter (e.g. 'Audit contrast ratios')...",
      onkeydown: (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const val = addInput.value.trim();
          if (val) {
            tasks.push({
              id: Date.now(),
              text: val,
              completed: false
            });
            addInput.value = '';
            renderTasks();
            showToast(`Added: "${val}"`);
          }
        }
      }
    });

    const addRow = el('div', { className: 'add-task-row' },
      el('span', { className: 'add-task-icon' }, svgIcon('plus', 16)),
      addInput
    );

    return el('section', { id: 'views', className: 'playground-section' },
      el('div', { className: 'playground-card' },
        el('div', { className: 'playground-header' },
          el('div', {},
            el('h3', { className: 'playground-title' }, 'Test Drive Neurolink Right Here'),
            el('p', { className: 'playground-subtitle' },
              'Click checkboxes, type new items, or switch views below. No sign-up needed.'
            )
          ),
          progressBadge
        ),
        tasksList,
        addRow
      )
    );
  }

  // ==========================================================================
  // 7. PERSONA & WORKFLOW SWITCHER
  // ==========================================================================

  function createPersonaSection() {
    const personas = {
      developer: {
        tab: 'For Developers',
        tag: 'Sprint Focus',
        title: 'Sprint velocity without context switching',
        desc: 'Pair code snippets with interactive sub-tasks, tag GitHub PRs directly on items, and convert bugs into backlog triage queues.',
        items: [
          { icon: 'gitPull', text: 'refactor: optimize token payload in auth middleware', status: 'Merged', statusCls: 'badge-uiux' },
          { icon: 'flag', text: 'fix(cli): hydration flicker on cold launch', status: 'High Priority', statusCls: 'badge-dev' },
          { icon: 'file', text: 'Draft architecture memo for edge storage sync', status: 'In Review', statusCls: 'badge-mobile' }
        ]
      },
      designer: {
        tab: 'For Designers',
        tag: 'Design Systems',
        title: 'Figma frames to living design tokens',
        desc: 'Map typography scales, color palettes, and component states right beside sprint tasks. Review asset pipelines collaboratively.',
        items: [
          { icon: 'file', text: 'Design System v2.4 component library audit', status: 'Approved', statusCls: 'badge-uiux' },
          { icon: 'flag', text: 'Contrast tokens for WCAG AAA compliance', status: 'In Design', statusCls: 'badge-dev' },
          { icon: 'gitPull', text: 'Mobile app dark theme wireframes review', status: 'Ready for Dev', statusCls: 'badge-mobile' }
        ]
      },
      freelancer: {
        tab: 'For Freelancers',
        tag: 'Client Velocity',
        title: 'Deliverables, scopes, and invoices in one place',
        desc: 'Track scope creep with client-facing boards, calculate billable milestones automatically, and share frictionless view-only links.',
        items: [
          { icon: 'file', text: 'Q4 Brand Identity Milestone 2 delivery', status: 'Paid', statusCls: 'badge-uiux' },
          { icon: 'flag', text: 'Scope amendment for iOS native build', status: 'Signed', statusCls: 'badge-dev' },
          { icon: 'gitPull', text: 'Weekly status review & client async Loom', status: 'Scheduled', statusCls: 'badge-mobile' }
        ]
      },
      dailylife: {
        tab: 'For Daily Life',
        tag: 'Calm Routines',
        title: 'Habits, reading lists, and quiet journal entries',
        desc: 'Clear mental fog with minimalist daily checklists, recurring workout routines, and distraction-free markdown journal pages.',
        items: [
          { icon: 'check', text: 'Read 2 chapters of Designing Data-Intensive Apps', status: 'Done', statusCls: 'badge-uiux' },
          { icon: 'flag', text: 'Weekly morning mobility routine (4/5 days)', status: 'Active', statusCls: 'badge-dev' },
          { icon: 'calendar', text: 'Weekend family retreat itinerary & checklist', status: 'Planned', statusCls: 'badge-mobile' }
        ]
      }
    };

    let activeKey = 'developer';

    const cardContainer = el('div', { className: 'persona-content-card' });

    function renderPersonaCard(key) {
      const p = personas[key];
      cardContainer.innerHTML = '';

      const left = el('div', { className: 'persona-info' },
        el('span', { className: 'persona-tag' }, p.tag),
        el('h3', { className: 'persona-title' }, p.title),
        el('p', { className: 'persona-desc' }, p.desc)
      );

      const right = el('div', { className: 'persona-visual' },
        p.items.map(item => el('div', { className: 'persona-preview-item' },
          el('div', { className: 'preview-left' },
            svgIcon(item.icon, 15, 'var(--text-secondary)'),
            el('span', {}, item.text)
          ),
          el('span', { className: `badge-tag ${item.statusCls}` }, item.status)
        ))
      );

      cardContainer.append(left, right);
    }

    renderPersonaCard(activeKey);

    const tabsRow = el('div', { className: 'persona-tabs' });

    Object.entries(personas).forEach(([key, p]) => {
      const tabBtn = el('button', {
        className: `persona-tab ${key === activeKey ? 'active' : ''}`,
        onclick: () => {
          activeKey = key;
          tabsRow.querySelectorAll('.persona-tab').forEach(t => t.classList.remove('active'));
          tabBtn.classList.add('active');
          renderPersonaCard(key);
        }
      }, p.tab);
      tabsRow.appendChild(tabBtn);
    });

    return el('section', { id: 'workflows', className: 'persona-section' },
      el('div', { className: 'persona-header' },
        el('span', { className: 'section-tag' }, 'ADAPTABLE WORKFLOWS'),
        el('h2', { className: 'section-title' }, 'Designed for whoever you are today'),
        el('p', { className: 'section-desc' },
          'No rigid paradigms. Whether you code systems, craft visuals, manage clients, or organize home projects.'
        )
      ),
      tabsRow,
      cardContainer
    );
  }

  // ==========================================================================
  // 8. TESTIMONIALS / WALL OF LOVE
  // ==========================================================================

  function createTestimonialsSection() {
    const reviews = [
      {
        quote: '“Neurolink replaced three separate apps: my scratchpad notes, Todoist, and Trello boards. The slash command flow lets me plan sprints without leaving the keyboard.”',
        name: 'Arjun Kapoor',
        role: 'Staff Engineer, VectorFlow',
        avatar: 'assets/avatar1.png'
      },
      {
        quote: '“The typography and warm paper tones make it feel like writing in a Midori journal, but with instantaneous multi-view database capabilities.”',
        name: 'Elena Lindqvist',
        role: 'Principal Designer, Studio Form',
        avatar: 'assets/avatar2.png'
      },
      {
        quote: '“The lack of bloated features is the feature. Everything is an atomic block. My client delivery tracking has never felt this calm and systematic.”',
        name: 'Marcus Vance',
        role: 'Independent Systems Consultant',
        avatar: 'assets/avatar3.png'
      },
      {
        quote: '“The block nesting combined with clean markdown export is a game changer for technical specs, backlog grooming, and system architecture.”',
        name: 'Josh Miller',
        role: 'Head of Product, NorthStar',
        avatar: 'assets/josh.png'
      },
      {
        quote: '“We ditched our bloated enterprise wiki and migrated our entire roadmap here in an afternoon. Fast, offline-ready, and calm.”',
        name: 'Sarah Chen',
        role: 'Founder, HyperScale Studio',
        avatar: 'assets/user1.png'
      },
      {
        quote: '“Finally an editor that respects pure speed. Keyboard navigation is instantaneous and real-time sync never conflicts.”',
        name: 'David Park',
        role: 'Engineering Lead, Kernel Labs',
        avatar: 'assets/user2.png'
      }
    ];

    const cardElements = reviews.map(r => el('div', { className: 'testimonial-card' },
      el('p', { className: 'testimonial-quote' }, r.quote),
      el('div', { className: 'testimonial-author' },
        el('img', { src: r.avatar, alt: r.name, className: 'testimonial-avatar', loading: 'lazy' }),
        el('div', {},
          el('div', { className: 'author-name' }, r.name),
          el('div', { className: 'author-role' }, r.role)
        )
      )
    ));

    const track = el('div', { className: 'testimonials-track' }, ...cardElements);

    let currentSlide = 0;
    let autoSwipeInterval = null;
    let scrollTimeout = null;
    let userInteracting = false;
    let isVisible = true;
    let dots = [];
    let cardOffsets = [];

    const controls = el('div', { className: 'testimonials-controls' });

    function getVisibleCount() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function getTotalSlides() {
      const visible = getVisibleCount();
      return Math.ceil(reviews.length / visible);
    }

    function updateActiveDot(slideIdx) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === slideIdx);
      });
    }

    function measureOffsets() {
      if (!cardElements[0] || !track.offsetParent) return;
      const trackLeft = track.offsetLeft;
      cardOffsets = cardElements.map(c => c.offsetLeft - trackLeft);
    }

    function scrollToSlide(slideIdx, smooth = true) {
      const visible = getVisibleCount();
      const totalSlides = getTotalSlides();
      const validSlide = Math.max(0, Math.min(slideIdx, totalSlides - 1));
      currentSlide = validSlide;

      const targetCardIndex = Math.min(validSlide * visible, reviews.length - 1);
      if (cardOffsets.length === 0) measureOffsets();
      const targetLeft = cardOffsets[targetCardIndex] || 0;

      track.scrollTo({
        left: targetLeft,
        behavior: smooth ? 'smooth' : 'auto'
      });
      updateActiveDot(validSlide);
    }

    function renderDots() {
      controls.innerHTML = '';
      dots = [];
      const totalSlides = getTotalSlides();

      if (currentSlide >= totalSlides) {
        currentSlide = totalSlides - 1;
      }

      for (let s = 0; s < totalSlides; s++) {
        const dot = el('button', {
          className: `testimonial-dot ${s === currentSlide ? 'active' : ''}`,
          'aria-label': `Go to slide ${s + 1} of ${totalSlides}`,
          onclick: () => {
            userInteracting = true;
            scrollToSlide(s, true);
            resetCooldown();
          }
        });
        dots.push(dot);
        controls.appendChild(dot);
      }
    }

    // Initial render of dots matching the current screen breakpoint
    renderDots();

    const wrapper = el('div', { className: 'testimonials-carousel-wrapper' },
      track,
      controls
    );

    function nextSlide() {
      const totalSlides = getTotalSlides();
      const nextSlideIdx = (currentSlide + 1) % totalSlides;
      scrollToSlide(nextSlideIdx, true);
    }

    function startAutoSwipe() {
      stopAutoSwipe();
      autoSwipeInterval = setInterval(() => {
        if (!userInteracting && isVisible) {
          nextSlide();
        }
      }, 2500); // Swipe every 2.5 seconds
    }

    function stopAutoSwipe() {
      if (autoSwipeInterval) {
        clearInterval(autoSwipeInterval);
        autoSwipeInterval = null;
      }
    }

    function resetCooldown() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        userInteracting = false;
        startAutoSwipe();
      }, 2500);
    }

    // Throttled scroll listener using cached offsets to prevent forced reflows
    let scrollRaf = null;
    track.addEventListener('scroll', () => {
      userInteracting = true;
      resetCooldown();

      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = null;
        const currentScroll = track.scrollLeft;
        const visible = getVisibleCount();
        const totalSlides = getTotalSlides();
        let closestSlide = 0;
        let closestDist = Infinity;

        if (cardOffsets.length === 0) measureOffsets();

        for (let s = 0; s < totalSlides; s++) {
          const targetCardIndex = Math.min(s * visible, reviews.length - 1);
          const targetLeft = cardOffsets[targetCardIndex] || 0;
          const dist = Math.abs(currentScroll - targetLeft);
          if (dist < closestDist) {
            closestDist = dist;
            closestSlide = s;
          }
        }

        if (closestSlide !== currentSlide) {
          currentSlide = closestSlide;
          updateActiveDot(closestSlide);
        }
      });
    }, { passive: true });

    // Touch events for mobile
    track.addEventListener('touchstart', () => {
      userInteracting = true;
      stopAutoSwipe();
    }, { passive: true });

    track.addEventListener('touchend', () => {
      resetCooldown();
    }, { passive: true });

    // Desktop hover pause
    track.addEventListener('mouseenter', () => {
      userInteracting = true;
    });

    track.addEventListener('mouseleave', () => {
      userInteracting = false;
    });

    // Desktop drag-to-scroll support
    let isMouseDown = false;
    let startX = 0;
    let scrollStart = 0;
    let cachedTrackLeft = 0;

    track.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      userInteracting = true;
      stopAutoSwipe();
      cachedTrackLeft = track.offsetLeft;
      startX = e.pageX - cachedTrackLeft;
      scrollStart = track.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (isMouseDown) {
        isMouseDown = false;
        resetCooldown();
      }
    });

    track.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - cachedTrackLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollStart - walk;
    });

    // Window resize listener: recompute cached offsets and dots
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        measureOffsets();
        renderDots();
        scrollToSlide(currentSlide, false);
      }, 150);
    });

    // Delay initial measurements past first frame to avoid forced reflow
    requestAnimationFrame(() => {
      setTimeout(() => {
        measureOffsets();
        startAutoSwipe();
      }, 50);
    });

    // IntersectionObserver to pause when offscreen
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.1 });
      observer.observe(wrapper);
    }

    // VisibilityChange to pause when user switches browser tabs
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
    });

    return el('section', { className: 'testimonials-section' },
      el('span', { className: 'section-tag' }, 'WALL OF LOVE'),
      el('h2', { className: 'section-title' }, 'Loved by people who think in structure'),
      wrapper
    );
  }

  // ==========================================================================
  // 9. TRANSPARENT PRICING
  // ==========================================================================

  function createPricingSection() {
    let isAnnual = true;

    const pricingContainer = el('div', { className: 'pricing-grid' });

    function renderPricing() {
      pricingContainer.innerHTML = '';

      const tiers = [
        {
          name: 'Individual',
          price: '$0',
          period: '/ forever',
          desc: 'Perfect for daily tasks and personal life organization.',
          features: [
            'Unlimited blocks & checklists',
            'Board, List, and Calendar views',
            '5 MB file uploads',
            '7-day revision history'
          ],
          cta: 'Get Started Free',
          featured: false
        },
        {
          name: 'Pro',
          price: isAnnual ? '$8' : '$10',
          period: isAnnual ? '/ month billed annually' : '/ month billed monthly',
          desc: 'For power users who need deep search, recurring logic, and AI breakdowns.',
          features: [
            'Everything in Individual',
            'Unlimited file uploads',
            'Automated recurring subtasks',
            'AI Task Decomposer & Summarizer',
            '30-day version history'
          ],
          cta: 'Start 14-Day Pro Trial',
          featured: true
        },
        {
          name: 'Team',
          price: isAnnual ? '$16' : '$20',
          period: isAnnual ? '/ seat / month billed annually' : '/ seat / month billed monthly',
          desc: 'For micro-studios and agile squads managing deliverables together.',
          features: [
            'Everything in Pro',
            'Shared team workspaces & permissions',
            'Real-time multi-cursor collaboration',
            'Admin controls & SAML SSO'
          ],
          cta: 'Contact Sales',
          featured: false
        }
      ];

      tiers.forEach(t => {
        const card = el('div', { className: `pricing-card ${t.featured ? 'featured' : ''}` },
          t.featured ? el('div', { className: 'featured-pill' }, 'MOST POPULAR') : null,
          el('div', {},
            el('h3', { className: 'pricing-tier-name' }, t.name),
            el('div', { className: 'pricing-price-row' },
              el('span', { className: 'price-number' }, t.price),
              el('span', { className: 'price-period' }, t.period)
            ),
            el('p', { className: 'pricing-desc' }, t.desc),
            el('ul', { className: 'pricing-features-list' },
              t.features.map(f => el('li', { className: 'feature-item' },
                svgIcon('check', 14, 'var(--accent-blue)'),
                el('span', {}, f)
              ))
            )
          ),
          el('button', {
            className: 'btn-pricing-cta',
            onclick: () => showToast(`Selected ${t.name} plan. Redirecting to onboarding...`)
          }, t.cta)
        );

        pricingContainer.appendChild(card);
      });
    }

    renderPricing();

    const billingToggle = el('div', { className: 'pricing-billing-toggle' },
      el('button', {
        className: `billing-opt ${!isAnnual ? 'active' : ''}`,
        onclick: (e) => {
          isAnnual = false;
          billingToggle.querySelectorAll('.billing-opt').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          renderPricing();
        }
      }, 'Monthly'),
      el('button', {
        className: `billing-opt ${isAnnual ? 'active' : ''}`,
        onclick: (e) => {
          isAnnual = true;
          billingToggle.querySelectorAll('.billing-opt').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          renderPricing();
        }
      }, 'Annual', el('span', { className: 'discount-tag' }, 'Save 20%'))
    );

    return el('section', { id: 'pricing', className: 'pricing-section' },
      el('div', { className: 'pricing-header' },
        el('span', { className: 'section-tag' }, 'PRICING'),
        el('h2', { className: 'section-title' }, 'Start free. Upgrade when you scale.'),
        el('p', { className: 'section-desc' },
          'No credit card needed to begin. Straightforward tiers with no hidden usage limits.'
        )
      ),
      billingToggle,
      pricingContainer
    );
  }

  // ==========================================================================
  // 10. FINAL CONVERSION BANNER
  // ==========================================================================

  function createCtaSection() {
    return el('section', { className: 'cta-banner-section' },
      el('div', { className: 'cta-banner-card' },
        el('div', { className: 'cta-banner-text' },
          el('h2', { className: 'cta-banner-title' }, 'Ready for a calmer, clearer workspace?'),
          el('p', { className: 'cta-banner-sub' },
            'Join over 40,000 makers organizing their lives with modular clarity.'
          )
        ),
        el('div', { className: 'cta-banner-actions' },
          el('button', {
            className: 'cta-btn-primary',
            onclick: () => {
              const emailInput = document.querySelector('.hero-input');
              if (emailInput) {
                emailInput.focus();
                emailInput.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }, 'Create Your Workspace'),
          el('button', {
            className: 'cta-btn-secondary',
            onclick: () => showToast('Opening free template library...')
          }, 'Explore Free Templates →')
        )
      )
    );
  }

  // ==========================================================================
  // 11. FOOTER WITH THEME TOGGLE
  // ==========================================================================

  function createFooter() {
    let currentTheme = localStorage.getItem('neurolink-theme') || 'light';
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    const themeText = el('span', {}, currentTheme === 'dark' ? 'Dark Mode Active' : 'Light Mode Active');

    const themeToggleBtn = el('button', {
      className: 'theme-toggle-btn',
      onclick: () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        if (currentTheme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
          themeText.textContent = 'Dark Mode Active';
        } else {
          document.documentElement.removeAttribute('data-theme');
          themeText.textContent = 'Light Mode Active';
        }
        localStorage.setItem('neurolink-theme', currentTheme);
        showToast(`Switched to ${currentTheme} mode`);
      }
    },
      el('span', { className: 'theme-status-dot' }),
      themeText
    );

    return el('footer', { className: 'footer' },
      el('div', { className: 'footer-inner' },
        el('div', { className: 'footer-top-grid' },
          // Col 1: Brand
          el('div', { className: 'footer-brand-col' },
            el('div', { className: 'footer-brand-title' },
              el('img', { src: 'assets/logo.png', alt: 'Neurolink', className: 'nav-logo-img', width: 26, height: 26 }),
              el('span', {}, 'Neurolink')
            ),
            el('p', { className: 'footer-brand-desc' },
              'Modular productivity built for focused thinkers. Craft quiet systems for work and life.'
            )
          ),

          // Col 2: Product
          el('div', {},
            el('h4', { className: 'footer-col-heading' }, 'Product'),
            el('ul', { className: 'footer-links-list' },
              el('li', {}, el('a', { href: '#features', className: 'footer-link' }, 'Features')),
              el('li', {}, el('a', { href: '#views', className: 'footer-link' }, 'Views')),
              el('li', {}, el('a', { href: '#pricing', className: 'footer-link' }, 'Pricing')),
              el('li', {}, el('a', { href: '#', className: 'footer-link' }, 'Roadmap'))
            )
          ),

          // Col 3: Resources
          el('div', {},
            el('h4', { className: 'footer-col-heading' }, 'Resources'),
            el('ul', { className: 'footer-links-list' },
              el('li', {}, el('a', { href: '#', className: 'footer-link' }, 'Documentation')),
              el('li', {}, el('a', { href: '#', className: 'footer-link' }, 'Templates')),
              el('li', {}, el('a', { href: '#', className: 'footer-link' }, 'Community')),
              el('li', {}, el('a', { href: '#', className: 'footer-link' }, 'Manifesto'))
            )
          ),

          // Col 4: Company
          el('div', {},
            el('h4', { className: 'footer-col-heading' }, 'Company'),
            el('ul', { className: 'footer-links-list' },
              el('li', {}, el('a', { href: '#', className: 'footer-link' }, 'About')),
              el('li', {}, el('a', { href: '#', className: 'footer-link' }, 'Careers')),
              el('li', {}, el('a', { href: '#', className: 'footer-link' }, 'Privacy Policy')),
              el('li', {}, el('a', { href: '#', className: 'footer-link' }, 'Terms of Service'))
            )
          )
        ),

        // Bottom Bar
        el('div', { className: 'footer-bottom' },
          el('div', {}, '© 2025 Kanso Technologies Inc. Crafted for quiet focus.'),
          themeToggleBtn
        )
      )
    );
  }

  // ==========================================================================
  // 12. APP INITIALIZATION & DOM MOUNTING
  // ==========================================================================

  function initApp() {
    // Ensure body is clean before mounting
    document.body.innerHTML = '';

    const rootContainer = el('div', { id: 'app', className: 'app-root' },
      createHeader(),
      createHeroSection(),
      createTrustStrip(),
      createBentoSection(),
      createPlaygroundSection(),
      createPersonaSection(),
      createTestimonialsSection(),
      createPricingSection(),
      createCtaSection(),
      createFooter()
    );

    document.body.appendChild(rootContainer);
  }

  // Run initialization on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
