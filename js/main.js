/* TheGlocalPM — shared interactions */

/* --- Cal.com popup embed loader (namespace: "coffeechat") ----------------
   Buttons with data-cal-link / data-cal-namespace open the calendar in a
   popup instead of navigating. The script tags below are the standard
   Cal.com element-click embed, hoisted into main.js so it loads once per
   page. */
(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal;
    let ar = arguments;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      d.head.appendChild(d.createElement('script')).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === 'string') {
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar);
        p(cal, ['initNamespace', namespace]);
      } else { p(cal, ar); }
      return;
    }
    p(cal, ar);
  };
})(window, 'https://app.cal.com/embed/embed.js', 'init');
Cal('init', 'coffeechat', { origin: 'https://app.cal.com' });
Cal.ns.coffeechat('ui', { hideEventTypeDetails: false, layout: 'month_view' });

(function () {
  'use strict';

  // Single fan-out point for product analytics. Every custom event goes to
  // both GA4 and PostHog from here, so the two can never drift apart.
  // Each destination is guarded independently: if one script is blocked or
  // still loading, the other still records the event.
  // (Pageviews are not sent here — GA4 and PostHog both capture those
  // automatically from their own snippets in <head>.)
  function track(eventName, params) {
    if (typeof gtag === 'function') gtag('event', eventName, params);
    if (typeof posthog !== 'undefined' && typeof posthog.capture === 'function') {
      posthog.capture(eventName, params);
    }
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  // -------------------------------------------------------------
  // 0. Analytics: completed Cal.com bookings
  //    `cta_click` (below) only means the popup was opened. This fires when
  //    the booking is actually confirmed inside the Cal iframe, so GA4 and
  //    PostHog can report a real conversion rate, not intent-to-open.
  //    Cal renamed the action at one point and a single booking can emit
  //    both names, so we register both and de-dupe.
  // -------------------------------------------------------------
  const seenBookings = new Set();

  function onBookingSuccessful(e) {
    const data = (e && e.detail && e.detail.data) || {};
    const booking = data.booking || {};
    const eventType = data.eventType || {};
    const uid = booking.uid || data.uid || '';
    const slug = eventType.slug || eventType.title || 'coffeechat';

    const dedupeKey = uid || slug + '|' + (data.date || booking.startTime || '');
    if (seenBookings.has(dedupeKey)) return;
    seenBookings.add(dedupeKey);

    const params = { cta_name: 'book_a_call', event_type: slug };
    if (uid) params.booking_uid = uid;
    track('booking_completed', params);
  }

  if (typeof Cal === 'function' && Cal.ns && Cal.ns.coffeechat) {
    ['bookingSuccessful', 'bookingSuccessfulV2'].forEach(function (action) {
      Cal.ns.coffeechat('on', { action: action, callback: onBookingSuccessful });
    });
  }

  // -------------------------------------------------------------
  // 1. Inject shared header + footer
  //    Each page sets <body data-page="home|case-studies|...">
  //    so we can highlight the correct nav item.
  // -------------------------------------------------------------
  const NAV_ITEMS = [
    { key: 'home',          href: 'index.html',          label: 'Work' },
    { key: 'case-studies',  href: 'case-studies.html',   label: 'Case Studies' },
    { key: 'agent-lab',     href: 'agent-lab.html',      label: 'Agent Lab' },
    { key: 'skills',        href: 'skills.html',         label: 'Skills' },
    { key: 'toolkit',       href: 'toolkit.html',        label: 'The Toolkit' },
    { key: 'point-of-view', href: 'point-of-view.html',  label: 'Point of View' },
  ];

  function buildHeader(activeKey) {
    const navLinks = NAV_ITEMS.map(item => {
      const isActive = item.key === activeKey;
      const cls = isActive
        ? 'bg-coral text-white border-2 border-[#1A1A1A] -rotate-1 px-3 py-1 hover:-rotate-2 transition-all whitespace-nowrap'
        : 'text-[#1A1A1A] px-3 py-1 hover:bg-coral hover:text-white hover:-rotate-2 transition-all whitespace-nowrap';
      const aria = isActive ? ' aria-current="page"' : '';
      return `<a href="${item.href}" class="${cls}"${aria}>${item.label}</a>`;
    }).join('');

    const mobileLinks = NAV_ITEMS.map(item => {
      const isActive = item.key === activeKey;
      const cls = isActive
        ? 'block bg-coral text-white border-2 border-[#1A1A1A] px-4 py-3 font-bold uppercase tracking-tight'
        : 'block text-[#1A1A1A] px-4 py-3 font-bold uppercase tracking-tight hover:bg-coral hover:text-white border-2 border-transparent transition-colors';
      const aria = isActive ? ' aria-current="page"' : '';
      return `<a href="${item.href}" class="${cls}"${aria}>${item.label}</a>`;
    }).join('');

    return `
<header class="fixed top-0 left-0 right-0 z-50 flex justify-center px-4" role="banner">
  <nav class="bg-white rounded-full border-2 border-[#1A1A1A] mx-auto mt-4 md:mt-6 flex items-center gap-2 md:gap-4 px-3 md:px-6 py-2 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] w-auto max-w-[calc(100vw-2rem)]" aria-label="Main navigation">
    <a href="index.html" class="flex items-center shrink-0" aria-label="TheGlocalPM — Home">
      <img alt="TheGlocalPM — Ali Mahmoud, Senior Product Manager" class="h-8 md:h-10 w-auto bg-transparent max-w-[140px]" src="assets/logos/logo.png" />
    </a>
    <div class="hidden lg:flex items-center gap-1 font-['Plus_Jakarta_Sans'] font-bold uppercase tracking-tight text-[13px]">
      ${navLinks}
    </div>
    <a href="https://cal.com/alim-datajar/coffeechat" rel="noopener"
       data-cal-link="alim-datajar/coffeechat"
       data-cal-namespace="coffeechat"
       data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}'
       class="hidden md:inline-block bg-primary px-4 lg:px-6 py-2 rounded-full border-2 border-[#1A1A1A] text-white font-bold text-[12px] uppercase tracking-widest hover:bg-coral hover:text-white transition-all active:scale-95 neo-shadow whitespace-nowrap">Book a call</a>
    <button id="mobile-menu-btn" aria-label="Open menu" aria-expanded="false"
            class="lg:hidden ml-1 bg-coral text-white border-2 border-[#1A1A1A] w-9 h-9 rounded-full flex items-center justify-center neo-shadow active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
      <span class="material-symbols-outlined" style="font-size:20px;">menu</span>
    </button>
  </nav>
</header>
<div id="mobile-menu" class="fixed top-[72px] left-4 right-4 z-40 bg-white border-4 border-[#1A1A1A] rounded-2xl shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] p-3 lg:hidden">
  ${mobileLinks}
  <a href="https://cal.com/alim-datajar/coffeechat" rel="noopener"
     data-cal-link="alim-datajar/coffeechat"
     data-cal-namespace="coffeechat"
     data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}'
     class="mt-2 block text-center bg-primary text-white border-2 border-[#1A1A1A] px-4 py-3 font-bold uppercase tracking-widest neo-shadow">Book a call</a>
</div>`;
  }

  function buildFooter() {
    const year = new Date().getFullYear();
    return `
<footer id="contact" class="w-full py-12 px-8 flex flex-col items-center gap-6 text-center bg-coral border-t-4 border-[#1A1A1A]" role="contentinfo" aria-label="Site footer">
  <nav aria-label="Footer links" class="flex flex-wrap justify-center gap-6 md:gap-8 mb-2">
    <a class="text-white font-bold uppercase hover:underline hover:scale-105 transition-transform active:scale-95" href="point-of-view.html">Newsletter</a>
    <a class="text-white font-bold uppercase hover:underline hover:scale-105 transition-transform active:scale-95" href="https://www.linkedin.com/in/alimahmoud1986/" target="_blank" rel="noopener me">LinkedIn</a>
    <a class="text-white font-bold uppercase hover:underline hover:scale-105 transition-transform active:scale-95" href="https://cal.com/alim-datajar/coffeechat" rel="noopener" data-cal-link="alim-datajar/coffeechat" data-cal-namespace="coffeechat" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}'>Book a call</a>
    <a class="text-white font-bold uppercase hover:underline hover:scale-105 transition-transform active:scale-95" href="mailto:ali@theglocalpm.com">Contact</a>
    <a class="text-white font-bold uppercase hover:underline hover:scale-105 transition-transform active:scale-95" href="assets/pdfs/Ali_Mahmoud_Resume.pdf" download="Ali_Mahmoud_Resume.pdf">Resume</a>
    <a class="text-white font-bold uppercase hover:underline hover:scale-105 transition-transform active:scale-95" href="imprint.html">Imprint</a>
  </nav>
  <p class="text-white font-medium">© 2024–${year} TheGlocalPM • Ali Mahmoud, Senior Product Manager • Built with Chaos &amp; Logic</p>
  <div class="flex gap-4" aria-hidden="true">
    <div class="w-6 h-6 border-2 border-[#1A1A1A] bg-white rounded-sm"></div>
    <div class="w-6 h-6 border-2 border-[#1A1A1A] bg-primary rounded-full"></div>
    <div class="w-6 h-6 border-2 border-[#1A1A1A] bg-brand-purple rotate-12"></div>
  </div>
</footer>`;
  }

  function buildResumeModal() {
    return `
<div id="resume-modal" class="fixed inset-0 z-[100] hidden items-center justify-center p-4 no-print">
  <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" data-close-resume></div>
  <div class="relative bg-white border-[6px] border-[#1A1A1A] rounded-[40px] p-6 md:p-12 max-w-3xl w-full shadow-[12px_12px_0px_0px_#1A1A1A] -rotate-1">
    <button class="absolute -top-5 -right-5 bg-coral text-white border-4 border-[#1A1A1A] w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform neo-shadow" data-close-resume aria-label="Close">
      <span class="material-symbols-outlined font-bold">close</span>
    </button>
    <div class="flex flex-col md:flex-row gap-6 items-start">
      <div class="w-full md:w-2/3 bg-surface-container border-4 border-[#1A1A1A] rounded-2xl h-[300px] md:h-[420px] flex items-center justify-center">
        <div class="text-center p-6">
          <span class="material-symbols-outlined text-6xl text-primary mb-2">description</span>
          <h3 class="text-2xl font-bold mb-1">Ali_Mahmoud_Resume.pdf</h3>
          <p class="text-on-surface-variant">Senior PM • 10 years • SaaS, marketplaces, AI</p>
        </div>
      </div>
      <div class="w-full md:w-1/3 space-y-4">
        <h2 class="text-2xl md:text-3xl font-extrabold">My Resume</h2>
        <p class="text-on-surface-variant">10 years shipping products across SaaS, marketplaces and AI-driven tools.</p>
        <a href="assets/pdfs/Ali_Mahmoud_Resume.pdf" download="Ali_Mahmoud_Resume.pdf" class="block w-full text-center bg-primary text-white font-bold px-6 py-4 border-4 border-[#1A1A1A] hover:bg-coral transition-all neo-shadow rounded-lg">
          <span class="material-symbols-outlined align-middle mr-1">download</span> DOWNLOAD PDF
        </a>
      </div>
    </div>
  </div>
</div>`;
  }

  // -------------------------------------------------------------
  // 2. Mount header / footer / modal, wire interactions
  // -------------------------------------------------------------
  ready(function () {
    const activeKey = document.body.dataset.page || 'home';

    // Inject header (replace placeholder if present, else prepend)
    const headerSlot = document.getElementById('site-header');
    if (headerSlot) headerSlot.outerHTML = buildHeader(activeKey);
    else document.body.insertAdjacentHTML('afterbegin', buildHeader(activeKey));

    // Inject footer
    const footerSlot = document.getElementById('site-footer');
    if (footerSlot) footerSlot.outerHTML = buildFooter();
    else document.body.insertAdjacentHTML('beforeend', buildFooter());

    // Inject resume modal
    document.body.insertAdjacentHTML('beforeend', buildResumeModal());

    // Cal.com booking links: NEVER follow the href — always render via the
    // embedded popup (or fail closed). Capture-phase preventDefault runs
    // before any other click handler, including the browser's nav action.
    // The Cal.com embed.js then opens the modal in its own bubble-phase
    // handler bound via the [data-cal-link] data attribute.
    document.addEventListener('click', function (e) {
      const el = e.target.closest('[data-cal-link]');
      if (el) {
        e.preventDefault();
        track('cta_click', { cta_name: 'book_a_call' });
      }
    }, true);

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        const open = mobileMenu.classList.toggle('open');
        mobileBtn.setAttribute('aria-expanded', String(open));
      });
      mobileMenu.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => mobileMenu.classList.remove('open'))
      );
    }

    // Resume modal open/close
    function openResume() {
      const m = document.getElementById('resume-modal');
      if (!m) return;
      track('cta_click', { cta_name: 'open_resume' });
      m.classList.remove('hidden');
      m.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }
    function closeResume() {
      const m = document.getElementById('resume-modal');
      if (!m) return;
      m.classList.add('hidden');
      m.classList.remove('flex');
      document.body.style.overflow = '';
    }
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-open-resume]');
      if (target) { e.preventDefault(); openResume(); return; }
      if (e.target.closest('[data-close-resume]')) { closeResume(); }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeResume();
    });

    // Analytics: nav topic clicks (Agent Lab, The Toolkit, Case Studies, Point of View)
    const GA_NAV_TOPICS = {
      'agent-lab.html':    'agent_lab',
      'toolkit.html':      'the_toolkit',
      'case-studies.html': 'case_studies',
      'point-of-view.html':'point_of_view',
    };
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href]');
      if (!link) return;
      const topic = GA_NAV_TOPICS[link.getAttribute('href')];
      if (topic) track('nav_topic_click', { topic });
    });

    // Press-down animation for elements with .neo-shadow that opt in
    document.querySelectorAll('.neo-press').forEach(el => {
      const press = () => {
        el.style.transform = 'translate(4px,4px)';
        el.style.boxShadow = '0 0 0 0 #1A1A1A';
      };
      const release = () => {
        el.style.transform = '';
        el.style.boxShadow = '';
      };
      el.addEventListener('mousedown', press);
      el.addEventListener('touchstart', press, { passive: true });
      el.addEventListener('mouseup', release);
      el.addEventListener('mouseleave', release);
      el.addEventListener('touchend', release);
    });
  });
})();
