import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useAOS, img } from "../hooks/useUi.js";
import { certifications } from "../data/certifications.js";

export default function Certifications() {
  useAOS();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  // Riak gelembung saat disentuh/klik
  const ripple = (e) => {
    const b = document.createElement("div");
    b.className = "touch-bubble";
    b.style.left = `${e.clientX}px`;
    b.style.top = `${e.clientY}px`;
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 600);
  };

  return (
    <div onPointerDown={ripple} className="k-section">
      <div className="k-wrap">
        <div className="text-center" data-aos="fade-up"><h2 className="k-h2" style={{ background: "var(--c4)" }}>Certifications</h2></div>

        <div className="mt-12" data-aos="zoom-in">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 3000, pauseOnMouseEnter: true, disableOnInteraction: false }}
            className="!px-2 !pb-12 !pt-2"
          >
            {certifications.map((c) => (
              <SwiperSlide key={c.title} className="!h-auto p-1">
                <button onClick={() => setSelected(c)} className="k-sticker group relative block w-full overflow-hidden transition hover:-translate-y-1 hover:-rotate-1">
                  <img src={img(c.imageUrl)} alt={c.title} className="h-48 w-full object-cover transition duration-500 group-hover:scale-110" />
                  <div className="border-t-[3px] p-3 text-center font-bold" style={{ background: "var(--c1)", color: "#1b1b3a", borderColor: "var(--ink)" }}>{c.title}</div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4" onClick={() => setSelected(null)}>
          <div onClick={(e) => e.stopPropagation()} className="k-sticker k-modal relative max-h-[85vh] max-w-3xl overflow-auto p-4">
            <button onClick={() => setSelected(null)} aria-label="Tutup" className="absolute right-3 top-2 text-2xl font-bold hover:text-red-500">✕</button>
            <img src={img(selected.imageUrl)} alt={selected.title} className="mt-6 max-w-full rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}