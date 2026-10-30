import { useEffect, useState } from "react";
import AinetIcon from "./AinetIcon";
import { IconChat, IconInstagram, IconMail, IconWhatsApp } from "./Icons";
import { config, waLink } from "../config";
import type { Dict } from "../i18n";

type Props = { d: Dict; hidden?: boolean };

export default function ContactWidget({ d, hidden = false }: Props) {
  const [open, setOpen] = useState(false);
  const [chosen, setChosen] = useState<number | null>(null);
  const [help, setHelp] = useState(false);
  const [nearContact, setNearContact] = useState(false);
  const chip = chosen === null ? null : d.widget.chips[chosen];

  // one nudge per visit, phones only
  useEffect(() => {
    if (!window.matchMedia("(max-width: 639px)").matches) return;
    if (sessionStorage.getItem("ainet-help")) return;
    const show = setTimeout(() => {
      setHelp(true);
      sessionStorage.setItem("ainet-help", "1");
    }, 8000);
    const hide = setTimeout(() => setHelp(false), 12000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  // no second copy of the buttons while #contacto is on screen
  useEffect(() => {
    const el = document.getElementById("contacto");
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setNearContact(entry.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (hidden) setOpen(false);
  }, [hidden]);

  const isHidden = hidden || nearContact;

  return (
    <div className={isHidden ? "widget widget--hidden" : "widget"}>
      {help && !open && !isHidden && <p className="help-bubble">{d.widget.help}</p>}
      {open && (
        <>
          <div className="sheet-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="wpanel" role="dialog" aria-label="AINET">
            <div className="whead">
              <AinetIcon size={34} />
              <div>
                <b>AINET</b>
                <span>{d.widget.subtitle}</span>
              </div>
              <button
                type="button"
                className="wsheet-close"
                aria-label={d.widget.close}
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="wbody">
              <p className="bubble bubble--in">{d.widget.greet}</p>
              <div className="wchips">
                {d.widget.chips.map((c, i) => (
                  <button
                    key={c.label}
                    type="button"
                    className={i === chosen ? "wchip wchip--on" : "wchip"}
                    aria-pressed={i === chosen}
                    onClick={() => setChosen(i)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              {chip && (
                <>
                  <p className="bubble bubble--out">{chip.reply}</p>
                  <p className="bubble bubble--out">{d.widget.followup}</p>
                  <div className="wactions">
                    <a
                      className="btn btn--accent"
                      href={waLink(chip.label)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IconWhatsApp size={18} /> {d.contact.whatsapp}
                    </a>
                    <a
                      className="btn btn--outline"
                      href={`mailto:${config.email}?subject=${encodeURIComponent(chip.label)}`}
                    >
                      <IconMail size={18} /> {d.contact.email}
                    </a>
                    <a
                      className="btn btn--outline"
                      href={config.instagram.group}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IconInstagram size={18} /> @ainet_group
                    </a>
                  </div>
                  <p className="fine">{d.widget.fine}</p>
                </>
              )}
            </div>
          </div>
        </>
      )}
      <button
        type="button"
        className="widget-btn"
        aria-expanded={open}
        aria-label={open ? d.widget.close : d.widget.cta}
        onClick={() => setOpen((v) => !v)}
      >
        <IconChat size={18} />
        <span className="wlabel">{open ? d.widget.close : d.widget.cta}</span>
      </button>
    </div>
  );
}
