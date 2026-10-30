import { useEffect } from "react";
import AinetIcon from "./AinetIcon";
import { IconInstagram } from "./Icons";
import { config } from "../config";
import type { Dict, Lang } from "../i18n";

type Props = {
  lang: Lang;
  d: Dict;
  menuOpen: boolean;
  onMenu: (open: boolean) => void;
};

export default function Header({ lang, d, menuOpen, onMenu }: Props) {
  const base = lang === "en" ? "/en" : "/";
  const links: [string, string][] = [
    ["#problema", d.nav.problem],
    ["#industria", d.nav.industry],
    ["#conecta", d.nav.integrations],
    ["#arma", d.nav.build],
  ];
  return (
    <>
      <header className="header">
        <div className="header-inner">
          <a className="brand" href={base} aria-label="AINET">
            <AinetIcon size={44} />
            <span className="brand-word">
              <span className="brand-ai">AI</span>NET
            </span>
          </a>
          <nav className="nav" aria-label={d.nav.cta}>
            {links.map(([href, label]) => (
              <a key={href} href={`${base}${href}`}>
                {label}
              </a>
            ))}
            <a className="btn btn--accent" href={`${base}#contacto`}>
              {d.nav.cta}
            </a>
          </nav>
          <div className="header-actions">
            <a className="btn btn--accent btn--sm" href={`${base}#contacto`}>
              {d.nav.ctaShort}
            </a>
            <button
              type="button"
              className="menu-btn"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? d.nav.close : d.nav.menu}
              onClick={() => onMenu(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>
      {menuOpen && <MenuOverlay lang={lang} d={d} onClose={() => onMenu(false)} />}
    </>
  );
}

function MenuOverlay({ lang, d, onClose }: { lang: Lang; d: Dict; onClose: () => void }) {
  const base = lang === "en" ? "/en" : "/";
  const links: [string, string][] = [
    ["#problema", d.nav.problem],
    ["#industria", d.nav.industry],
    ["#conecta", d.nav.integrations],
    ["#arma", d.nav.build],
  ];
  const handles = [
    { href: config.instagram.group, label: "@ainet_group", color: "#4DD6EA" },
    { href: config.instagram.healthcare, label: "@ainet_healthcare", color: "#3DD6B5" },
    { href: config.instagram.hospitality, label: "@ainet_hospitality", color: "#FF7A45" },
  ];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="menu-overlay" role="dialog" aria-modal="true" aria-label={d.nav.menu}>
      <div className="menu-top">
        <span className="brand-word">
          <span className="brand-ai">AI</span>NET
        </span>
        <button type="button" className="menu-btn" aria-label={d.nav.close} onClick={onClose}>
          ✕
        </button>
      </div>
      <nav className="menu-links">
        {links.map(([href, label]) => (
          <a key={href} href={`${base}${href}`} onClick={onClose}>
            {label}
          </a>
        ))}
      </nav>
      <a className="btn btn--accent menu-cta" href={`${base}#contacto`} onClick={onClose}>
        {d.nav.cta}
      </a>
      <div className="menu-handles">
        {handles.map((h) => (
          <a key={h.label} href={h.href} target="_blank" rel="noreferrer" style={{ color: h.color }}>
            <IconInstagram size={16} /> {h.label}
          </a>
        ))}
      </div>
    </div>
  );
}
