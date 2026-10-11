// „Cum lucrăm” ca bilețele prinse în pioneză pe o foaie liniată, legate de o linie punctată animată.
// Adaptat după „HowItWorks” de pe 21st.dev, fără biblioteci: e doar HTML + CSS (zero JavaScript).

// Linia punctată care leagă bilețelele (pe desktop), în coordonatele unei plăci de 1000 × 900
const PATH = 'M 290 150 C 500 150, 550 270, 710 270 C 850 270, 500 350, 290 450 C 290 600, 550 720, 750 720';

// Pe telefon, fiecare pereche de bilețele e legată de o curbă (stânga → dreapta, apoi invers)
const LINK_LEFT_TO_RIGHT = 'M 0 0 C 0 65, 100 35, 100 100';
const LINK_RIGHT_TO_LEFT = 'M 100 0 C 100 65, 0 35, 0 100';

const Pin = () => (
  <svg className="how-pin-icon" viewBox="0 0 24 24" width="32" height="32" fill="currentColor" aria-hidden="true">
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

export default function HowSteps({ steps }) {
  return (
    <div className="how-board-wrap">
      <div className="how-lines" aria-hidden="true" />
      <div className="how-board">
        <svg className="how-path" viewBox="0 0 1000 900" preserveAspectRatio="none" aria-hidden="true">
          <path d={PATH} vectorEffect="non-scaling-stroke" />
        </svg>
        <ol className="how-cards">
          {steps.map((st, i) => (
            <li key={st.title} className={`how-card how-card--${i + 1}`}>
              <div className="how-tilt">
                <div className="how-paper reveal">
                  <Pin />
                  <div className="how-note">
                    <span className="how-note-num">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{st.title}</h3>
                    <p>{st.text}</p>
                  </div>
                </div>
              </div>
              {/* pe telefon: curba punctată spre bilețelul următor */}
              {i < steps.length - 1 && (
                <svg className="how-link reveal" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path d={i % 2 ? LINK_RIGHT_TO_LEFT : LINK_LEFT_TO_RIGHT} vectorEffect="non-scaling-stroke" />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
