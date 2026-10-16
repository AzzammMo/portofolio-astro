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

/* ---------- mesin 2: ambient santai (pad lembut + denting piano + gema) dibuat dengan Web Audio ---------- */
const CHORDS = [[48, 55, 59, 64], [45, 52, 55, 60], [41, 48, 57, 64], [43, 50, 59, 64]]; // Cmaj7 Am7 Fmaj7 G6
const PLUCK = [72, 74, 76, 79, 81, 84]; // pentatonik C mayor, nada tinggi yang lembut
const mtof = (m) => 440 * 2 ** ((m - 69) / 12);

function synthEngine() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain();
  master.gain.value = 0;
  const lp = ctx.createBiquadFilter(); // meredam nada tajam agar hangat
  lp.type = "lowpass";
  lp.frequency.value = 1400;
  master.connect(lp);
  lp.connect(ctx.destination);

  // gema (echo) lembut untuk kesan ruang luas
  const echo = ctx.createDelay(2);
  echo.delayTime.value = 0.75;
  const fb = ctx.createGain();
  fb.gain.value = 0.4;
  const ef = ctx.createBiquadFilter();
  ef.type = "lowpass";
  ef.frequency.value = 1200;
  const wet = ctx.createGain();
  wet.gain.value = 0.55;
  echo.connect(ef);
  ef.connect(fb);
  fb.connect(echo);
  ef.connect(wet);
  wet.connect(master);

  const tone = (m, t, dur, type, vol, att, toEcho, detune = 0) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = mtof(m);
    o.detune.value = detune;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + att);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(master);
    if (toEcho) g.connect(echo);
    o.start(t);
    o.stop(t + dur + 0.1);
  };

  const half = 0.5; // 60 BPM, langkah = setengah ketukan
  let step = 0;
  let last = -1;
  let next = ctx.currentTime + 0.1;
  const schedule = () => {
    while (next < ctx.currentTime + 0.3) {
      const chord = CHORDS[Math.floor(step / 16) % 4]; // tiap akor 8 detik
      const s = step % 16;
      if (s === 0) {
        chord.forEach((m, i) => {
          tone(m, next, 8.5, "sine", i ? 0.05 : 0.12, 2.2, false);
          if (i) tone(m, next, 8.5, "triangle", 0.018, 2.6, false, 7);
        });
      }
      if (Math.random() < (s === 0 ? 0.6 : 0.26)) {
        let p;
        do { p = PLUCK[Math.floor(Math.random() * PLUCK.length)]; } while (p === last);
        last = p;
        tone(p, next, 3.2, "sine", 0.07, 0.01, true);
      }
      step++;
      next += half;
    }
  };
  const id = setInterval(schedule, 100);

  const fade = (v, sec) => {
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(v, ctx.currentTime + sec);
  };
  return {
    start() { ctx.resume(); fade(0.75, 2); },
    stop() { fade(0, 0.8); setTimeout(() => ctx.suspend(), 900); },
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
        <span className="k-sticker k-bob fixed right-16 top-[4.2rem] z-50 hidden px-3 py-0.5 text-xs font-bold sm:block" style={{ background: "var(--c1)", color: "#1b1b3a", boxShadow: "3px 3px 0 #1b1b3a" }}>
          Tap for music →
        </span>
      )}
      <button onClick={on ? stop : start} aria-pressed={on} aria-label={on ? "Matikan musik" : "Nyalakan musik"}
        className="k-sticker fixed right-3 top-[3.75rem] z-50 grid h-10 w-10 place-items-center text-lg transition hover:rotate-12 hover:scale-110 active:scale-90"
        style={{ boxShadow: "3px 3px 0 var(--ink)", background: on ? "var(--c4)" : "var(--card)" }}>
        <span className={on ? "k-bob inline-block" : ""}>{on ? "🎵" : "🔇"}</span>
      </button>
    </>
  );
}