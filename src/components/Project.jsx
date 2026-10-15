import React, { useEffect, useState } from "react";
import { useAOS, img } from "../hooks/useUi.js";
import { projects } from "../data/projects.js";

const COLORS = ["var(--c3)", "var(--c2)", "var(--c4)", "var(--c1)", "var(--c5)", "var(--c6)"];

export default function Project() {
  useAOS();
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <div className="k-section" style={{ background: "var(--soft)" }}>
      <div className="k-wrap">
        <div className="text-center" data-aos="fade-up"><h2 className="k-h2" style={{ background: "var(--c2)" }}>Projects</h2></div>
        <p className="mt-4 text-center font-semibold" data-aos="fade-up">{projects.length} proyek — klik kartu untuk detailnya 👇</p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <div key={p.id ?? i} data-aos="fade-up" data-aos-delay={(i % 3) * 120}>
              <button onClick={() => setOpen(p)}
                className="k-sticker group block w-full overflow-hidden text-left transition duration-200 hover:!rotate-0 hover:-translate-y-2"
                style={{ transform: `rotate(${[-1.5, 1, -0.8, 1.6][i % 4]}deg)` }}>
                <div className="border-b-[3px] p-3" style={{ background: COLORS[i % COLORS.length], borderColor: "var(--ink)" }}>
                  <img src={img(p.image)} alt={p.title} className="h-44 w-full rounded-xl border-[3px] bg-white object-contain transition duration-500 group-hover:scale-105" style={{ borderColor: "#1b1b3a" }} />
                </div>
                <div className="p-4">
                  <h3 className="mb-1 text-xl font-bold">{p.title}</h3>
                  <p className="line-clamp-3 text-sm opacity-80">{p.description}</p>
                  <span className="mt-3 inline-block font-bold transition group-hover:translate-x-1">Lihat detail →</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4" onClick={() => setOpen(null)}>
          <div onClick={(e) => e.stopPropagation()} className="k-sticker k-modal max-h-[90vh] w-full max-w-3xl overflow-auto p-6">
            <img src={img(open.image)} alt={open.title} className="mb-4 w-full rounded-xl border-[3px] bg-white object-contain" style={{ borderColor: "var(--ink)" }} />
            <h3 className="mb-2 text-2xl font-bold">{open.title}</h3>
            <p className="leading-relaxed">{open.description}</p>
            <button onClick={() => setOpen(null)} className="k-btn mt-5 w-full justify-center" style={{ background: "var(--c2)" }}>Tutup ✕</button>
          </div>
        </div>
      )}
    </div>
  );
}