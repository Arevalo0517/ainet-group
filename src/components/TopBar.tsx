import { Link } from "react-router-dom";
import type { Lang } from "../i18n";
import { colorFor, pages, pathFor, type Page } from "../routes";

export default function TopBar({ lang, current }: { lang: Lang; current: Page }) {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <nav className="pills" aria-label="AINET">
          {pages.map((p) => {
            const color = colorFor[p.key];
            const active = p.key === current;
            return (
              <Link
                key={p.key}
                to={pathFor(lang, p.key)}
                className={active ? "pill pill--on" : "pill"}
                style={
                  active
                    ? { background: color, borderColor: color, color: "#0D0F24" }
                    : { color, borderColor: "rgba(255,255,255,0.14)" }
                }
                aria-current={active ? "page" : undefined}
              >
                {p.label}
              </Link>
            );
          })}
        </nav>
        <div className="langtoggle" role="group" aria-label="Language">
          <Link
            to={pathFor("es", current)}
            className={lang === "es" ? "lang lang--on" : "lang"}
            aria-current={lang === "es" ? "true" : undefined}
            hrefLang="es"
          >
            ES
          </Link>
          <Link
            to={pathFor("en", current)}
            className={lang === "en" ? "lang lang--on" : "lang"}
            aria-current={lang === "en" ? "true" : undefined}
            hrefLang="en"
          >
            EN
          </Link>
        </div>
      </div>
    </div>
  );
}
