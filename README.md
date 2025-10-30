# mmmskin.ru (Vite + React + TS)

## Скрипты
- `npm run dev` — локальная разработка
- `npm run build` — сборка
- `npm run preview` — предпросмотр сборки

## Переменные окружения (.env.local)
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

## GitHub Pages
Для корректной работы роутинга SPA используйте `index.html` (c сохранением пути) и `404.html` (возврат на `index.html`).

### Деплой вручную
```
npm install
npm run build
```
Загрузите содержимое `dist/` в ветку `gh-pages` и включите Pages (Branch: gh-pages /root).

Или GitHub Actions: setup-node → npm ci → npm run build → peaceiris/actions-gh-pages.
