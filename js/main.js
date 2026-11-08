// Dogseye Studio: small progressive enhancements. The page works fully without this file.
(function () {
  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('.site-header');
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');

    // Mobile menu
    function setMenu(open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    }
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Language switch EN/ES
    var langBtn = document.querySelector('.lang-toggle');
    var items = document.querySelectorAll('[data-es]');
    Array.prototype.forEach.call(items, function (el) { el.setAttribute('data-en', el.innerHTML); });
    var titles = { en: document.title, es: 'Dogseye Studio · Estudio indie de videojuegos en Madrid' };
    function setLang(lang) {
      root.lang = lang;
      document.title = titles[lang];
      Array.prototype.forEach.call(items, function (el) {
        el.innerHTML = el.getAttribute(lang === 'es' ? 'data-es' : 'data-en');
      });
      langBtn.setAttribute('data-lang', lang);
      try { localStorage.setItem('lang', lang); } catch (e) {}
    }
    langBtn.addEventListener('click', function () {
      setLang(root.lang === 'es' ? 'en' : 'es');
    });
    var saved = null;
    try { saved = localStorage.getItem('lang'); } catch (e) {}
    langBtn.setAttribute('data-lang', 'en');
    if (saved === 'es') setLang('es');

    // Header border once the page scrolls
    function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (!('IntersectionObserver' in window)) return;

    // Highlight the nav link of the section in view
    var links = Array.prototype.slice.call(nav.querySelectorAll('ul a[href^="#"]'));
    var sections = document.querySelectorAll('main section[id]');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          if (a.getAttribute('href') === '#' + entry.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Array.prototype.forEach.call(sections, function (s) { spy.observe(s); });

    // Gentle reveal on scroll (disabled by CSS for reduced motion)
    var targets = document.querySelectorAll('.about-inner, .team-card, .goal-card, .devlog-entry, .edition-card, .game-head, .story, .pillars, .socials .container, .contact-card');
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add('reveal');
      reveal.observe(el);
    });
  });

  // Contact form: opens the user's email client with the message filled in
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var body = d.get('message') + '\n\n' + d.get('name') + ' (' + d.get('email') + ')';
      location.href = 'mailto:dogseye.studio@gmail.com?subject=' + encodeURIComponent('Contact from ' + d.get('name')) + '&body=' + encodeURIComponent(body);
    });
  });

  // Copy-email button (only shown when the Clipboard API is available)
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.copy-btn');
    var status = document.querySelector('.copy-status');
    if (!btn || !navigator.clipboard || !window.isSecureContext) return;
    btn.hidden = false;
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(function () {
        status.textContent = root.lang === 'es' ? '¡Email copiado!' : 'Email copied to clipboard!';
      }, function () {
        status.textContent = (root.lang === 'es' ? 'No se pudo copiar. La dirección es ' : 'Could not copy. The address is ') + 'dogseye.studio@gmail.com';
      });
      setTimeout(function () { status.textContent = ''; }, 4000);
    });
  });
})();
