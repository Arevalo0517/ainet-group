import { useEffect, useRef, useState } from "react";
import AinetIcon from "../components/AinetIcon";
import ContactWidget from "../components/ContactWidget";
import Header from "../components/Header";
import { IconInstagram, IconMail, IconWhatsApp } from "../components/Icons";
import NetBackground from "../components/NetBackground";
import TopBar from "../components/TopBar";
import { config, waLink } from "../config";
import { dict, type Dict, type Lang } from "../i18n";

function SectionHead({
  eyebrow,
  h2a,
  h2b,
  p,
  accent,
}: {
  eyebrow: string;
  h2a: string;
  h2b?: string;
  p?: string;
  accent?: string;
}) {
  return (
    <div className="section-head">
      <p className="eyebrow" style={accent ? { color: accent } : undefined}>
        {eyebrow}
      </p>
      <h2>
        {h2a}
        {h2b && (
          <>
            {" "}
            <span className="accent">{h2b}</span>
          </>
        )}
      </h2>
      {p && <p className="lead">{p}</p>}
    </div>
  );
}

function Hero({ d }: { d: Dict }) {
  const [sel, setSel] = useState(0);
  const p = d.problems[sel];
  const rowRef = useRef<HTMLDivElement>(null);

  // keep the selected chip centred in the mobile scroll row
  useEffect(() => {
    if (!window.matchMedia("(max-width: 639px)").matches) return;
    const el = rowRef.current?.children[sel] as HTMLElement | undefined;
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [sel]);

  return (
    <section className="hero" id="inicio">
      <NetBackground />
      <div className="container hero-inner">
        <p className="eyebrow">{d.hero.eyebrow}</p>
        <h1>
          {d.hero.h1a} <span className="accent">{d.hero.h1b}</span>
        </h1>
        <p className="price-pill">{d.hero.price}</p>
        <div id="problema" className="prompts">
          <p className="prompt">{d.hero.prompt}</p>
          <p className="prompt prompt-m">{d.hero.promptShort}</p>
        </div>
        <div className="chips" role="group" aria-label={d.hero.prompt} ref={rowRef}>
          {d.problems.map((item, i) => (
            <button
              key={item.label}
              type="button"
              className={i === sel ? "chip chip--on" : "chip"}
              aria-pressed={i === sel}
              onClick={() => setSel(i)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="cards3">
          <article className="card card--before">
            <p className="card-eyebrow">{d.hero.cardBefore}</p>
            <ul className="items">
              {p.antes.map((t) => (
                <li key={t}>
                  <span className="mark mark--x">✕</span>
                  {t}
                </li>
              ))}
            </ul>
          </article>
          <article className="card card--after">
            <p className="card-eyebrow">{d.hero.cardAfter}</p>
            <ul className="items">
              {p.ahora.map((t) => (
                <li key={t}>
                  <span className="mark mark--ok">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </article>
          <article className="card card--chat">
            <p className="card-eyebrow">{d.hero.cardChat}</p>
            {p.cliente && <p className="bubble bubble--in">{p.cliente}</p>}
            <p className="bubble bubble--out">{p.respuesta}</p>
            <p className="meta">{p.meta}</p>
          </article>
        </div>

        <div className="hero-card-m" key={sel}>
          <p className="card-eyebrow">{d.hero.cardChat}</p>
          {p.cliente && <p className="bubble bubble--in">{p.cliente}</p>}
          <p className="bubble bubble--out">{p.respuesta}</p>
          <p className="meta">{p.meta}</p>
          <p className="card-eyebrow card-eyebrow--ok">{d.hero.cardAfter}</p>
          <ul className="items">
            {p.ahora.map((t) => (
              <li key={t}>
                <span className="mark mark--ok">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <p className="strike">
            {p.antes.map((t, i) => (
              <span key={t}>
                <s>{t}</s>
                {i < p.antes.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </div>

        <p className="hero-foot">
          {d.hero.noMatch} <strong>{d.hero.noMatchB}</strong>
        </p>
        <a className="btn btn--accent hero-cta" href="#contacto">
          {d.hero.cta}
        </a>
      </div>
    </section>
  );
}

function ConnectMap({ d }: { d: Dict }) {
  return (
    <section className="section section--alt" id="conecta">
      <div className="container">
        <SectionHead
          eyebrow={d.connect.eyebrow}
          h2a={d.connect.h2a}
          h2b={d.connect.h2b}
          p={d.connect.p}
        />
        <div className="map">
          <div className="map-col">
            <p className="map-label">{d.connect.channelsLabel}</p>
            {d.connect.channels.map((c) => (
              <div className="map-row map-row--left" key={c}>
                <span className="map-pill">{c}</span>
                <span className="wire wire-r" />
              </div>
            ))}
          </div>
          <span className="vwire vwire--m" aria-hidden="true" />
          <div className="map-center">
            <div className="node-wrap">
              <span className="ring" />
              <span className="ring ring2" />
              <AinetIcon size={120} />
            </div>
            <span className="brand-word map-word">
              <span className="brand-ai">AI</span>NET
            </span>
          </div>
          <span className="vwire vwire--m" aria-hidden="true" />
          <div className="map-col">
            <p className="map-label">{d.connect.toolsLabel}</p>
            {d.connect.tools.map((c) => (
              <div className="map-row" key={c}>
                <span className="wire" />
                <span className="map-pill">{c}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="map-foot">
          <span className="vwire" aria-hidden="true" />
          <span className="any-system">{d.connect.anySystem}</span>
          <span className="muted">{d.connect.noSystem}</span>
        </div>
      </div>
    </section>
  );
}

function IndustryTabs({ d }: { d: Dict }) {
  const [sel, setSel] = useState(0);
  const item = d.industry.tabs[sel];
  return (
    <section className="section" id="industria">
      <div className="container">
        <SectionHead eyebrow={d.industry.eyebrow} h2a={d.industry.h2} accent={item.color} />
        <div className="tabs" role="tablist" aria-label={d.industry.eyebrow}>
          {d.industry.tabs.map((t, i) => (
            <button
              key={t.key}
              role="tab"
              type="button"
              aria-selected={i === sel}
              className={i === sel ? "tab tab--on" : "tab"}
              style={
                i === sel
                  ? { background: t.color, borderColor: t.color, color: "#0D0F24" }
                  : { borderColor: t.color, color: t.color }
              }
              onClick={() => setSel(i)}
            >
              {t.tab}
            </button>
          ))}
        </div>
        <div className="ind-panel" style={{ ["--accent" as string]: item.color }} role="tabpanel">
          <p className="ind-title">
            AINET <span className="accent">{item.name}</span>
          </p>
          <p className="ind-desc">{item.desc}</p>
          <div className="ind-chat">
            {item.chat.map((line, i) => (
              <p key={line} className={i % 2 === 0 ? "bubble bubble--in" : "bubble bubble--out"}>
                {line}
              </p>
            ))}
            <p className="meta">{d.industry.autoReply}</p>
          </div>
          <ul className="bullets">
            {item.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <a className="btn btn--accent ind-cta" href={item.href}>
            {item.cta} →
          </a>
          <p className="handle">{item.handle}</p>
        </div>
      </div>
    </section>
  );
}

function AutomationBuilder({ d }: { d: Dict }) {
  const [t, setT] = useState(0);
  const [a, setA] = useState(0);
  return (
    <section className="section section--alt" id="arma">
      <div className="container">
        <SectionHead eyebrow={d.builder.eyebrow} h2a={d.builder.h2} p={d.builder.p} />
        <div className="builder-wrap">
          <div className="builder">
            <div className="builder-col">
              <p className="opt-label">{d.builder.when}</p>
              <div className="opt-row">
                {d.builder.triggers.map((tr, i) => (
                  <button
                    key={tr}
                    type="button"
                    className={i === t ? "opt opt--on" : "opt"}
                    aria-pressed={i === t}
                    onClick={() => setT(i)}
                  >
                    {d.builder.whenPrefix}
                    {tr}
                  </button>
                ))}
              </div>
            </div>
            <div className="builder-col">
              <p className="opt-label">{d.builder.then}</p>
              <div className="opt-row">
                {d.builder.actions.map((ac, i) => (
                  <button
                    key={ac}
                    type="button"
                    className={i === a ? "opt opt--on" : "opt"}
                    aria-pressed={i === a}
                    onClick={() => setA(i)}
                  >
                    {ac}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="result">
            <p className="card-eyebrow">{d.builder.resultEyebrow}</p>
            <p className="result-line">
              {d.builder.resultPrefix}
              <span className="accent">{d.builder.triggers[t]}</span>
              {d.builder.resultMid}
              <span className="accent">{d.builder.actions[a]}</span>
              {d.builder.resultSuffix}
            </p>
            <p className="small">{d.builder.small}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueCards({ d }: { d: Dict }) {
  const [dot, setDot] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const onScroll = () => {
    const el = ref.current;
    const card = el?.querySelector<HTMLElement>(".value");
    if (!el || !card) return;
    const step = card.offsetWidth + 12;
    setDot(Math.min(d.values.length - 1, Math.round(el.scrollLeft / step)));
  };
  return (
    <section className="section">
      <div className="container">
        <div className="values" ref={ref} onScroll={onScroll}>
          {d.values.map((v) => (
            <article className="value" key={v.title}>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </article>
          ))}
        </div>
        <div className="dots" aria-hidden="true">
          {d.values.map((v, i) => (
            <span key={v.title} className={i === dot ? "dot-i dot-i--on" : "dot-i"} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq({ d }: { d: Dict }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq">
      <div className="container">
        <h2 className="faq-title">{d.faq.title}</h2>
        <div className="faq-list">
          {d.faq.items.map((item, i) => (
            <div className="faq-item" key={item.q}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={i === open}
                onClick={() => setOpen(i === open ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden="true">
                  {i === open ? "−" : "+"}
                </span>
              </button>
              {i === open && <p className="faq-a">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ d }: { d: Dict }) {
  return (
    <section className="contact" id="contacto">
      <NetBackground />
      <div className="container contact-inner">
        <AinetIcon size={96} />
        <h2>
          {d.contact.h2a} <span className="accent">{d.contact.h2b}</span>
        </h2>
        <p className="lead">{d.contact.p}</p>
        <div className="contact-btns">
          <a
            className="btn btn--accent btn--lg"
            href={waLink(d.contact.waMessage)}
            target="_blank"
            rel="noreferrer"
          >
            <IconWhatsApp /> {d.contact.whatsapp}
          </a>
          <a className="btn btn--outline btn--lg" href={`mailto:${config.email}`}>
            <IconMail /> {d.contact.email}
          </a>
          <a
            className="btn btn--outline btn--lg"
            href={config.instagram.group}
            target="_blank"
            rel="noreferrer"
          >
            <IconInstagram /> {d.contact.instagram}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ d }: { d: Dict }) {
  return (
    <footer className="footer">
      <p className="brand-word footer-brand">
        <span className="brand-ai">AI</span>NET
      </p>
      <p className="footer-handles">
        <a href={config.instagram.group} style={{ color: "#4DD6EA" }}>
          @ainet_group
        </a>
        <span>·</span>
        <a href={config.instagram.healthcare} style={{ color: "#3DD6B5" }}>
          @ainet_healthcare
        </a>
        <span>·</span>
        <a href={config.instagram.hospitality} style={{ color: "#FF7A45" }}>
          @ainet_hospitality
        </a>
      </p>
      <p className="footer-cities">{d.footer.cities}</p>
    </footer>
  );
}

export default function GroupPage({ lang }: { lang: Lang }) {
  const d = dict[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="page">
      <TopBar lang={lang} current="group" />
      <Header lang={lang} d={d} menuOpen={menuOpen} onMenu={setMenuOpen} />
      <main>
        <Hero d={d} />
        <ConnectMap d={d} />
        <IndustryTabs d={d} />
        <AutomationBuilder d={d} />
        <ValueCards d={d} />
        <Faq d={d} />
        <Contact d={d} />
      </main>
      <Footer d={d} />
      <ContactWidget d={d} hidden={menuOpen} />
    </div>
  );
}
