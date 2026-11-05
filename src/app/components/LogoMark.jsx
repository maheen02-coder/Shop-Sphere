export default function LogoMark({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      role="img"
      aria-label="ShopSphere"
      className={className}
    >
      <defs>
        <linearGradient id="ss-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F5DFA0" />
          <stop offset="0.55" stopColor="#E8C96A" />
          <stop offset="1" stopColor="#B89542" />
        </linearGradient>
        <radialGradient id="ss-sphere" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#FFF4CF" />
          <stop offset="0.55" stopColor="#E8C96A" />
          <stop offset="1" stopColor="#B89542" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#100D11" />
      <rect
        x="1.25"
        y="1.25"
        width="61.5"
        height="61.5"
        rx="12.75"
        fill="none"
        stroke="#B89542"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <path
        d="M24 25v-3.5a8 8 0 0 1 16 0V25"
        fill="none"
        stroke="url(#ss-gold)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M18 25h28l2.5 27a3 3 0 0 1-3 3.3H18.5a3 3 0 0 1-3-3.3L18 25Z"
        fill="#19141A"
        stroke="url(#ss-gold)"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="40" r="8.5" fill="url(#ss-sphere)" />
      <path
        d="M26.5 36.5c1.5 4.5 3 7.5 6.5 10.5"
        fill="none"
        stroke="#100D11"
        strokeOpacity="0.18"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <ellipse
        cx="29"
        cy="36.5"
        rx="2.2"
        ry="1.4"
        fill="#FFF4CF"
        fillOpacity="0.55"
        transform="rotate(-25 29 36.5)"
      />
      <path
        d="M21.5 31.5h7"
        stroke="#F5DFA0"
        strokeOpacity="0.5"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
