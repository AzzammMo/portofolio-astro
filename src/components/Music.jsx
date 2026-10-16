import React, { useEffect, useRef, useState } from "react";

// Kosongkan untuk memakai musik lo-fi buatan kode (tanpa file, bebas hak cipta).
// Untuk lagu sendiri: taruh file BEBAS HAK CIPTA di public/music/bgm.mp3 lalu isi "/music/bgm.mp3".
const SRC = "";

/* ---------- mesin 1: file audio ---------- */
function fileEngine() {
  const a = new Audio(SRC);
  a.loop = true;
  a.volume = 0.35;
  return { start: () => a.play(), stop: () => a.pause(), pause: () => a.pause(), resume: () => a.play() };
}

/* ---------- mesin 2: lo-fi chiptune dibuat dengan Web Audio ---------- */
const CHORDS = [[57, 60, 64, 67], [53, 57, 60, 64], [60, 64, 67, 71], [55, 59, 62, 65]]; // Am7 Fmaj7 Cmaj7 G7
const BASS = [45, 41, 48, 43];
const PENTA = [69, 72, 74, 76, 79];
const ARP = [0, 1, 2, 3, 2, 1, 2, 3];
const mtof = (m) => 440 * 2 ** ((m - 69) / 12);

function synthEngine() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain();
  master.gain.value = 0;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 1800;
  master.connect(lp);
  lp.connect(ctx.destination);

  const note = (m, t, dur, type, vol) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = mtof(m);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(master);
    o.start(t);
    o.stop(t + dur + 0.05);
  };

  const eighth = 60 / 84 / 2; // 84 BPM
  let step = 0;
  let next = ctx.currentTime + 0.1;
  const schedule = () => {
    while (next < ctx.currentTime + 0.3) {
      const bar = Math.floor(step / 8) % 4;
      const s = step % 8;
      const ch = CHORDS[bar];
      if (s === 0) {
        ch.forEach((m) => note(m, next, eighth * 8, "triangle", 0.05));
        note(BASS[bar], next, eighth * 4, "sine", 0.2);
      }
      if (s === 4) note(BASS[bar], next, eighth * 3, "sine", 0.14);
      note(ch[ARP[s]] + 12, next, eighth * 1.6, "square", 0.022);
      if ((s === 0 || s === 4) && Math.random() < 0.55) {
        note(PENTA[Math.floor(Math.random() * PENTA.length)], next, eighth * 3, "triangle", 0.045);
      }
      step++;
      next += eighth;
    }
  };
  const id = setInterval(schedule, 100);

  const fade = (v, s) => {
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(v, ctx.currentTime + s);
  };
  return {
    start() { ctx.resume(); fade(0.55, 1.2); },
    stop() { fade(0, 0.5); setTimeout(() => ctx.suspend(), 600); },
    pause() { ctx.suspend(); },
    resume() { ctx.resume(); },
    destroy() { clearInterval(id); ctx.close(); },
  };
}

export default function Music() {
  const eng = useRef(null);
  const [on, setOn] = useState(false);
  const [hint, setHint] = useState(true);

  const start = () => {
    if (!eng.current) eng.current = SRC ? fileEngine() : synthEngine();
    eng.current.start();
    setOn(true);
    setHint(false);
    try { localStorage.setItem("music", "on"); } catch {}
  };
  const stop = () => {
    eng.current?.stop();
    setOn(false);
    try { localStorage.setItem("music", "off"); } catch {}
  };

  useEffect(() => {
    // Jika sebelumnya musik menyala, lanjutkan pada interaksi pertama (syarat browser).
    let saved = false;
    try { saved = localStorage.getItem("music") === "on"; } catch {}
    const go = () => start();
    if (saved) {
      window.addEventListener("pointerdown", go, { once: true });
      window.addEventListener("keydown", go, { once: true });
    }
    // Jeda otomatis saat tab disembunyikan.
    const vis = () => {
      if (!eng.current) return;
      if (document.hidden) eng.current.pause();
      else if (eng.current && localStorage.getItem("music") === "on") eng.current.resume();
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      window.removeEventListener("pointerdown", go);
      window.removeEventListener("keydown", go);
      document.removeEventListener("visibilitychange", vis);
      eng.current?.destroy?.();
    };
  }, []);

  return (
    <>
      {hint && !on && (
        <span className="k-sticker k-bob fixed right-[8.2rem] top-5 z-50 hidden px-3 py-1 text-sm font-bold sm:block" style={{ background: "var(--c1)", color: "#1b1b3a", boxShadow: "3px 3px 0 #1b1b3a" }}>
          Tap for music →
        </span>
      )}
      <button onClick={on ? stop : start} aria-pressed={on} aria-label={on ? "Matikan musik" : "Nyalakan musik"}
        className="k-sticker fixed right-20 top-4 z-50 grid h-12 w-12 place-items-center text-xl transition hover:rotate-12 hover:scale-110 active:scale-90"
        style={{ boxShadow: "4px 4px 0 var(--ink)", background: on ? "var(--c4)" : "var(--card)" }}>
        <span className={on ? "k-bob inline-block" : ""}>{on ? "🎵" : "🔇"}</span>
      </button>
    </>
  );
}
