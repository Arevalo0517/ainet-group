# AINET Group · página principal

Página de AINET Group (ES `/`, EN `/en`) construida desde `web-spec-ainet-group.md`.
React 18 + Vite + TypeScript. Sin backend: todo es estado del cliente.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # dist/ estático
```

## Antes de publicar

1. `src/config.ts`: número de WhatsApp y correo reales (hoy son placeholders).
2. Hosting SPA: redirigir todas las rutas a `index.html`
   (Vercel/Netlify/Cloudflare ya lo hacen con su preset de Vite).
3. `og:image`: todavía no hay PNG; falta agregar el logo horizontal blanco.

## Estructura

- `src/i18n/es.ts`, `en.ts`: todo el copy. `en.ts` está tipado contra `es.ts`, así que
  si falta una llave el build falla.
- `src/components/`: piezas compartidas con las páginas hermanas
  (`TopBar`, `Header`, `NetBackground`, `AinetIcon`, `ContactWidget`).
- `src/pages/GroupPage.tsx`: las 7 secciones de esta página.
- `src/styles.css`: tokens de marca y todo el layout (sin Tailwind a propósito).

## Pendiente

`/healthcare` y `/hospitality` son placeholders: sus specs aún no existen.
