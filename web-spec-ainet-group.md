# AINET Group — Website Build Spec

> Hand this whole document to the AI/developer building the page. It is self‑contained: stack, brand, layout, every piece of copy in **Spanish (ES)** and **English (EN)**, interactions with their logic, and assets.
>
> This is the **main page** of the AINET site. Two sister pages exist (AINET Healthcare and AINET Hospitality) with their own specs. All three share the same top bar, brand system and floating contact button.

---

## 1. What this page must do

AINET is an AI solutions company (Tijuana / San Diego). It builds automations and systems for any business, so they work **automatically** ("en automático"), over **WhatsApp, SMS, phone calls and email**, **in any language**.

The page must:
1. Show the "wow" **first**: visitors pick their problem and instantly see it solved. People don't like to read.
2. Show AINET connects to whatever they already use (or gives them a system).
3. Route visitors to the industry pages (Healthcare / Hospitality).
4. Let them play with a mini "automation builder" so they feel the possibilities are endless.
5. Push everyone to **"Cuéntanos tu problema" / "Tell us your problem"**.

### Content rules (do not break)
- **Never imply AI replaces staff.** AI handles the repetitive work so the team has more time for customers.
- Never say "WhatsApp only". Say **WhatsApp, SMS or phone call** (and email where it fits).
- Say **"en cualquier idioma" / "in any language"**.
- AINET is a **company**, not a CRM. **Never use the word "CRM"**. Say "sistema" / "system".
- Emphasize **"en automático" / "automatically"**.
- Use **simple words**, no jargon (no "ticket promedio", "consumo", "leads pipeline", etc.).
- **Don't repeat the same sentence** in two places on a page.
- Price is always "**from**": ES "Desde $1,500 MXN al mes" · EN "From $100 USD a month". Never mention setup or integration fees.
- Everything should look **centered, balanced and carefully placed**.

---

## 2. Recommended stack

| Layer | Choice |
|---|---|
| Framework | **React 18 + Vite + TypeScript** (works great in Lovable / similar AI builders) |
| Styling | **Tailwind CSS** (custom theme tokens below). No UI kit needed. |
| Routing | `react-router-dom` |
| i18n | Simple typed dictionaries `es.ts` / `en.ts`; language comes from the route |
| Animation | Plain CSS keyframes (listed below). No heavy animation libraries. |
| Hosting | Any static host (Vercel / Netlify / Cloudflare Pages) |
| Backend | **None needed.** All interactivity is client‑side state. |

### Routes (whole site)
| Page | ES | EN |
|---|---|---|
| AINET Group (this page) | `/` | `/en` |
| AINET Healthcare | `/healthcare` | `/en/healthcare` |
| AINET Hospitality | `/hospitality` | `/en/hospitality` |

The ES/EN toggle keeps you on the same page and switches language. Set `<html lang="es">` or `lang="en"` accordingly.

### Suggested file structure
```
src/
  i18n/es.ts, en.ts            // all copy below
  components/
    TopBar.tsx                 // page pills + ES|EN toggle (shared)
    Header.tsx
    NetBackground.tsx          // animated network lines (shared)
    AinetIcon.tsx              // brand icon SVG (shared)
    ContactWidget.tsx          // floating contact button (shared)
    sections/ProblemPicker.tsx, ConnectMap.tsx, IndustryTabs.tsx,
             AutomationBuilder.tsx, ValueCards.tsx, Faq.tsx, Contact.tsx, Footer.tsx
  pages/GroupPage.tsx
```

---

## 3. Brand system

