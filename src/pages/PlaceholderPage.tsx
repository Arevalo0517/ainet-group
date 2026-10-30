import { useState } from "react";
import AinetIcon from "../components/AinetIcon";
import ContactWidget from "../components/ContactWidget";
import Header from "../components/Header";
import TopBar from "../components/TopBar";
import { dict, type Lang } from "../i18n";
import { colorFor, pathFor, type Page } from "../routes";

export default function PlaceholderPage({ lang, page }: { lang: Lang; page: Page }) {
  const d = dict[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="page">
      <TopBar lang={lang} current={page} />
      <Header lang={lang} d={d} menuOpen={menuOpen} onMenu={setMenuOpen} />
      <main className="placeholder">
        <AinetIcon size={96} accent={colorFor[page]} />
        <h1>AINET {page === "healthcare" ? "Healthcare" : "Hospitality"}</h1>
        <p className="lead">
          {lang === "en" ? "This page is coming soon." : "Esta página está por salir."}
        </p>
        <a className="btn btn--accent" href={pathFor(lang, "group")}>
          {lang === "en" ? "Back to AINET Group" : "Volver a AINET Group"}
        </a>
      </main>
      <ContactWidget d={d} hidden={menuOpen} />
    </div>
  );
}
