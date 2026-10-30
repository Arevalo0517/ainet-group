type Props = { accent?: string; size?: number };

export default function AinetIcon({ accent = "#4DD6EA", size = 44 }: Props) {
  return (
    <svg viewBox="0 0 1080 1080" width={size} height={size} aria-hidden="true">
      <rect
        x="20"
        y="20"
        width="1040"
        height="1040"
        rx="250"
        fill="#1B1F4B"
        stroke="#3A4290"
        strokeWidth="16"
      />
      <line x1="283" y1="634" x2="797" y2="634" stroke="#FFF" strokeWidth="40" />
      <path
        d="M540 300 L338 797 M540 300 L742 797"
        stroke="#FFF"
        strokeWidth="90"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="540" cy="297" r="64" fill={accent} />
      <circle cx="283" cy="634" r="56" fill={accent} />
      <circle cx="540" cy="634" r="64" fill={accent} />
      <circle cx="797" cy="634" r="56" fill={accent} />
    </svg>
  );
}
