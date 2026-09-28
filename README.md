# kotiger-css

Кастомный CSS сайта kotiger.co (Squarespace 7.1).

- `src/` - модули, правим только их. Порядок подключения = порядок имён файлов.
- `dist/custom.css` - собранный файл, его грузит сайт. Вручную не править.
- Сборка: `build.ps1` (Windows) или `build.sh`.
- Подключение на сайте: Settings -> Developer Tools -> Code Injection -> Header:
  `<link rel="stylesheet" href="https://<логин>.github.io/kotiger-css/dist/custom.css">`
- Важно: файлы - обычный CSS, не LESS. Комментарии только `/* ... */`, никаких `//` и вложенных правил.
