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
     CSS только рисует переходы.
     Слайдшоу: категории идут по кругу в порядке HERO_CATS (подписи счётчика скрипт берёт оттуда же); на каждом круге категория показывает
     свою следующую картинку (кончились - с первой). Картинки - из галереи /user-storage
     (section[data-section-id="6acd1495c1d9b84bd4e0e764"]), имена вида <категория>-<номер>-….
     Список зашит ниже (HERO_CATS); добавить картинку = загрузить в галерею и дописать строку.
     Вариант на будущее: собирать список динамически - fetch('/user-storage'), выбрать из HTML
     секции адреса images.squarespace-cdn.com и разложить по префиксу имени (не реализовано).
     Три слоя фона: текущий (.kt-on), уходящий (.kt-out) и запасной, в который следующий кадр
     подгружается заранее. Клик по подписи счётчика запускает цикл с этой категории (следующая её картинка). Ещё: секции даётся класс .kt-hero-section, фон переносится
     в начало секции (чтобы лечь под контент на всю площадь), линия под H1 = ширине «Impact.»,
     высота шапки пишется в --kt-header-h. */
  var HERO_SLIDE_MS = 7000;
  var HERO_CATS = [
    { label: 'Urban', imgs: [
      'https://images.squarespace-cdn.com/content/v1/5ee09ea8e09929041f9192e0/c0d620a6-0c48-4923-919d-931f797ec4ae/urban-1-PORT-195-Clarkson-EXT--03.jpg?format=2500w',
      'https://images.squarespace-cdn.com/content/v1/5ee09ea8e09929041f9192e0/24467b65-effe-4179-bf28-4e7eb19b1527/urban-2-PORT-CORTELIC-ANGLE--01.jpg?format=2500w',
      'https://images.squarespace-cdn.com/content/v1/5ee09ea8e09929041f9192e0/8ec45fc5-df1b-4b6c-8203-5ab8d2568779/urban-3-2781-exterior-PORT-2021-EXTENDED.jpg?format=2500w'
    ] },
    { label: 'Townhouses', imgs: [
      'https://images.squarespace-cdn.com/content/v1/5ee09ea8e09929041f9192e0/a889a894-7802-47bd-9e93-2e1e2023356f/townhouses-1-PORT-OLDFORD-SCENE1--01.jpg?format=2500w',
      'https://images.squarespace-cdn.com/content/v1/5ee09ea8e09929041f9192e0/34d00c0a-25f8-4a7f-98e8-0afe2f00e0fb/townhouses-2-PORT-TEJON--08.jpg?format=2500w'
    ] },
    { label: 'Residential', imgs: [
      'https://images.squarespace-cdn.com/content/v1/5ee09ea8e09929041f9192e0/b4264ee0-44da-4f7a-96ca-770b8cbed992/residential-1-2580-PORT-NIGHT--03.jpg?format=2500w',
      'https://images.squarespace-cdn.com/content/v1/5ee09ea8e09929041f9192e0/47f20da8-632c-4056-8fc1-064857db6ec3/residential-2-2663-PORT-NIGHT--04.jpg?format=2500w',
      'https://images.squarespace-cdn.com/content/v1/5ee09ea8e09929041f9192e0/5c321169-fc03-4a1c-a74a-334795844dfc/residential-3-3489-PORT--03.jpg?format=2500w'
    ] },
    { label: 'Multifamily', imgs: [
      'https://images.squarespace-cdn.com/content/v1/5ee09ea8e09929041f9192e0/3946e51b-3726-4c56-964a-7dffa0fd06c0/multifamily-1-PRT016-STREET-DUSK--01-PEOPLE.jpg?format=2500w',
      'https://images.squarespace-cdn.com/content/v1/5ee09ea8e09929041f9192e0/4f208494-ffe1-4df7-b218-9a5fa3fc8739/multifamily-2-PRT016-COURTYARD-NIGHT--01-2026.jpg?format=2500w',
      'https://images.squarespace-cdn.com/content/v1/5ee09ea8e09929041f9192e0/834d6429-cc41-4cd1-8c10-d48610dc7161/multifamily-3-INV002-AERIAL-NIGHT--04-CARS.jpg?format=2500w'
    ] },
    { label: 'Resort', imgs: [
      'https://images.squarespace-cdn.com/content/v1/5ee09ea8e09929041f9192e0/2b71e3bc-07cd-4c47-92d1-a75801164156/resort-1-PRT015-INT-MASTER-BATHROOM--01-PEOPLE.jpg?format=2500w',
      'https://images.squarespace-cdn.com/content/v1/5ee09ea8e09929041f9192e0/449d9180-3a50-4501-87e8-d6b4c6d4a782/resort-2-PRT015-EXT-SEAVIEW-A--01.jpg?format=2500w',
      'https://images.squarespace-cdn.com/content/v1/5ee09ea8e09929041f9192e0/a54a770b-926f-4df6-9b56-dc5cfce7597e/resort-3-PRT015-EXT-AERIAL-A--06.jpg?format=2500w'
    ] }
  ];
  function heroImgAt(step) {
    var n = HERO_CATS.length, c = HERO_CATS[step % n], round = Math.floor(step / n);
    return c.imgs[round % c.imgs.length];
  }

  function initHero() {
    var hero = document.getElementById('kt-hero');
    if (!hero || hero.dataset.ktReady) return;
    hero.dataset.ktReady = '1';

    /* Отключаем глобальную анимацию Squarespace внутри hero: атрибут выводит элемент из-под
       правила .fadeIn{opacity:1!important}, классы preFade/fadeIn и подобные снимаем сразу и при повторном навешивании */
    var SQS_ANIM = ['preFade', 'fadeIn', 'preSlide', 'slideIn', 'preScale', 'scaleIn', 'preClip', 'clipIn', 'preFlex', 'flexIn'];
    /* Squarespace при движении мыши ещё и пишет элементам inline transition-duration/-delay (0.9s) -
       снимаем их, иначе они перебивают переходы из CSS */
    var SQS_INLINE = ['transition-duration', 'transition-delay', 'transition-property', 'transition-timing-function', 'transition'];
    function stripInline(el) {
      if (!el.style) return;
      SQS_INLINE.forEach(function (prop) { if (el.style.getPropertyValue(prop)) el.style.removeProperty(prop); });
    }
    function stripAnim(root) {
      var els = [root].concat(Array.prototype.slice.call(root.querySelectorAll('*')));
      els.forEach(function (el) {
        if (!el.hasAttribute('data-override-initial-global-animation')) el.setAttribute('data-override-initial-global-animation', '');
        SQS_ANIM.forEach(function (c) { if (el.classList.contains(c)) el.classList.remove(c); });
        stripInline(el);
      });
    }
    stripAnim(hero);
    if (window.MutationObserver) {
      new MutationObserver(function (muts) {
        muts.forEach(function (m) {
          var el = m.target;
          if (el.nodeType !== 1) return;
          if (m.attributeName === 'style') stripInline(el);
          else SQS_ANIM.forEach(function (c) { if (el.classList.contains(c)) el.classList.remove(c); });
        });
      }).observe(hero, { attributes: true, attributeFilter: ['class', 'style'], subtree: true });
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
      var r = document.createRange(); r.selectNodeContents(impact);
      var w = Math.round(r.getBoundingClientRect().width); /* ширина текста, а не зоны наведения */
      if (w) hero.style.setProperty('--kt-rule-w', w + 'px');
    }

    setHeaderH(); setRule();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setHeaderH(); setRule(); });
    setTimeout(function () { setHeaderH(); setRule(); }, 1200);
    window.addEventListener('resize', function () { setHeaderH(); setRule(); });

    /* появление элементов */
    requestAnimationFrame(function () { hero.classList.add('kt-in'); });

    /* слайдшоу + счётчик на одном таймере; слои фона создаются здесь (старые .kt-bg из Code Block убираются) */
    if (!bgWrap) return;
    Array.prototype.slice.call(bgWrap.querySelectorAll('.kt-bg')).forEach(function (el) { bgWrap.removeChild(el); });
    var layers = [];
    for (var L = 0; L < 3; L++) {
      var d = document.createElement('div'); d.className = 'kt-bg';
      bgWrap.insertBefore(d, bgWrap.firstChild); layers.push(d);
    }
    var bars = Array.prototype.slice.call(hero.querySelectorAll('.kt-count span'));
    var n = HERO_CATS.length;
    if (!n || !bars.length) return;
    bars.forEach(function (b, k) { if (HERO_CATS[k]) b.textContent = HERO_CATS[k].label; });
    var cur = 0, timer = null;
    /* слой L показывает самый поздний шаг s с s % 3 === L из {cur+1, cur, cur-1}: текущий / уходящий / запасной */
    function show() {
      for (var L = 0; L < 3; L++) {
        var step = [cur + 1, cur, cur - 1].filter(function (x) { return x >= 0 && x % 3 === L; })[0];
        var el = layers[L];
        if (step !== undefined) el.style.backgroundImage = "url('" + heroImgAt(step) + "')";
        el.classList.toggle('kt-on', step === cur);
        el.classList.toggle('kt-out', step === cur - 1);
      }
      bars.forEach(function (b, k) { b.classList.toggle('kt-on', k === cur % n); });
    }
    show();
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function start() {
      if (timer) clearInterval(timer);
      if (reduced) return;
      timer = setInterval(function () { cur += 1; show(); }, HERO_SLIDE_MS);
    }
    /* клик по категории: продолжаем цикл с неё - её следующая картинка, таймер с нуля */
    bars.forEach(function (b, k) {
      if (k >= n) return;
      b.addEventListener('click', function () {
        var round = Math.floor(cur / n);
        var next = round * n + k;
        if (next <= cur) next += n;
        cur = next; show(); start();
      });
    });
    start();
  }

  function init() { initCards(); initHero(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
