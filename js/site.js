/* KOTIGER site scripts. Подключение: Code Injection -> Footer
   <script src="https://kotiger-studio.github.io/kotiger-css/js/site.js" defer></script> */
(function () {
  'use strict';

  /* Partnership: вся карточка услуги - ссылка на страницу услуги (новая вкладка).
     Скрипт кладёт в карточку настоящую ссылку <a> поверх всей площади, поэтому работает
     всё как у обычной ссылки: Ctrl/Cmd+клик и колесо мыши - фоновая вкладка, правый клик - меню.
     Ссылка выбирается по заголовку карточки: новая карточка = новая строка в SERVICE_LINKS. */
  var SERVICES_SECTION = 'section[data-section-id="6ab2a23a65834a7aceb03600"]';
  var SERVICE_LINKS = {
    'Exteriors': '/services-exteriors',
    'Interiors': '/services-interiors',
    '3D Floor Plans': '/services-3d-floor-plans',
    '3D Site Plans': '/services-3d-site-plans',
    '3D Virtual Tours': '/services-3d-virtual-tours',
    'CGI + AI Video': '/services-3d-videos'
  };

  function initCards() {
    document.querySelectorAll(SERVICES_SECTION + ' .list-item').forEach(function (card) {
      if (card.querySelector('.kt-card-link')) return;
      var titleEl = card.querySelector('.list-item-content__title');
      var title = titleEl ? titleEl.textContent.trim() : '';
      var url = SERVICE_LINKS[title];
      if (!url) return;
      var a = document.createElement('a');
      a.className = 'kt-card-link';
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.setAttribute('aria-label', title);
      card.appendChild(a);
    });
  }

  /* HERO главной (#kt-hero в Code Block). Стили - src/12-home-hero.css.
     Один таймер переключает кадр фона и полоску счётчика (7 с на кадр),
     CSS только рисует переходы. Ещё: секции даётся класс .kt-hero-section, фон переносится
     в начало секции (чтобы лечь под контент на всю площадь), линия под H1 = ширине «Impact.»,
     высота шапки пишется в --kt-header-h. */
  var HERO_SLIDE_MS = 7000;

  function initHero() {
    var hero = document.getElementById('kt-hero');
    if (!hero || hero.dataset.ktReady) return;
    hero.dataset.ktReady = '1';

    /* Отключаем глобальную анимацию Squarespace внутри hero: атрибут выводит элемент из-под
       правила .fadeIn{opacity:1!important}, классы preFade/fadeIn и подобные снимаем сразу и при повторном навешивании */
    var SQS_ANIM = ['preFade', 'fadeIn', 'preSlide', 'slideIn', 'preScale', 'scaleIn', 'preClip', 'clipIn', 'preFlex', 'flexIn'];
    function stripAnim(root) {
      var els = [root].concat(Array.prototype.slice.call(root.querySelectorAll('*')));
      els.forEach(function (el) {
        if (!el.hasAttribute('data-override-initial-global-animation')) el.setAttribute('data-override-initial-global-animation', '');
        SQS_ANIM.forEach(function (c) { if (el.classList.contains(c)) el.classList.remove(c); });
      });
    }
    stripAnim(hero);
    if (window.MutationObserver) {
      new MutationObserver(function (muts) {
        muts.forEach(function (m) {
          var el = m.target;
          if (el.nodeType !== 1) return;
          SQS_ANIM.forEach(function (c) { if (el.classList.contains(c)) el.classList.remove(c); });
        });
      }).observe(hero, { attributes: true, attributeFilter: ['class'], subtree: true });
    }

    var section = hero.closest('section');
    var bgWrap = hero.querySelector('.kt-bg-wrap');
    if (section) {
      section.classList.add('kt-hero-section');
      if (bgWrap) section.insertBefore(bgWrap, section.firstChild);
    }

    /* высота шапки Squarespace -> CSS-переменная (секция = экран минус шапка) */
    function setHeaderH() {
      var h = document.getElementById('header');
      if (h) document.documentElement.style.setProperty('--kt-header-h', h.offsetHeight + 'px');
    }

    /* линия под заголовком = ширине слова «Impact.» */
    var impact = hero.querySelector('.kt-w3 .kt-word');
    function setRule() {
      if (!impact) return;
      var w = Math.round(impact.getBoundingClientRect().width);
      if (w) hero.style.setProperty('--kt-rule-w', w + 'px');
    }

    setHeaderH(); setRule();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setHeaderH(); setRule(); });
    setTimeout(function () { setHeaderH(); setRule(); }, 1200);
    window.addEventListener('resize', function () { setHeaderH(); setRule(); });

    /* появление элементов */
    requestAnimationFrame(function () { hero.classList.add('kt-in'); });

    /* слайдшоу + счётчик на одном таймере */
    var slides = bgWrap ? Array.prototype.slice.call(bgWrap.querySelectorAll('.kt-bg')) : [];
    var bars = Array.prototype.slice.call(hero.querySelectorAll('.kt-count span'));
    var n = Math.min(slides.length, bars.length);
    if (!n) return;
    var cur = 0;
    function show(i, prev) {
      slides.forEach(function (s, k) { s.classList.toggle('kt-on', k === i); s.classList.toggle('kt-out', k === prev); });
      bars.forEach(function (b, k) { b.classList.toggle('kt-on', k === i); });
    }
    show(0, -1);
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setInterval(function () { var prev = cur; cur = (cur + 1) % n; show(cur, prev); }, HERO_SLIDE_MS);
  }

  function init() { initCards(); initHero(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
