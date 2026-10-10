// Semnul din logo (picătura + arcele), refăcut ca SVG după materialele clientului.
// TODO: înlocuiește cu fișierul original al logo-ului când îl primești de la client.
export function LogoMark({ className = '', draw = false, title }) {
  return (
    <svg
      className={`logo-mark${draw ? ' logo-mark--draw' : ''} ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {/* picătura */}
      <path pathLength="1" d="M52 22 C 52 22 38 40 38 51 a14 14 0 0 0 28 0 C 66 40 52 22 52 22 Z" />
      {/* arcul interior */}
      <path pathLength="1" d="M20 60 H28 A24 24 0 0 0 76 60 C 76 44 68 30 60 18" />
      {/* arcul exterior */}
      <path pathLength="1" d="M10 66 H18 A34 34 0 0 0 86 60 C 86 38 76 20 66 8" />
    </svg>
  );
}

export function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <LogoMark />
      <span className="logo-text">
        <span className="logo-small">Spălătoria</span>
        <span className="logo-big">Lupancu</span>
      </span>
    </span>
  );
}
