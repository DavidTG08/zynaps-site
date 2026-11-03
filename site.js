// zynaps.site page script (kept in its own file so the Content Security Policy
// can block any script that is not served from zynaps.site).
(function () {
  // App details in tab order. Edit file paths, sizes and notes here.
  const APPS = {
    // file, size and notes are filled in from the newest GitHub release (see below).
    x:   { name: 'Synapse X',  file: 'https://github.com/DavidTG08/SynapseX-releases/releases/latest',   size: 'Windows installer',
           cta: 'A pixel-perfect crosshair and 1,100+ custom cursors. Free for Windows 10 / 11.',
           notes: 'Synapse X 2.0.0 — 1,100+ editable cursors, Discord sign-in, and a crosshair that works everywhere.' },
    y:   { name: 'Synapse Y',  file: 'downloads/SynapseY-Setup-1.2.0.exe',   size: '22 MB',
           cta: 'Boost your WPM and climb the global leaderboard.',
           notes: 'Synapse Y 1.2.0 — live WPM tracking, performance history and cloud-synced leaderboards.' },
    // file, size and notes are filled in from the newest GitHub release (see below).
    vpn: { name: 'SynapseVPN', file: 'https://github.com/DavidTG08/SynapseVPN-releases/releases/latest', size: 'Windows installer',
           cta: 'One-click VPN, threat protection, breach alerts and a gaming Speed optimizer. Free for Windows 10 / 11 and Android.',
           notes: 'SynapseVPN — see the latest release notes on GitHub.' },
    // file, size and notes are filled in from the newest GitHub release (see below).
    waves: { name: 'SynapseWAVEs', file: 'https://github.com/DavidTG08/SynapseWAVEs-releases/releases/latest', size: 'Windows installer',
           cta: 'An Audacity-style audio editor with AudioLab sound, clean mixing and loud exports. Free for Windows 10 / 11.',
           notes: 'SynapseWAVEs 1.0.0 — audio editor, mixer and 29 effects.' }
  };

  // Synapse X: always link the newest installer from GitHub Releases.
  fetch('https://api.github.com/repos/DavidTG08/SynapseX-releases/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(release => {
      const exe = (release.assets || []).find(a => /\.exe$/i.test(a.name));
      if (!exe) return;
      const version = String(release.tag_name || '').replace(/^v/, '');
      APPS.x.file = exe.browser_download_url;
      APPS.x.size = Math.round(exe.size / 1e6) + ' MB';
      const firstNote = String(release.body || '').split('\n').map(l => l.replace(/^[-*#]\s*/, '').trim()).filter(Boolean)[0];
      APPS.x.notes = 'Synapse X ' + version + (firstNote ? ' — ' + firstNote : '');
      document.querySelectorAll('.js-x-file').forEach(a => a.href = exe.browser_download_url);
      document.querySelectorAll('.js-x-version').forEach(el => el.textContent = 'v' + version);
      if (current === 'x') {
        headerBtn.href = exe.browser_download_url;
        document.querySelectorAll('.cta .js-download').forEach(a => a.href = exe.browser_download_url);
      }
    })
    .catch(() => { /* keep the link to the releases page */ });

  // SynapseVPN: always link the newest installer from GitHub Releases.
  fetch('https://api.github.com/repos/DavidTG08/SynapseVPN-releases/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(release => {
      const exe = (release.assets || []).find(a => /\.exe$/i.test(a.name));
      if (!exe) return;
      const version = String(release.tag_name || '').replace(/^v/, '');
      APPS.vpn.file = exe.browser_download_url;
      APPS.vpn.size = Math.round(exe.size / 1e6) + ' MB';
      const firstNote = String(release.body || '').split('\n').map(l => l.replace(/^[-*]\s*/, '').trim()).filter(Boolean)[0];
      APPS.vpn.notes = 'SynapseVPN ' + version + (firstNote ? ' — ' + firstNote : '');
      document.querySelectorAll('.js-vpn-file').forEach(a => a.href = exe.browser_download_url);
      document.querySelectorAll('.js-vpn-version').forEach(el => el.textContent = 'v' + version);
      if (current === 'vpn') {
        headerBtn.href = exe.browser_download_url;
        document.querySelectorAll('.cta .js-download').forEach(a => a.href = exe.browser_download_url);
      }
    })
    .catch(() => { /* keep the link to the releases page */ });
  // SynapseWAVEs: always link the newest installer from GitHub Releases.
  fetch('https://api.github.com/repos/DavidTG08/SynapseWAVEs-releases/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(release => {
      const exe = (release.assets || []).find(a => /\.exe$/i.test(a.name));
      if (!exe) return;
      const version = String(release.tag_name || '').replace(/^v/, '');
      APPS.waves.file = exe.browser_download_url;
      APPS.waves.size = Math.round(exe.size / 1e6) + ' MB';
      const firstNote = String(release.body || '').split('\n').map(l => l.replace(/^[-*#]\s*/, '').trim()).filter(Boolean)[0];
      APPS.waves.notes = 'SynapseWAVEs ' + version + (firstNote ? ' — ' + firstNote : '');
      document.querySelectorAll('.js-waves-file').forEach(a => a.href = exe.browser_download_url);
      document.querySelectorAll('.js-waves-version').forEach(el => el.textContent = 'v' + version);
      if (current === 'waves') {
        headerBtn.href = exe.browser_download_url;
        document.querySelectorAll('.cta .js-download').forEach(a => a.href = exe.browser_download_url);
      }
    })
    .catch(() => { /* keep the link to the releases page */ });
  // SynapseVPN for Android: the newest APK (releases tagged android-v…, never marked "latest",
  // so the Windows download and the PC app's updater keep using the Windows release).
  fetch('https://api.github.com/repos/DavidTG08/SynapseVPN-releases/releases?per_page=30', { headers: { Accept: 'application/vnd.github+json' } })
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(list => {
      for (const release of list) {
        if (release.draft || release.prerelease || !/^android-v/.test(release.tag_name || '')) continue;
        const apk = (release.assets || []).find(a => /.apk$/i.test(a.name));
        if (apk) { document.querySelectorAll('.js-vpn-apk').forEach(a => a.href = apk.browser_download_url); return; }
      }
    })
    .catch(() => { /* keep the built-in link */ });
  const HOME = 'home';
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const panels = Array.from(document.querySelectorAll('.panel'));
  const brand = document.getElementById('brand');
  const headerBtn = document.getElementById('header-btn');
  let current = null;

  function activate(id, opts) {
    opts = opts || {};
    if (id !== HOME && !APPS[id]) id = HOME;   // unknown or empty → Main tab
    const isHome = id === HOME;
    const app = APPS[id];

    // Logo = Main tab
    brand.setAttribute('aria-selected', isHome);

    tabs.forEach((t, i) => {
      const on = t.dataset.app === id;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on || (isHome && i === 0) ? 0 : -1;
      if (on && opts.focus) t.focus();
    });

    panels.forEach(p => {
      const on = p.id === 'panel-' + id;
      p.hidden = !on;
      p.classList.remove('is-entering');
      if (on) { void p.offsetWidth; p.classList.add('is-entering'); }
    });

    // Switches the color theme (white / orange / purple / blue / green)
    document.body.dataset.app = id;

    // Header button: "Get the apps" on Main, otherwise downloads the selected app
    if (isHome) {
      headerBtn.href = '#apps';
      headerBtn.removeAttribute('download');
      document.querySelector('.js-btn-label').textContent = 'Get the apps';
      document.querySelectorAll('.js-name').forEach(el => el.innerHTML = '');
    } else {
      headerBtn.href = app.file;
      headerBtn.setAttribute('download', '');
      document.querySelector('.js-btn-label').textContent = 'Download';
      document.querySelectorAll('.js-name').forEach(el => el.innerHTML = '&nbsp;' + app.name);
      document.querySelectorAll('.cta .js-download').forEach(a => a.href = app.file);
      document.querySelectorAll('.js-name-plain').forEach(el => el.textContent = app.name);
      document.querySelector('.js-cta-text').textContent = app.cta;
    }

    if (current !== null && !opts.keepScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
    current = id;

    // Main tab has a clean URL; apps use #x, #y, #vpn, #waves
    const url = isHome ? location.pathname + location.search : '#' + id;
    if ((isHome && location.hash) || (!isHome && location.hash !== '#' + id)) history.replaceState(null, '', url);
  }

  function scrollToApps() {
    document.getElementById('apps').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  tabs.forEach(t => t.addEventListener('click', () => activate(t.dataset.app)));

  // Logo and footer "Home" links always go back to the Main tab
  [brand].concat(Array.from(document.querySelectorAll('.js-home'))).forEach(el =>
    el.addEventListener('click', e => { e.preventDefault(); activate(HOME); window.scrollTo({ top: 0, behavior: 'smooth' }); })
  );

  // Home: "Explore" buttons open that app's tab; "Explore the apps" scrolls to the cards
  document.querySelectorAll('.js-goto').forEach(b => b.addEventListener('click', () => activate(b.dataset.target)));
  document.querySelectorAll('.js-scroll-apps').forEach(a => a.addEventListener('click', e => { e.preventDefault(); scrollToApps(); }));
  headerBtn.addEventListener('click', e => {
    if (current === HOME) { e.preventDefault(); scrollToApps(); }
  });

  // Arrow keys move between tabs
  document.querySelector('.tabs').addEventListener('keydown', e => {
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    let n = null;
    if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
    if (e.key === 'ArrowLeft')  n = (i - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End')  n = tabs.length - 1;
    if (n !== null) { e.preventDefault(); activate(tabs[n].dataset.app, { focus: true }); }
  });

  // Links like #x, #y, #vpn (footer, shared URLs)
  window.addEventListener('hashchange', () => activate(location.hash.slice(1)));

  // ───── Tips (Stripe Payment Link) ─────
  // Paste your Stripe Payment Link here, e.g. 'https://buy.stripe.com/abc123'.
  const TIP_URL = 'https://buy.stripe.com/eVq28r4Wr0Tp95N3R03AY00';

  document.querySelectorAll('.js-tip').forEach(a => {
    if (TIP_URL) {
      a.href = TIP_URL;
      a.target = '_blank';
      a.rel = 'noopener';
    } else {
      a.addEventListener('click', e => { e.preventDefault(); showToast('Tips are coming soon — thank you for your support!'); });
    }
  });

  // Stripe can send people back to https://zynaps.site/#thanks after tipping
  if (location.hash === '#thanks') {
    setTimeout(() => showToast('Thank you so much for your tip! ♥'), 400);
  }

  // ───── Contact menu ─────
  // A website can't tell which email apps a visitor has, so "Support" opens
  // a small menu with webmail links (work without any installed app) plus mailto.
  const SUPPORT = 'support@zynaps.site';
  const contact = document.getElementById('contact');
  let lastFocus = null;

  function openContact() {
    const app = APPS[current];
    const subject = 'Support request' + (app ? ' — ' + app.name : '');
    const to = encodeURIComponent(SUPPORT);
    const su = encodeURIComponent(subject);
    document.getElementById('c-gmail').href   = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + to + '&su=' + su;
    document.getElementById('c-outlook').href = 'https://outlook.live.com/mail/0/deeplink/compose?to=' + to + '&subject=' + su;
    document.getElementById('c-yahoo').href   = 'https://compose.mail.yahoo.com/?to=' + to + '&subject=' + su;
    document.getElementById('c-app').href     = 'mailto:' + SUPPORT + '?subject=' + su;
    lastFocus = document.activeElement;
    contact.classList.add('open');
    contact.setAttribute('aria-hidden', 'false');
    document.getElementById('c-gmail').focus();
  }
  function closeContact() {
    contact.classList.remove('open');
    contact.setAttribute('aria-hidden', 'true');
    if (lastFocus) lastFocus.focus();
  }

  // Every mailto:support link on the page opens the menu instead
  document.querySelectorAll('a[href^="mailto:' + SUPPORT + '"]').forEach(a =>
    a.addEventListener('click', e => { e.preventDefault(); openContact(); })
  );
  contact.addEventListener('click', e => {
    if (e.target === contact || e.target.closest('[data-close]')) closeContact();
  });
  contact.querySelectorAll('a.contact-opt').forEach(a => a.addEventListener('click', () => setTimeout(closeContact, 150)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && contact.classList.contains('open')) closeContact(); });

  document.getElementById('c-copy').addEventListener('click', () => {
    const done = () => { closeContact(); showToast('Copied ' + SUPPORT + ' to your clipboard'); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(SUPPORT).then(done, () => fallbackCopy(done));
    } else {
      fallbackCopy(done);
    }
  });
  function fallbackCopy(done) {
    const t = document.createElement('textarea');
    t.value = SUPPORT;
    t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t);
    t.select();
    try { document.execCommand('copy'); } catch (err) {}
    t.remove();
    done();
  }

  // ───── Feedback ─────
  // GitHub Pages has no server, so FormSubmit (formsubmit.co) emails each
  // submission to SUPPORT. The very first submission sends an "Activate form"
  // email to SUPPORT — click it once, and every submission after that arrives.
  const feedback = document.getElementById('feedback');
  const fbForm = document.getElementById('fb-form');
  const fbMsg = document.getElementById('fb-msg');
  const fbEmail = document.getElementById('fb-email');
  const fbSubmit = fbForm.querySelector('.fb-submit');
  const fbRates = fbForm.querySelectorAll('[data-rate]');
  let fbRate = '';
  let fbLastFocus = null;

  function fbUpdate() { fbSubmit.disabled = !fbMsg.value.trim() && !fbRate; }
  function openFeedback() {
    fbLastFocus = document.activeElement;
    feedback.classList.add('open');
    feedback.setAttribute('aria-hidden', 'false');
    setTimeout(() => fbMsg.focus(), 50);
  }
  function closeFeedback() {
    feedback.classList.remove('open');
    feedback.setAttribute('aria-hidden', 'true');
    if (fbLastFocus) fbLastFocus.focus();
  }
  function resetFeedback() {
    fbForm.reset();
    fbRate = '';
    fbRates.forEach(b => b.setAttribute('aria-pressed', 'false'));
    fbSubmit.textContent = 'Submit';
    fbUpdate();
  }

  document.querySelectorAll('.js-feedback').forEach(el =>
    el.addEventListener('click', e => { e.preventDefault(); openFeedback(); })
  );
  feedback.addEventListener('click', e => {
    if (e.target === feedback || e.target.closest('[data-close]')) closeFeedback();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && feedback.classList.contains('open')) closeFeedback(); });
  fbRates.forEach(b => b.addEventListener('click', () => {
    const on = b.getAttribute('aria-pressed') !== 'true';
    fbRates.forEach(o => o.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', String(on));
    fbRate = on ? b.dataset.rate : '';
    fbUpdate();
  }));
  fbMsg.addEventListener('input', fbUpdate);

  fbForm.addEventListener('submit', e => {
    e.preventDefault();
    if (fbSubmit.disabled) return;
    if (fbForm._honey.value) { closeFeedback(); resetFeedback(); return; } // bot
    const email = fbEmail.value.trim();
    if (email && !fbEmail.checkValidity()) { showToast('That email address doesn’t look right.'); fbEmail.focus(); return; }

    const app = APPS[current];
    const data = {
      _subject: 'New feedback' + (fbRate ? ' (' + fbRate + ')' : '') + ' — zynaps.site',
      _template: 'table',
      _captcha: 'false',
      Rating: fbRate || '—',
      Feedback: fbMsg.value.trim() || '—',
      Page: app ? app.name : 'Home',
      Browser: navigator.userAgent
    };
    if (email) { data.Email = email; data._replyto = email; }

    fbSubmit.disabled = true;
    fbSubmit.textContent = 'Sending…';
    fetch('https://formsubmit.co/ajax/' + SUPPORT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(r => r.json().catch(() => ({})).then(j => {
        if (!r.ok || String(j.success) === 'false') throw new Error(j.message || 'failed');
      }))
      .then(() => {
        closeFeedback();
        resetFeedback();
        showToast('Thanks — your feedback was sent!');
      })
      .catch(() => {
        fbSubmit.textContent = 'Submit';
        fbUpdate();
        showToast('Couldn’t send feedback. Please try again in a moment.');
      });
  });

  // Toast messages
  const toast = document.getElementById('toast');
  let timer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  document.querySelectorAll('.js-download').forEach(a => a.addEventListener('click', () => {
    const app = APPS[a.dataset.app || current];
    if (!app) return; // header button on Main only scrolls
    showToast('Starting download: ' + app.name + ' (' + app.size + ')…');
  }));
  document.querySelectorAll('.js-notes').forEach(b => b.addEventListener('click', () => showToast(APPS[current].notes)));

  document.getElementById('year').textContent = new Date().getFullYear();
  activate(location.hash.slice(1), { keepScroll: true });
})();
