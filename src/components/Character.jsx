import React, { useEffect, useRef, useState } from "react";

const INK = "#1b1b3a";
const S = { stroke: INK, strokeWidth: 5, strokeLinecap: "round", strokeLinejoin: "round" };

/** Mata: berkedip dan pupilnya mengikuti kursor. */
function Eyes({ x1, x2, y, look, r = 12, p = 6 }) {
  const k = r / 12;
  return (
    <g className="k-blink">
      {[x1, x2].map((x) => (
        <g key={x}>
          <circle cx={x} cy={y} r={r} fill="#fff" stroke={INK} strokeWidth="4" />
          <circle cx={x + look.x * k} cy={y + look.y * k} r={p} fill={INK} />
        </g>
      ))}
    </g>
  );
}

const Cheeks = ({ y, a = 66, b = 134 }) => (
  <>
    <ellipse cx={a} cy={y} rx="8" ry="5" fill="#ff8fab" opacity=".8" />
    <ellipse cx={b} cy={y} rx="8" ry="5" fill="#ff8fab" opacity=".8" />
  </>
);

/* 1. Robot chip / CPU */
function Chip({ look }) {
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} {...S}>
          <line x1="22" y1={68 + i * 22} x2="40" y2={68 + i * 22} />
          <line x1="160" y1={68 + i * 22} x2="178" y2={68 + i * 22} />
          <line x1={64 + i * 24} y1="22" x2={64 + i * 24} y2="40" className="k-pin" style={{ animationDelay: `${i * 0.2}s` }} />
          <line x1={64 + i * 24} y1="160" x2={64 + i * 24} y2="178" />
        </g>
      ))}
      <rect x="40" y="40" width="120" height="120" rx="24" fill="#4cc9f0" {...S} />
      <rect x="56" y="56" width="88" height="88" rx="14" fill="#c9f1ff" stroke={INK} strokeWidth="3" />
      <Eyes x1={82} x2={118} y={92} look={look} />
      <path d="M86 116 Q100 132 114 116" fill="none" {...S} strokeWidth="4" />
      <Cheeks y={112} a={68} b={132} />
      <text x="100" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill={INK}>CPU</text>
    </g>
  );
}

/* 2. Mouse */
function Mouse({ look }) {
  return (
    <g>
      <path className="k-wiggle" style={{ transformOrigin: "100px 36px" }} d="M100 36 C100 14 128 24 126 6" fill="none" {...S} />
      <path d="M58 92 Q58 34 100 34 Q142 34 142 92 L142 132 Q142 172 100 172 Q58 172 58 132Z" fill="#ff6b9d" {...S} />
      <path d="M100 34 V82 M58 82 H142" fill="none" {...S} strokeWidth="4" />
      <rect x="93" y="46" width="14" height="26" rx="7" fill="#fff" stroke={INK} strokeWidth="4" />
      <Eyes x1={82} x2={118} y={112} look={look} r={11} p={5.5} />
      <path d="M91 138 Q100 150 109 138" fill="none" {...S} strokeWidth="4" />
      <Cheeks y={132} a={68} b={132} />
    </g>
  );
}

/* 3. Keyboard */
function Keyboard({ look }) {
  const row = (y, n, x0) =>
    Array.from({ length: n }, (_, i) => (
      <rect key={`${y}-${i}`} className="k-key" style={{ animationDelay: `${(i * 0.17 + y * 0.01) % 1.6}s` }}
        x={x0 + i * 24} y={y} width="18" height="14" rx="4" fill="#fff" stroke={INK} strokeWidth="3" />
    ));
  return (
    <g>
      <rect x="12" y="58" width="176" height="108" rx="18" fill="#b388ff" {...S} />
      <Eyes x1={76} x2={124} y={82} look={look} r={10} p={5} />
      <path d="M92 94 Q100 102 108 94" fill="none" {...S} strokeWidth="4" />
      <Cheeks y={92} a={56} b={144} />
      {row(112, 6, 30)}
      {row(132, 5, 42)}
      <rect className="k-key" x="58" y="150" width="84" height="12" rx="4" fill="#fff" stroke={INK} strokeWidth="3" />
    </g>
  );
}

