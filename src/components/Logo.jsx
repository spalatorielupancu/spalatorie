// Logo-ul OFICIAL al Spălătoriei Lupancu, desenat din formele vectoriale extrase din fișierul clientului.
//  - <Logo />        varianta orizontală (semnul lângă text), în culoarea textului din jur — pentru header
//  - <LogoStacked /> varianta oficială verticală (semnul deasupra textului), auriu în degrade — pentru footer
//  - <LogoMark />    doar semnul (picătura cu arcele)

import { LOGO } from './logoPaths';

const [MX, MY, MW, MH] = LOGO.markBox;
const [WX, WY, WW, WH] = LOGO.wordBox;

function MarkPaths({ paint }) {
  return (
    <g fill="none" stroke={paint} strokeWidth={LOGO.sw} strokeLinecap="round" strokeMiterlimit="10">
      {LOGO.mark.map((p, i) => (
        <path key={i} transform={p.tf} d={p.d} />
      ))}
    </g>
  );
}

function TextPaths({ paint }) {
  return (
    <g fill={paint}>
      {LOGO.text.map((p, i) => (
        <path key={i} transform={p.tf} d={p.d} />
      ))}
    </g>
  );
}

export function LogoMark({ className = '' }) {
  return (
    <svg className={`logo-mark ${className}`} viewBox={`${MX} ${MY} ${MW} ${MH}`} aria-hidden="true" focusable="false">
      <MarkPaths paint="currentColor" />
    </svg>
  );
}

// Varianta orizontală: semnul (puțin mai înalt decât textul) în stânga, „SPĂLĂTORIA / LUPANCU” în dreapta.
const H_MARK = WH * 1.12;
const H_SCALE = H_MARK / MH;
const H_GAP = 70;
const H_X0 = WX - H_GAP - MW * H_SCALE;
const H_Y0 = WY + WH / 2 - H_MARK / 2;
const H_VIEWBOX = `${H_X0.toFixed(1)} ${H_Y0.toFixed(1)} ${(WX + WW - H_X0).toFixed(1)} ${H_MARK.toFixed(1)}`;
const H_MARK_TF = `translate(${(H_X0 - MX * H_SCALE).toFixed(2)} ${(H_Y0 - MY * H_SCALE).toFixed(2)}) scale(${H_SCALE.toFixed(4)})`;

export function Logo({ className = '' }) {
  return (
    <svg className={`logo ${className}`} viewBox={H_VIEWBOX} aria-hidden="true" focusable="false">
      <g transform={H_MARK_TF}>
        <MarkPaths paint="currentColor" />
      </g>
      <TextPaths paint="currentColor" />
    </svg>
  );
}

// Varianta oficială, verticală, cu degradeul auriu din fișierul original.
export function LogoStacked({ className = '' }) {
  return (
    <svg
      className={`logo-stacked ${className}`}
      viewBox={`${WX} ${MY} ${WW} ${WY + WH - MY}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="lupancu-auriu" gradientUnits="userSpaceOnUse" x1={WX} y1="0" x2={WX + WW} y2="0">
          {LOGO.grad.map(([offset, color]) => (
            <stop key={offset} offset={offset} stopColor={color} />
          ))}
        </linearGradient>
      </defs>
      <MarkPaths paint="url(#lupancu-auriu)" />
      <TextPaths paint="url(#lupancu-auriu)" />
    </svg>
  );
}
