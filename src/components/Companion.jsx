import React, { useEffect, useState } from "react";
import Character from "./Character.jsx";

// Tiap section punya karakter pendamping sendiri. Konstanta di luar komponen agar referensinya stabil.
const MAP = {
  about: { kind: "chip", lines: ["Kenalan dulu yuk!", "Dia suka React & Laravel 💙", "Lihat jurus SPARK-nya ✨"] },
  project: { kind: "keyboard", lines: ["Klik kartunya!", "Ini hasil kerja kerasnya 🚀", "Delapan proyek lho!"] },
  certifications: { kind: "floppy", lines: ["Sertifikatnya banyak! 🏅", "Geser ke samping →", "Klik untuk memperbesar"] },
  contact: { kind: "wifi", lines: ["Kirim pesan yuk 📬", "Jangan malu-malu 😆", "Dibalas secepatnya!"] },
};

export default function Companion() {
  const [sec, setSec] = useState("home");

  useEffect(() => {
    const els = ["home", ...Object.keys(MAP)].map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setSec(e.target.id)),
      { threshold: 0.4 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const cur = MAP[sec];
  return (
    <div className={`fixed bottom-3 left-3 z-40 transition-all duration-500 ${cur ? "opacity-100" : "pointer-events-none translate-y-24 opacity-0"}`}>
      {cur && <Character key={cur.kind} kind={cur.kind} lines={cur.lines} tag={false} className="w-24 sm:w-32" />}
    </div>
  );
}