(function () {
  // ── Inject nav styles once ──
  if (!document.getElementById('site-nav-styles')) {
    var style = document.createElement('style');
    style.id = 'site-nav-styles';
    style.textContent = [
      'nav{position:fixed;top:0;left:0;right:0;z-index:100;',
      'display:flex;justify-content:space-between;align-items:center;',
      'padding:calc(env(safe-area-inset-top) + 1.4rem) 3rem 1.4rem;',
      'background:rgba(9,9,9,0.97);',
      '-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);',
      'border-bottom:1px solid rgba(192,236,172,0.08);}',
      'nav::before{content:"";position:absolute;top:calc(-1 * env(safe-area-inset-top));',
      'left:0;right:0;height:env(safe-area-inset-top);background:rgba(9,9,9,0.97);}',

      '.nav-logo{font-family:"Work Sans",sans-serif;font-size:1.35rem;font-weight:600;',
      'letter-spacing:0.04em;color:#C0ECAC;text-decoration:none;}',

      '.nav-logo-img{height:80px;width:auto;display:block;}',

      '.nav-links{display:flex;align-items:center;gap:2.5rem;list-style:none;}',
      '.nav-links a{color:#F5F5F0;text-decoration:none;font-size:0.78rem;',
      'letter-spacing:0.12em;text-transform:uppercase;transition:color 0.25s;}',
      '.nav-links a:hover{color:#C0ECAC;}',

      '.hamburger{display:none;flex-direction:column;justify-content:space-between;',
      'width:22px;height:15px;cursor:pointer;background:none;border:none;padding:0;',
      'position:relative;z-index:100;}',
      '.hamburger span{display:block;height:1.5px;background:#F5F5F0;',
      'transition:transform 0.3s,opacity 0.3s;}',
      '.hamburger.open span:nth-child(1){transform:translateY(6.75px) rotate(45deg);}',
      '.hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0);}',
      '.hamburger.open span:nth-child(3){transform:translateY(-6.75px) rotate(-45deg);}',

      '@media(max-width:900px){',
      'nav{padding:calc(env(safe-area-inset-top) + 1.2rem) 1.5rem 1.2rem;}',
      '.nav-links{gap:1.5rem;}}',

      '@media(max-width:560px){',
      '.hamburger{display:flex;}',
      '.nav-links{display:none;flex-direction:column;align-items:flex-start;',
      'position:fixed;top:0;left:0;right:0;',
      'background:rgba(9,9,9,0.97);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);',
      'padding:7rem 2rem 3rem;gap:2rem;z-index:99;}',
      '.nav-links.open{display:flex;}',
      '.nav-links a{font-size:1rem;letter-spacing:0.08em;}}',

      '@media(max-width:900px){',
      'nav{transition:padding 0.3s ease;}',
      '.nav-logo-img{transition:height 0.3s ease;}',
      'nav.scrolled{padding-top:calc(env(safe-area-inset-top) + 0.6rem);padding-bottom:0.6rem;}',
      'nav.scrolled .nav-logo-img{height:48px;}}'
    ].join('');
    document.head.appendChild(style);
  }

  // ── Build and inject nav HTML ──
  var placeholder = document.querySelector('site-nav');
  if (!placeholder) return;

  var nav = document.createElement('nav');
  nav.innerHTML =
    '<a class="nav-logo" href="/">' +
      '<img src="/logo-primary.png" alt="Pine Key Marketing" class="nav-logo-img" />' +
    '</a>' +
    '<ul class="nav-links" id="nav-links">' +
      '<li><a href="/#about">About</a></li>' +
      '<li><a href="/#services">Services</a></li>' +
      '<li><a href="/#process">Process</a></li>' +
      '<li><a href="/#contact">Contact</a></li>' +
    '</ul>' +
    '<button class="hamburger" id="hamburger" aria-label="Toggle menu">' +
      '<span></span><span></span><span></span>' +
    '</button>';

  placeholder.replaceWith(nav);

  // ── Hamburger logic ──
  var btn   = document.getElementById('hamburger');
  var links = document.getElementById('nav-links');

  function closeMenu() {
    btn.classList.remove('open');
    links.classList.remove('open');
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function (e) {
    if (links.classList.contains('open') && !links.contains(e.target) && e.target !== btn) {
      closeMenu();
    }
  });

  // ── Shrink nav on scroll (mobile only) ──
  window.addEventListener('scroll', function () {
    if (window.innerWidth <= 900) {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }
  }, { passive: true });
})();
