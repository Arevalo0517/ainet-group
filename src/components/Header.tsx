import AinetIcon from "./AinetIcon";
import type { Dict, Lang } from "../i18n";

export default function Header({ lang, d }: { lang: Lang; d: Dict }) {
  const base = lang === "en" ? "/en" : "/";
  const links: [string, string][] = [
    ["#problema", d.nav.problem],
    ["#industria", d.nav.industry],
    ["#conecta", d.nav.integrations],
    ["#arma", d.nav.build],
  ];
  return (
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
            <a key={href} href={lang === "en" ? `${base}${href}` : href}>
              {label}
            </a>
          ))}
          <a className="btn btn--accent" href={lang === "en" ? `${base}#contacto` : "#contacto"}>
            {d.nav.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}
