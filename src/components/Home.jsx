import React, { useEffect, useState } from "react";
import Character from "./Character.jsx";
import CatCoder from "./CatCoder.jsx";

const ROLES = ["Fullstack Developer", "Web Developer"];
const KINDS = ["chip", "mouse", "keyboard", "floppy"];
const LETTERS = [["H", "var(--c1)"], ["e", "var(--c2)"], ["y", "var(--c3)"], ["!", "var(--c4)"]];
const SHAPES = [
  ["★", "10%", "16%", "var(--c1)", 7], ["✚", "84%", "12%", "var(--c3)", 9], ["●", "6%", "58%", "var(--c2)", 8],
  ["▲", "92%", "56%", "var(--c4)", 10], ["✦", "48%", "6%", "var(--c5)", 6], ["◆", "72%", "88%", "var(--c6)", 11],
];
// Teks wrap berjalan. Ubah isinya di sini.
const TICKER = [
  "Ga PHP Ga Makan $",
  "PHP is Koentji",
];

function useTyper(words) {
  const [t, setT] = useState("");
  useEffect(() => {
    let w = 0, c = 0, del = false, id;
    const tick = () => {
      const word = words[w];
      c += del ? -1 : 1;
      setT(word.slice(0, c));
      let d = del ? 40 : 90;
      if (!del && c === word.length) { del = true; d = 1400; }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; d = 300; }
      id = setTimeout(tick, d);
    };
    id = setTimeout(tick, 2600); // tunggu loader
    return () => clearTimeout(id);
  }, []);
  return t;
}

export default function Home() {
  const role = useTyper(ROLES);
  return (
    <div className="k-section flex min-h-screen flex-col justify-between !pb-0 !pt-16">
      {SHAPES.map(([ch, x, y, c, t], i) => (
        <span key={i} aria-hidden className="k-drift" style={{ left: x, top: y, "--sc": c, "--t": `${t}s` }}>{ch}</span>
      ))}

      {/* Flex (bukan grid 2 kolom sama lebar) supaya teks dan kucing berdekatan dan tetap di tengah di layar web */}
      <div className="k-wrap flex w-full flex-col items-center gap-10 lg:flex-row lg:justify-center lg:gap-10">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="k-sticker k-bob px-4 py-1 text-sm font-bold" style={{ transform: "rotate(-3deg)", background: "var(--c3)", color: "#1b1b3a" }}>
            Don't be shy — say hi! 👋
          </span>

          <h1 className="k-title mt-2" aria-label="Hey!">
            {LETTERS.map(([ch, c], i) => (
              <span key={i} aria-hidden style={{ "--lc": c, "--d": `${2.2 + i * 0.12}s` }}>{ch}</span>
            ))}
          </h1>

          {/* margin atas ekstra agar tulisan "Hey!" tidak menutupi nama */}
          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 lg:justify-start">
            <span className="text-2xl font-semibold sm:text-3xl">I'm</span>
            <span className="inline-block rounded-xl border-[3px] px-4 py-1 text-4xl font-bold sm:text-5xl lg:text-6xl" style={{ background: "var(--c2)", color: "#1b1b3a", borderColor: "#1b1b3a", boxShadow: "4px 4px 0 #1b1b3a" }}>Azzam</span>
          </p>
          <p className="k-cursor mt-4 h-8 text-lg font-bold sm:text-2xl">{role}</p>

          {/* <div className="mt-6 flex flex-wrap justify-center gap-4 lg:justify-start">
            <a href="#project" className="k-btn" style={{ background: "var(--c1)" }}>View projects ↓</a>
            <a href="#contact" className="k-btn" style={{ background: "var(--c4)" }}>Send a message ✉️</a>
          </div> */}
        </div>

        <div className="flex w-full max-w-md justify-center lg:w-[26rem] lg:shrink-0"><CatCoder /></div>
      </div>

      {/* 4 karakter dipusatkan: flex + justify-center menggantikan grid 5 kolom yang menyisakan kolom kosong */}
      <div className="k-wrap mt-10 flex w-full flex-wrap items-end justify-center gap-x-6 gap-y-10 px-2 pt-10 sm:gap-x-10">
        {KINDS.map((k, i) => (
          <div key={k} className={i % 2 ? "translate-y-4" : ""} style={{ animation: `k-bob ${3 + i * 0.4}s ease-in-out ${i * 0.3}s infinite` }}>
            <Character kind={k} className="w-32 sm:w-36" />
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-sm font-semibold opacity-70">↑ Click the characters — they can talk!</p>

      <div className="relative z-[1] mt-8 overflow-hidden border-y-[3px] py-3" style={{ background: "var(--c1)", borderColor: "#1b1b3a", color: "#1b1b3a" }}>
        <div className="k-marquee text-xl font-bold">
          {Array(8).fill(TICKER).flat().map((s, i) => (
            <span key={i} className="mx-6 whitespace-nowrap">{s} <span className="k-spin inline-block">✦</span></span>
          ))}
        </div>
      </div>
    </div>
  );
}