### Colors
| Token | Hex | Use |
|---|---|---|
| `noche` (page background) | `#0D0F24` | Main background |
| `noche-deep` | `#090A1A` | Top bar background |
| `section-alt` | `#10133A` | Alternate section background |
| `indigo` | `#1B1F4B` | Icon tile, panels |
| `card` | `#161A44` | Cards, chips |
| `card-border` | `#2E3577` | Card/chip borders |
| `card-border-2` | `#2A2F66` | Value cards border |
| **`group` (cyan, this page's accent)** | **`#4DD6EA`** | Accent, CTAs, highlights |
| `healthcare` (green) | `#3DD6B5` | Healthcare accents (badge `#14A38C`) |
| `hospitality` (orange) | `#FF7A45` | Hospitality accents (badge `#E0582A`) |
| `text` | `#FFFFFF` | Headlines |
| `text-soft` | `#C9CDEB` | Body copy |
| `text-muted` | `#9AA0C8` | Small labels |
| `text-faint` | `#8C92C4` | Footer small caps |
| `bubble-in` | `#FFFFFF` bg / `#14162E` text | Customer chat bubble |
| `danger-soft` | `#FF8F8F` on `#1A1630`, border `#3A2A44` | "Hoy, a mano" card |
| `win-card` | `#13284A`, border `rgba(77,214,234,0.55)` | "Con AINET" card |

Accent transparencies used for the cyan: soft border `rgba(77,214,234,0.45)`, tint fill `rgba(77,214,234,0.12–0.16)`.

### Typography (Google Fonts)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Michroma&family=Sora:wght@400;500;600;700&display=swap" rel="stylesheet">
```
- **Michroma** (weight 400 only) → H1, H2, eyebrows (small uppercase labels), industry tabs, logo wordmark.
- **Sora** 400/600/700 → everything else (body, buttons, chips).
- Eyebrow style: Michroma, 13px, `letter-spacing: 0.28em`, uppercase, accent color.
- H1: Michroma 400, `clamp(32px, 4.2vw, 56px)`, line‑height 1.18, `text-wrap: balance`, max‑width 960px.
- H2: Michroma 400, `clamp(28px, 3.4vw, 44px)`, line‑height 1.2, `text-wrap: balance`.
- Body: Sora 18–20px, line‑height 1.6, color `text-soft`.
- Headline pattern: first part white, **second part in the accent color** (e.g. "Tenemos tu solución. **Y si no existe, la creamos.**").

### Shapes & spacing
- Pills/buttons: `border-radius: 999px`, min-height 44–50px (touch friendly).
- Cards: radius 22–32px; padding 26–36px.
- Sections: `padding: 104px 24px`, content `max-width: 1160–1200px`, centered.
- Chat bubbles: customer = white, radius `18px 18px 18px 6px`, left aligned. AINET reply = accent bg, dark text, weight 600, radius `18px 18px 6px 18px`, right aligned. Under the reply a 12px muted label like "Respuesta automática".
- Focus states: `outline: 2px solid <accent>; outline-offset: 3px`.
- Respect `prefers-reduced-motion` (turn all animations off).

### Logo / icon (inline SVG)
The AINET icon is an "A" made of a network: a rounded indigo tile, two white legs, a white crossbar and four colored nodes. Node color = the page accent.
```html
<svg viewBox="0 0 1080 1080" width="44" height="44" aria-hidden="true">
  <rect x="20" y="20" width="1040" height="1040" rx="250" fill="#1B1F4B" stroke="#3A4290" stroke-width="16"/>
  <line x1="283" y1="634" x2="797" y2="634" stroke="#FFF" stroke-width="40"/>
  <path d="M540 300 L338 797 M540 300 L742 797" stroke="#FFF" stroke-width="90" stroke-linecap="round" fill="none"/>
  <circle cx="540" cy="297" r="64" fill="#4DD6EA"/>
  <circle cx="283" cy="634" r="56" fill="#4DD6EA"/>
  <circle cx="540" cy="634" r="64" fill="#4DD6EA"/>
  <circle cx="797" cy="634" r="56" fill="#4DD6EA"/>
</svg>
```
Wordmark next to it: Michroma 22px, `letter-spacing: 0.18em`, "**AI**NET" with "AI" in the accent color and "NET" white.

PNG logos also exist in the AINET project files (`AINET - Logo horizontal · blanco.png`, `AINET - solo icono.png`); use them for favicon / social preview image.

---

## 4. Shared components

### 4.1 Top bar (above the header, on every page)
- Background `#090A1A`, bottom border `1px solid rgba(255,255,255,0.08)`, content max-width 1200px, padding 10px 24px, flex space-between, wraps on mobile.
- Left: 3 pills linking to the 3 pages: **AINET GROUP** (cyan), **AINET HEALTHCARE** (green), **AINET HOSPITALITY** (orange). Michroma 11px, letter-spacing 0.14em.
  - Current page: filled with its color, text `#0D0F24`, `aria-current="page"`.
  - Others: transparent, text in their own color, border `rgba(255,255,255,0.14)`.
- Right: segmented toggle **ES | EN** (active = white bg, dark text; inactive = transparent, `#C9CDEB`).

### 4.2 Animated network background (`NetBackground`)
Absolute, full size SVG behind the hero and the contact section (`pointer-events: none`). About 25–35 random nodes with thin connecting lines in the accent color: lines `stroke-opacity: 0.16`, width 1.5; nodes small circles that pulse; a few "flow" lines with moving dashes.
```css
@keyframes ainetDrift{0%{transform:translate(0,0)}50%{transform:translate(-36px,22px)}100%{transform:translate(0,0)}}
@keyframes ainetPulse{0%,100%{opacity:.25}50%{opacity:1}}
@keyframes ainetFlow{to{stroke-dashoffset:-240}}
.net-a{animation:ainetDrift 20s ease-in-out infinite}
.net-b{animation:ainetDrift 26s ease-in-out infinite reverse}
.node{animation:ainetPulse 4.5s ease-in-out infinite}
.flow{stroke-dasharray:6 18;animation:ainetFlow 7s linear infinite}
```
Put half the network in group `.net-a` and half in `.net-b`. Add a soft radial glow on the hero: `radial-gradient(70% 60% at 70% 20%, rgba(77,214,234,0.12), transparent 70%)`.

### 4.3 Floating contact button (`ContactWidget`): mini‑chat, on every page
Fixed bottom-right (20px). Closed, it's a pill in the accent color with a chat icon and a gentle pulsing ring:
- ES: **"Cuéntanos tu problema"** · EN: **"Tell us your problem"**. When open it reads "Cerrar ✕" / "Close ✕".

Open panel (width `min(370px, 100vw - 40px)`, bg `#12153A`, radius 24px, shadow). It looks like a chat with AINET:
1. Header: AINET icon + "AINET" + subtitle in accent: ES "Asesoría para tu negocio" · EN "Advice for your business".
2. AINET bubble: ES "¡Hola! 👋 ¿Qué te quita más tiempo en tu negocio?" · EN "Hi! 👋 What takes up most of your time at work?"
3. Four answer chips (right‑aligned, outlined in accent; selected = filled). Each one triggers a different AINET reply bubble:

| ES chip | ES reply | EN chip | EN reply |
|---|---|---|---|
| Contestar mensajes | Eso lo resolvemos en automático, a cualquier hora. | Answering messages | We handle that automatically, any time of day. |
| Agendar y confirmar | Eso lo resolvemos en automático: agenda, recordatorios y confirmaciones. | Booking and confirming | We handle that automatically: bookings, reminders and confirmations. |
| Cobrar y dar seguimiento | Eso lo resolvemos en automático: links de pago y seguimiento. | Getting paid and following up | We handle that automatically: payment links and follow-ups. |
| Otra cosa | Cuéntanos. Si la solución no existe, la creamos. | Something else | Tell us. If the solution doesn't exist, we build it. |

4. After any chip is chosen, show a second AINET bubble + buttons:
   - ES "Escríbenos y te armamos un mapa de tu solución. Tú decides con calma si lo hacemos." · EN "Message us and we'll put together a map of your solution. Take your time deciding if we build it."
   - Big accent button **WhatsApp** (prefill the chosen problem in the message: `https://wa.me/<NUMBER>?text=...`).
   - Two outline buttons: **Correo/Email** (`mailto:`) and the Instagram handle of the page (`@ainet_group` here).
5. Fine print (12px, muted, centered): ES "Sin costo · Sin compromiso · En cualquier idioma" · EN "Free · No commitment · In any language".

> ⚠️ **Placeholders to fill:** WhatsApp number and contact email aren't defined yet. Keep them in one config file (`src/config.ts`) so they can be set once for the whole site.

---

## 5. Page layout, section by section

Page wrapper: background `#0D0F24`, text white, font Sora, `overflow-x: hidden`.

### 5.0 Header
Max-width 1200px, padding 22px 24px, bottom border `rgba(255,255,255,0.08)`. Left: icon (44px) + wordmark "AINET". Right: anchor links (15px, `#C9CDEB`) + CTA pill (cyan, dark text, 600).

| ES | EN | Anchor |
|---|---|---|
| Tu problema | Your problem | `#problema` |
| Tu industria | Your industry | `#industria` |
| Conexiones | Integrations | `#conecta` |
| Arma tu automatización | Build your automation | `#arma` |
| **Cuéntanos tu problema** (button) | **Tell us your problem** | `#contacto` |

### 5.1 Hero + Problem picker (`#inicio`): the "wow"
Background: Noche + radial cyan glow + `NetBackground`. Padding 72px 24px 96px. Everything centered.

- Eyebrow: **AI SOLUTIONS FOR BUSINESS** (same in both languages; it's the brand tagline).
- H1: ES "Tenemos tu solución. **Y si no existe, la creamos.**" · EN "We have your solution. **If not, we build it.**"
- Price pill (cyan tint bg, cyan soft border, bold cyan text): ES "Desde $1,500 MXN al mes" · EN "From $100 USD a month"
- Prompt (20px, `#C9CDEB`, id `problema`): ES "¿Qué te quita más tiempo hoy? Elige uno y mira cómo se resuelve." · EN "What takes up most of your time today? Pick one and see how it gets solved."
- **Row of 6 problem chips** (pills, 16px/600). Selected: cyan bg, dark text. Others: `#161A44` bg, border `#2E3577`, white text. `aria-pressed`. First one selected by default.
- **3 cards in a responsive grid** (`repeat(auto-fit, minmax(320px, 1fr))`, gap 20px), content changes with the selected chip:
  1. **"HOY, A MANO" / "TODAY, BY HAND"**: bg `#1A1630`, border `#3A2A44`, eyebrow color `#FF8F8F`. 3 items, each with a round ✕ marker (`rgba(255,143,143,0.15)` bg, `#FF8F8F` text).
  2. **"CON AINET" / "WITH AINET"**: bg `#13284A`, border cyan 55%, 3 items with a filled cyan ✓ marker.
  3. **"ASÍ SE VE" / "HERE'S WHAT IT LOOKS LIKE"**: bg `#161A44`, a customer bubble, an AINET reply bubble and a meta label (12px, `#8BE6F2`). If the customer message is empty, show only the reply.
- Bottom line: ES "¿Tu problema no está aquí? **Si no existe la solución, la creamos.**" · EN "Don't see your problem here? **If the solution doesn't exist, we build it.**" + cyan button "Cuéntanos tu problema" / "Tell us your problem" → `#contacto`.

**Problem data, ES:**
```ts
[
 { label:'No contesto a tiempo',
   antes:['Un cliente escribe a las 11 p.m.','Nadie contesta hasta el otro día','Se va con la competencia'],
   ahora:['Recibe respuesta en segundos','Su cita queda agendada','Le llega un recordatorio un día antes'],
   cliente:'¿Tienen cita para mañana?', respuesta:'¡Sí! Tengo 10:00 o 12:30. ¿Cuál prefieres?', meta:'Respuesta automática · 11:04 p.m.' },
 { label:'Confirmo citas a mano',
   antes:['Mandas mensaje uno por uno','La mitad no contesta','Huecos en tu agenda'],
   ahora:['Recordatorio automático a cada cliente','Confirman o reprograman con un mensaje','Tu agenda se llena sola'],
   cliente:'Sí confirmo, ahí estaré 👍', respuesta:'¡Perfecto! Te esperamos mañana a las 9:00 a.m.', meta:'Recordatorio automático' },
 { label:'Me pagan tarde',
   antes:['Llevas la cuenta en una libreta','Te da pena cobrar','El dinero tarda semanas'],
   ahora:['Recordatorio amable el día del pago','Link para pagar en un clic','Aviso cuando ya pagaron'],
   cliente:'¿Me pasas el link otra vez?', respuesta:'Claro, aquí está tu link de pago. ¡Gracias!', meta:'Cobranza automática' },
 { label:'Capturo datos a mano',
   antes:['Copias facturas a Excel','Errores de dedo','Horas cada semana'],
   ahora:['Cada factura se registra sola','Todo ordenado en tu hoja','Reporte listo cuando lo pidas'],
   cliente:'[Factura recibida por correo]', respuesta:'Registrada en tu hoja: proveedor, monto y fecha ✓', meta:'Captura automática' },
 { label:'Pierdo prospectos',
   antes:['Te escriben y se te olvida','No sabes quién está interesado','Ventas que se enfrían'],
   ahora:['Cada prospecto queda registrado','Recibe su cotización en minutos','Seguimiento hasta que compra'],
   cliente:'Hola, ¿cuánto cuesta el servicio?', respuesta:'¡Hola! Te comparto la cotización. ¿Agendamos una llamada?', meta:'Respuesta automática' },
 { label:'No regresan mis clientes',
   antes:['Compran una vez','No sabes quién es frecuente','No tienes cómo invitarlos de vuelta'],
   ahora:['Programa de lealtad automático','Mensajes en el momento justo','Clientes que regresan'],
   cliente:'', respuesta:'¡Hola Ana! Ya juntaste 10 visitas: tu próximo café va por la casa ☕', meta:'Programa de lealtad' },
]
```
**Problem data, EN:**
```ts
[
 { label:'I can’t answer in time',
   antes:['A customer writes at 11 p.m.','Nobody answers until the next day','They go to the competition'],
   ahora:['They get an answer in seconds','Their appointment gets booked','They get a reminder the day before'],
   cliente:'Do you have anything tomorrow?', respuesta:'Yes! I have 10:00 or 12:30. Which works best?', meta:'Automatic reply · 11:04 p.m.' },
 { label:'I confirm appointments by hand',
   antes:['You text people one by one','Half of them don’t reply','Gaps in your schedule'],
   ahora:['Automatic reminder to every customer','They confirm or reschedule with one message','Your schedule fills itself'],
   cliente:'Confirmed, I’ll be there 👍', respuesta:'Perfect! See you tomorrow at 9:00 a.m.', meta:'Automatic reminder' },
 { label:'I get paid late',
   antes:['You track it in a notebook','Asking for money feels awkward','The money takes weeks'],
   ahora:['A friendly reminder on the due date','A one-click payment link','A heads-up when they’ve paid'],
   cliente:'Can you send me the link again?', respuesta:'Of course, here’s your payment link. Thanks!', meta:'Automatic collections' },
 { label:'I enter data by hand',
   antes:['You copy invoices into Excel','Typos','Hours every week'],
   ahora:['Every invoice logs itself','Everything organized in your sheet','Reports ready whenever you ask'],
   cliente:'[Invoice received by email]', respuesta:'Logged in your sheet: vendor, amount and date ✓', meta:'Automatic data entry' },
 { label:'I lose leads',
   antes:['They message you and you forget','You don’t know who’s interested','Sales that go cold'],
   ahora:['Every lead is logged','They get their quote in minutes','Follow-up until they buy'],
   cliente:'Hi, how much is the service?', respuesta:'Hi! Here’s your quote. Shall we book a call?', meta:'Automatic reply' },
 { label:'My customers don’t come back',
   antes:['They buy once','You don’t know who your regulars are','You have no way to invite them back'],
   ahora:['Automatic loyalty program','Messages at just the right time','Customers who come back'],
   cliente:'', respuesta:'Hi Ana! You’ve made 10 visits: your next coffee is on the house ☕', meta:'Loyalty program' },
]
```

### 5.2 Connections map (`#conecta`): "everything connected"
Background `#10133A`. Centered header:
- Eyebrow: ES "SE CONECTA CON LO QUE YA USAS" · EN "WORKS WITH WHAT YOU ALREADY USE"
- H2: ES "Todo tu negocio, **conectado.**" · EN "Your whole business, **connected.**"
- P: ES "Tus canales y tus herramientas trabajan juntos, sin que cambies nada. Y responde en el idioma en que te escriba tu cliente." · EN "Your channels and tools work together, without changing a thing. And it replies in whatever language your customer writes."

**Visual map (3 columns, wraps to stacked on mobile):**
- Left column, label "TUS CANALES / YOUR CHANNELS" (Michroma 11px, muted), right‑aligned pills, each followed by an **animated dashed wire** flowing toward the center:
  ES: WhatsApp · SMS · Llamadas · Correo · Instagram · Facebook y Messenger · Tu sitio web
  EN: WhatsApp · SMS · Phone calls · Email · Instagram · Facebook & Messenger · Your website
- Center (200px): AINET icon 120px (cyan stroke on tile) with **two pulsing rings** around it, wordmark "AINET" below.
- Right column, label "TUS HERRAMIENTAS / YOUR TOOLS", wires flowing out from the center to left‑aligned pills:
  ES: Google Calendar · Excel y Google Sheets · Stripe · Mercado Pago · Shopify · Tu punto de venta
  EN: Google Calendar · Excel & Google Sheets · Stripe · Mercado Pago · Shopify · Your POS
- Below: a short vertical animated wire into a **filled cyan pill**: ES "Y cualquier sistema que ya uses" · EN "And any system you already use", then muted line ES "¿No tienes sistema? Te lo damos." · EN "Don't have a system? We'll give you one."

Pills: border `#2E3577`, bg `#161A44`, radius 999px, padding 11px 18px, 15px.
```css
.wire{flex:1 1 40px;min-width:24px;height:2px;
  background:repeating-linear-gradient(90deg,rgba(77,214,234,.85) 0 8px,transparent 8px 18px);
  background-size:36px 2px;animation:wireFlow 1.4s linear infinite}
.wire-r{animation-direction:reverse}
.vwire{width:2px;height:56px;background:repeating-linear-gradient(180deg,rgba(77,214,234,.85) 0 8px,transparent 8px 18px);
  background-size:2px 36px;animation:vwireFlow 1.4s linear infinite reverse}
.ring{position:absolute;inset:-14px;border:2px solid rgba(77,214,234,.45);border-radius:56px;animation:ringPulse 3s ease-out infinite}
.ring2{animation-delay:1.5s}
@keyframes wireFlow{to{background-position:36px 0}}
@keyframes vwireFlow{to{background-position:0 36px}}
@keyframes ringPulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.45);opacity:0}}
```

### 5.3 Industry tabs (`#industria`)
Background Noche. Header: eyebrow (colored with the **selected industry's color**) ES "TU INDUSTRIA" · EN "YOUR INDUSTRY"; H2 ES "¿A qué se dedica tu negocio?" · EN "What does your business do?"

Tabs (`role="tablist"`, Michroma 13px, letter-spacing 0.16em, pill, border in the tab's color; selected = filled with its color + dark text): **NEGOCIOS / BUSINESS** (cyan), **HEALTHCARE** (green), **HOSPITALITY** (orange).

Panel: bg `#161A44`, border = selected color at 45%, radius 32px, padding 36px, two columns:
- Left: "AINET **{name}**" (Michroma 24px, name in color), description, 4 bullets (8px colored dots), button in the industry color + Instagram handle text in color.
- Right: a 4‑bubble chat (customer white / AINET colored) + "Respuesta automática" / "Automatic reply".

| | NEGOCIOS / BUSINESS | HEALTHCARE | HOSPITALITY |
|---|---|---|---|
| color | `#4DD6EA` | `#3DD6B5` | `#FF7A45` |
| name | FOR BUSINESS | HEALTHCARE | HOSPITALITY |
| desc ES | Despachos, inmobiliarias, contadores, talleres, tiendas y servicios. | Consultorios, dentistas, laboratorios, spas y turismo médico. | Restaurantes, cafeterías, bares, hoteles y meal prep. |
| desc EN | Law firms, real estate, accountants, auto shops, retail and services. | Private practices, dentists, labs, spas and medical tourism. | Restaurants, cafés, bars, hotels and meal prep. |
| bullets ES | Cotizaciones y seguimiento a prospectos · Captura de facturas y reportes · Cobranza con link de pago · Clientes y citas en un solo lugar | Citas, recordatorios y confirmaciones · Cotizaciones para pacientes de EE. UU. · Avisos de resultados · Seguimiento después de la consulta | Reservaciones y lista de espera · Pedidos por mensaje · Programas de lealtad · Respuesta a cada reseña |
| bullets EN | Quotes and lead follow-up · Invoice capture and reports · Collections with payment links · Customers and appointments in one place | Appointments, reminders and confirmations · Quotes for patients from abroad · Results notices · Follow-up after the visit | Reservations and waitlist · Orders by message · Loyalty programs · A reply to every review |
| button ES | Cuéntanos tu problema → (`#contacto`) | Conoce AINET Healthcare → (`/healthcare`) | Conoce AINET Hospitality → (`/hospitality`) |
| button EN | Tell us your problem → (`#contacto`) | Explore AINET Healthcare → (`/en/healthcare`) | Explore AINET Hospitality → (`/en/hospitality`) |
| handle | @ainet_group | @ainet_healthcare | @ainet_hospitality |

Chats (customer → AINET → customer → AINET):
- **Business ES:** "Hola, ¿cuánto cuesta un avalúo?" → "¡Hola! Te mando la cotización ahora. ¿Te agendo una visita?" → "Sí, el jueves de ser posible" → "Listo: jueves 11:00 a.m. ✓"
- **Business EN:** "Hi, how much is an appraisal?" → "Hi! Sending the quote now. Shall I book a visit?" → "Yes, Thursday if possible" → "Done: Thursday 11:00 a.m. ✓"
- **Healthcare ES** (shows the multilingual point, written in English on purpose): "Hi! How much is a dental crown? I live in San Diego" → "Hi! We’ll send your quote and help you plan your visit." → "Great, can I come next Friday?" → "Booked: Friday 10:00 a.m. ✓"
- **Healthcare EN** (written in Spanish on purpose): "Hola, ¿cuánto cuesta una corona dental?" → "¡Hola! Te mandamos la cotización y te ayudamos a planear tu visita." → "¿Puedo ir el próximo viernes?" → "Agendado: viernes 10:00 a.m. ✓"
- **Hospitality ES:** "¿Mesa para 6 el viernes?" → "Claro: viernes 8 p.m., mesa para 6 ✓" → "¿Tienen opciones veganas?" → "¡Sí! Te mando el menú 🌱"
- **Hospitality EN:** "Table for 6 on Friday?" → "Sure: Friday 8 p.m., table for 6 ✓" → "Do you have vegan options?" → "Yes! Sending you the menu 🌱"

### 5.4 Automation builder (`#arma`): "the possibilities are endless"
Centered header:
- Eyebrow ES "LAS POSIBILIDADES SON INFINITAS" · EN "THE POSSIBILITIES ARE ENDLESS"
- H2 ES "Arma tu propia automatización." · EN "Build your own automation."
- P ES "Combina un momento con una acción. Esto es solo una probadita: nosotros armamos la tuya." · EN "Pair a moment with an action. This is just a taste: we'll build yours."

Two columns of selectable full‑width option buttons (radius 16px, bg `#161A44`, border `#2E3577`; selected = bg `rgba(77,214,234,0.16)`, border cyan):
- Column 1 label "1 · CUANDO…" / "1 · WHEN…". Options are "Cuando " + trigger:
  ES triggers: llega un mensaje nuevo · alguien agenda una cita · un cliente paga · es viernes a las 6 p.m. · se acaba el inventario
  EN ("When " + …): a new message comes in · someone books an appointment · a customer pays · it’s Friday at 6 p.m. · inventory runs low
- Column 2 label "2 · ENTONCES…" / "2 · THEN…". Options (first letter capitalized):
  ES: se le responde al instante · se manda un recordatorio un día antes · se envía su recibo y se registra en tu hoja · te llega un reporte de ventas a tu correo · se hace el pedido a tu proveedor
  EN: they get an instant reply · a reminder goes out the day before · their receipt is sent and logged in your sheet · a sales report lands in your inbox · an order is placed with your supplier

Result card below (cyan border, tinted bg, centered): eyebrow "TU AUTOMATIZACIÓN" / "YOUR AUTOMATION"; sentence (Michroma‑sized large text) **"Cuando {trigger}, {action}."** / **"When {trigger}, {action}."** with trigger and action in cyan; small line ES "Funciona por WhatsApp, SMS, llamada, correo y con cualquier sistema que ya uses." · EN "Works over WhatsApp, text, phone and email, and with any system you already use." Defaults: first trigger + first action.

### 5.5 Value cards (3 in a row, wrap on mobile)
Cards: bg `#161A44`, border `#2A2F66`, radius 22px, padding 26px; title 19px/600, text 15px `#B7BCE0`.
| ES title | ES text | EN title | EN text |
|---|---|---|---|
| Precio accesible | Desde $1,500 MXN al mes. El precio final depende de lo que necesite tu negocio. | Affordable pricing | From $100 USD a month. The final price depends on what your business needs. |
| Empiezas con uno | Resolvemos lo que más te urge y vamos sumando a tu ritmo. | Start with one | We solve what’s most urgent and add more at your pace. |
| Sin cambiar nada | Se conecta a lo que ya usas. ¿No tienes sistema? Te lo damos. | Nothing to change | It connects to what you already use. Don’t have a system? We’ll give you one. |

### 5.6 FAQ (accordion, first item open, one open at a time, +/− icon)
Title ES "Preguntas frecuentes" · EN "FAQ".
| ES Q | ES A | EN Q | EN A |
|---|---|---|---|
| ¿La IA reemplaza a mi equipo? | No. Se encarga de lo repetitivo para que tu equipo tenga más tiempo para atender a tus clientes. | Does AI replace my team? | No. It takes care of the repetitive work so your team has more time for your customers. |
| ¿Y si mi problema es muy específico? | Mejor. Escuchamos cómo trabajas hoy y construimos la solución a la medida. Si no existe, la creamos. | What if my problem is very specific? | Even better. We learn how you work today and build the solution around it. If it doesn’t exist, we create it. |
| ¿Tengo que cambiar el sistema que ya uso? | No. Nos conectamos a cualquier sistema que ya uses. Si no tienes uno, te lo damos. | Do I have to change the system I use? | No. We connect to any system you already use. Don’t have one? We’ll give you one. |
| ¿Cuánto cuesta? | Menos de lo que imaginas: soluciones desde $1,500 MXN al mes. Cuéntanos tu problema y te damos el número exacto. | How much does it cost? | Less than you’d think: solutions from $100 USD a month. Tell us your problem and we’ll give you the exact number. |

### 5.7 Contact (`#contacto`)
Background: `radial-gradient(60% 70% at 50% 30%, rgba(77,214,234,0.14), transparent 70%), #10133A` + `NetBackground`. Centered: AINET icon ~96px; H2 ES "Cuéntanos tu problema. **Nosotros lo resolvemos.**" · EN "Tell us your problem. **We’ll solve it.**"; P ES "Mándanos mensaje y en una plática te decimos exactamente qué podemos hacer por tu negocio." · EN "Send us a message and in one call we’ll tell you exactly what we can do for your business."
Buttons (pills, min-height 56px): **WhatsApp** (filled cyan, chat icon), **Correo / Email** (outline, envelope icon), **Instagram** (outline, IG icon → instagram.com/ainet_group).

### 5.8 Footer
Top border `rgba(255,255,255,0.08)`, centered: wordmark "AINET"; row of handles in their colors: @ainet_group (cyan) · @ainet_healthcare (green) · @ainet_hospitality (orange); small caps line **SAN DIEGO · TIJUANA** (13px, letter-spacing 0.3em, `#8C92C4`).

---

## 6. Responsive & accessibility checklist
- Works from 360px wide up. No horizontal scroll. Side padding 16–24px on mobile.
- Hero cards stack to 1 column; connection map stacks (channels → AINET → tools); industry panel stacks.
- All tap targets ≥ 44px. Buttons have `aria-pressed` / `role="tab"` + `aria-selected` where relevant.
- Text contrast AA on dark backgrounds.
- `prefers-reduced-motion`: disable net drift, pulses, wires, rings, widget pulse.
- SEO: `<title>` ES "AINET · Soluciones de IA para tu negocio" / EN "AINET · AI solutions for your business"; meta description from the hero; Open Graph image = AINET logo.

## 7. Things to confirm before launch
- WhatsApp number, contact email (placeholders).
- Instagram URLs: instagram.com/ainet_group, /ainet_healthcare, /ainet_hospitality.
- Prices: ES "Desde $1,500 MXN al mes" · EN "From $100 USD a month".