/* 4. Floppy disk */
function Floppy({ look }) {
  return (
    <g>
      <path d="M26 28 H150 L174 52 V174 H26Z" fill="#ff9f1c" {...S} />
      <rect x="60" y="28" width="70" height="42" rx="4" fill="#e5e7eb" stroke={INK} strokeWidth="4" />
      <rect x="106" y="36" width="16" height="26" rx="3" fill={INK} />
      <rect x="42" y="94" width="116" height="72" rx="8" fill="#fff" stroke={INK} strokeWidth="4" />
      <Eyes x1={80} x2={120} y={120} look={look} r={11} p={5.5} />
      <path d="M91 142 Q100 154 109 142" fill="none" {...S} strokeWidth="4" />
      <Cheeks y={138} a={62} b={138} />
    </g>
  );
}

/* 5. WiFi */
function Wifi({ look }) {
  const arcs = [
    ["M36.4 86.4 A90 90 0 0 1 163.6 86.4", "#ff6b9d"],
    ["M56.2 106.2 A62 62 0 0 1 143.8 106.2", "#ffd23f"],
    ["M76 126 A34 34 0 0 1 124 126", "#4cc9f0"],
  ];
  return (
    <g>
      {arcs.map(([d, c], i) => (
        <g key={i} className="k-arc" style={{ animationDelay: `${(2 - i) * 0.25}s` }}>
          <path d={d} fill="none" stroke={INK} strokeWidth="22" strokeLinecap="round" />
          <path d={d} fill="none" stroke={c} strokeWidth="11" strokeLinecap="round" />
        </g>
      ))}
      <circle cx="100" cy="158" r="28" fill="#7ae582" {...S} />
      <Eyes x1={90} x2={110} y={154} look={look} r={7} p={3.5} />
      <path d="M92 168 Q100 176 108 168" fill="none" {...S} strokeWidth="4" />
    </g>
  );
}

export const CHARACTERS = {
  chip: { Body: Chip, name: "Chippy", lines: ["Aku otak komputernya! 🧠", "Prosesor 100% semangat", "Jangan overclock aku 🔥"] },
  mouse: { Body: Mouse, name: "Klik", lines: ["Klik aku lagi dong 🖱️", "Scroll terus ya ✨", "Aku dobel klik, lho!"] },
  keyboard: { Body: Keyboard, name: "Ketik", lines: ["Tak-tik-tuk ⌨️", "Semua kode lahir dari sini", "Ctrl + S dulu ya 💾"] },
  floppy: { Body: Floppy, name: "Floppy", lines: ["Aku jadul tapi keren 💾", "Kapasitas 1.44 MB cinta", "Jangan tekuk aku!"] },
  wifi: { Body: Wifi, name: "Wifi", lines: ["Sinyal penuh! 📶", "Kirim pesan lewat aku", "Konek yuk 🤝"] },
};

/** Karakter: mata ikut kursor, melayang, melompat + balon bicara saat diklik. */
export default function Character({ kind = "chip", className = "w-40", lines, tag = true }) {
  const { Body, name, lines: dl } = CHARACTERS[kind];
  const L = lines ?? dl;
  const ref = useRef(null);
  const n = useRef(0);
  const timer = useRef();
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [jump, setJump] = useState(false);
  const [say, setSay] = useState(null);

  useEffect(() => {
    const move = (e) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(d, 260) / 260;
      const x = Math.round((dx / d) * 5 * k * 2) / 2;
      const y = Math.round((dy / d) * 4 * k * 2) / 2;
      setLook((o) => (o.x === x && o.y === y ? o : { x, y }));
    };
    window.addEventListener("pointermove", move);
    return () => { window.removeEventListener("pointermove", move); clearTimeout(timer.current); };
  }, []);

  const poke = () => {
    setSay(L[n.current++ % L.length]);
    setJump(false);
    requestAnimationFrame(() => setJump(true));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { setJump(false); setSay(null); }, 2600);
  };

  return (
    <div className={`relative select-none ${className}`}>
      {say && <div key={say} className="k-bubble">{say}</div>}
      <svg ref={ref} viewBox="0 0 200 200" role="img" aria-label={`Karakter ${name}`} onClick={poke}
        className={`block w-full cursor-pointer overflow-visible ${jump ? "k-jump" : "k-float"}`}>
        <Body look={look} />
      </svg>
      <div className="k-shadow" />
      {tag && <div className="k-tag">{name}</div>}
    </div>
  );
}
