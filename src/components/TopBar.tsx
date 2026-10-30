import { useState } from "react";
import { Link } from "react-router-dom";
import type { Lang } from "../i18n";
import { colorFor, pages, pathFor, type Page } from "../routes";

export default function TopBar({ lang, current }: { lang: Lang; current: Page }) {
  const [open, setOpen] = useState(false);
  const currentPage = pages.find((p) => p.key === current)!;

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

        <div className="page-switch">
          <button
            type="button"
            className="psw-btn"
            aria-expanded={open}
            aria-haspopup="true"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="dot" style={{ background: colorFor[current] }} aria-hidden="true" />
            {currentPage.label}
            <span className="psw-caret" aria-hidden="true">
              ▾
            </span>
          </button>
          {open && (
            <ul className="psw-menu">
              {pages.map((p) => (
                <li key={p.key}>
                  <Link
                    to={pathFor(lang, p.key)}
                    onClick={() => setOpen(false)}
                    aria-current={p.key === current ? "page" : undefined}
                  >
                    <span className="dot" style={{ background: colorFor[p.key] }} aria-hidden="true" />
                    {p.label}
                    {p.key === current && <span className="psw-check">✓</span>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

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
