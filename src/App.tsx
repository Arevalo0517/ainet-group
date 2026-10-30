import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { dict, type Lang } from "./i18n";
import GroupPage from "./pages/GroupPage";
import PlaceholderPage from "./pages/PlaceholderPage";

const langOf = (pathname: string): Lang => (pathname.startsWith("/en") ? "en" : "es");

export default function App() {
  const { pathname } = useLocation();
  const lang = langOf(pathname);
  const d = dict[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = d.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", d.meta.description);
  }, [lang, d]);

  return (
    <Routes>
      <Route path="/" element={<GroupPage lang="es" />} />
      <Route path="/en" element={<GroupPage lang="en" />} />
      <Route path="/healthcare" element={<PlaceholderPage lang="es" page="healthcare" />} />
      <Route path="/en/healthcare" element={<PlaceholderPage lang="en" page="healthcare" />} />
      <Route path="/hospitality" element={<PlaceholderPage lang="es" page="hospitality" />} />
      <Route path="/en/hospitality" element={<PlaceholderPage lang="en" page="hospitality" />} />
      <Route path="*" element={<GroupPage lang="es" />} />
    </Routes>
  );
}
