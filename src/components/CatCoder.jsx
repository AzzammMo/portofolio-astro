import React from "react";

const INK = "#1b1b3a";
const S = { stroke: INK, strokeWidth: 5, strokeLinecap: "round", strokeLinejoin: "round" };
const FUR = "#ffb347";

// [x, y, lebar, warna] baris kode di layar
const LINES = [
  [138, 48, 70, "#38bdf8"], [148, 62, 100, "#7ae582"], [148, 76, 50, "#ff6b9d"],
  [138, 90, 86, "#ffd23f"], [148, 104, 60, "#b388ff"],
];

/** Kucing yang mengetik di laptop: kode muncul di layar, cakar mengetuk, ekor bergoyang. */
export default function CatCoder({ className = "w-full max-w-md" }) {
  return (
    <div className={`relative select-none ${className}`}>
      <svg viewBox="0 0 300 240" role="img" aria-label="Kucing sedang mengetik kode di laptop" className="block w-full overflow-visible">
        {/* simbol kode yang naik dari layar */}
        {[["</>", 150, "#4cc9f0", "0s"], ["{ }", 205, "#ff6b9d", "1s"], [";", 255, "#ffd23f", "2s"]].map(([t, x, c, d]) => (
          <text key={t} className="k-rise" x={x} y="22" fontSize="18" fontWeight="700" fontFamily="monospace" fill={c} stroke={INK} strokeWidth="1" style={{ "--d": d }}>{t}</text>
        ))}

        {/* laptop */}
        <rect x="118" y="28" width="168" height="108" rx="10" fill="#cbd5e1" {...S} />
        <rect x="128" y="38" width="148" height="88" rx="4" fill="#0f172a" />
        {LINES.map(([x, y, w, c], i) => (
          <rect key={i} className="k-line" x={x} y={y} width={w} height="6" rx="3" fill={c} style={{ "--d": `${i * 0.5}s` }} />
        ))}
        <rect className="k-caretb" x="206" y="104" width="7" height="9" fill="#fff" />
        <path d="M104 136 H300 L292 156 H112Z" fill="#94a3b8" {...S} />
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={132 + i * 18} y="143" width="12" height="4" rx="2" fill="#e2e8f0" />
        ))}

        {/* kucing */}
        <path className="k-tail" d="M26 195 Q2 180 14 138" fill="none" stroke={INK} strokeWidth="20" strokeLinecap="round" />
        <path className="k-tail" d="M26 195 Q2 180 14 138" fill="none" stroke={FUR} strokeWidth="11" strokeLinecap="round" />
        <ellipse cx="45" cy="226" rx="20" ry="10" fill={FUR} {...S} />
        <ellipse cx="100" cy="226" rx="20" ry="10" fill={FUR} {...S} />
        <ellipse cx="72" cy="170" rx="52" ry="58" fill={FUR} {...S} />
        <ellipse cx="72" cy="182" rx="28" ry="34" fill="#ffe2b8" />

        {/* cakar mengetik */}
        {[["k-tap", "0s", [92, 150, 126, 142]], ["k-tap", ".19s", [100, 164, 148, 146]]].map(([c, d, [x1, y1, x2, y2]], i) => (
          <g key={i} className={c} style={{ animationDelay: d }}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth="22" strokeLinecap="round" />
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={FUR} strokeWidth="12" strokeLinecap="round" />
          </g>
        ))}

        {/* kepala */}
        <g className="k-nod">
          <path d="M42 62 L38 26 L68 48Z" fill={FUR} {...S} />
          <path d="M110 62 L116 26 L90 48Z" fill={FUR} {...S} />
          <path d="M45 54 L44 38 L57 48Z" fill="#ff8fab" />
          <path d="M107 54 L110 38 L95 48Z" fill="#ff8fab" />
          <ellipse cx="76" cy="84" rx="44" ry="38" fill={FUR} {...S} />
          <path d="M70 50 v10 M77 48 v12 M84 50 v10" stroke="#e07b00" strokeWidth="4" strokeLinecap="round" />
          <g className="k-blink">
            <ellipse cx="60" cy="86" rx="10" ry="11" fill="#fff" stroke={INK} strokeWidth="4" />
            <ellipse cx="92" cy="86" rx="10" ry="11" fill="#fff" stroke={INK} strokeWidth="4" />
            <circle cx="64" cy="87" r="5" fill={INK} />
            <circle cx="96" cy="87" r="5" fill={INK} />
          </g>
          <path d="M72 98 H82 L77 104Z" fill="#ff6b9d" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <path d="M77 104 Q70 112 64 107 M77 104 Q84 112 90 107" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
          <path d="M50 100 H28 M52 107 L30 115 M104 100 H126 M102 107 L124 115" stroke={INK} strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="46" cy="100" rx="7" ry="4" fill="#ff8fab" opacity=".7" />
          <ellipse cx="108" cy="100" rx="7" ry="4" fill="#ff8fab" opacity=".7" />
        </g>
      </svg>
      <div className="k-tag">Purr-grammer 🐱 &lt;/&gt;</div>
    </div>
  );
}
