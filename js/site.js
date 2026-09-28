/* KOTIGER site scripts. Подключение: Code Injection -> Footer
   <script src="https://kotiger-studio.github.io/kotiger-css/js/site.js" defer></script> */
(function () {
  'use strict';

  /* Partnership: карточки услуг открывают страницу услуги в новой вкладке.
     Ссылка выбирается по заголовку карточки, поэтому порядок карточек можно менять.
     Новая карточка = новая строка в SERVICE_LINKS (заголовок как на сайте -> адрес). */
  var SERVICES_SECTION = 'section[data-section-id="6ab2a23a65834a7aceb03600"]';
  var SERVICE_LINKS = {
    'Exteriors': '/services-exteriors',
    'Interiors': '/services-interiors',
    '3D Floor Plans': '/services-3d-floor-plans',
    '3D Site Plans': '/services-3d-site-plans',
    '3D Virtual Tours': '/services-3d-virtual-tours',
    'CGI + AI Video': '/services-3d-videos'
  };

  function cardUrl(card) {
    var title = card.querySelector('.list-item-content__title');
    return title ? SERVICE_LINKS[title.textContent.trim()] : null;
  }

  function openCard(card) {
    var url = cardUrl(card);
    if (url) window.open(url, '_blank', 'noopener');
  }

  function findCard(target) {
    var card = target.closest && target.closest(SERVICES_SECTION + ' .list-item');
    return card && cardUrl(card) ? card : null;
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('a')) return; // обычные ссылки внутри карточки работают как есть
    var card = findCard(e.target);
    if (card) { e.preventDefault(); openCard(card); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var card = findCard(e.target);
    if (card && e.target === card) { e.preventDefault(); openCard(card); }
  });

  function initCards() {
    document.querySelectorAll(SERVICES_SECTION + ' .list-item').forEach(function (card) {
      if (!cardUrl(card)) return;
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'link');
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCards);
  else initCards();
})();
