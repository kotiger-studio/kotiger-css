# kotiger-css

Кастомный CSS сайта kotiger.co (Squarespace 7.1).

- `src/` - модули, правим только их. Порядок подключения = порядок имён файлов.
- `dist/custom.css` - собранный файл, его грузит сайт. Вручную не править.
- Сборка: `build.ps1` (Windows) или `build.sh`.
- Подключение на сайте: Settings -> Developer Tools -> Code Injection -> Header:
  `<link rel="stylesheet" href="https://<логин>.github.io/kotiger-css/dist/custom.css">`
- Подчёркивание заголовков H2 - одно правило на весь сайт в `src/02-heading-underline.css`: новый заголовок = новый селектор в списке.
- `js/site.js` - скрипты сайта (сейчас: клик по карточкам услуг на /partnership). Подключение: Code Injection -> Footer:
  `<script src="https://kotiger-studio.github.io/kotiger-css/js/site.js" defer></script>`
- Важно: файлы - обычный CSS, не LESS. Комментарии только `/* ... */`, никаких `//` и вложенных правил.
