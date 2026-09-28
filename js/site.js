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
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCards);
  else initCards();
})();
