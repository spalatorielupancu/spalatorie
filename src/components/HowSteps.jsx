// „Cum lucrăm” în același limbaj vizual ca galeria: carduri care plutesc, cu umbre moi.
// Pe desktop, cardurile stau la înălțimi diferite și se mișcă la viteze diferite la scroll
// (parallax prin `data-depth`, calculat în MotionInit) — senzație de adâncime, ca orbita din galerie.
// Fără JavaScript sau cu „Reduce motion”, cardurile stau pur și simplu pe loc.

// adâncimea fiecărui card: cele cu valoare negativă par „mai aproape” și se mișcă mai repede
const DEPTHS = [0.06, -0.08, 0.1, -0.04];

export default function HowSteps({ steps }) {
  return (
    <ol className="how-cards" data-parallax-scope>
      {steps.map((st, i) => (
        <li key={st.title} className={`how-card how-card--${i + 1}`}>
          <div className="layer" data-depth={DEPTHS[i % DEPTHS.length]}>
            <div className="how-float reveal">
              <span className="how-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{st.title}</h3>
              <p>{st.text}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
