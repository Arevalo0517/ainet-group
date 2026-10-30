import { useState } from "react";
import AinetIcon from "./AinetIcon";
import { IconChat, IconInstagram, IconMail, IconWhatsApp } from "./Icons";
import { config, waLink } from "../config";
import type { Dict } from "../i18n";

export default function ContactWidget({ d }: { d: Dict }) {
  const [open, setOpen] = useState(false);
  const [chosen, setChosen] = useState<number | null>(null);
  const chip = chosen === null ? null : d.widget.chips[chosen];

  return (
    <div className="widget">
      {open && (
        <div className="wpanel" role="dialog" aria-label="AINET">
          <div className="whead">
            <AinetIcon size={34} />
            <div>
              <b>AINET</b>
              <span>{d.widget.subtitle}</span>
            </div>
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
      )}
      <button
        type="button"
        className="widget-btn"
        aria-expanded={open}
        aria-label={open ? d.widget.close : d.widget.cta}
        onClick={() => setOpen((v) => !v)}
      >
        <IconChat size={18} /> {open ? d.widget.close : d.widget.cta}
      </button>
    </div>
  );
}
