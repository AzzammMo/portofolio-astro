import React, { useState } from "react";
import { useAOS } from "../hooks/useUi.js";

const ENDPOINT = "https://formspree.io/f/xbljeagy"; // pastikan ini form Formspree yang benar

export default function Contact() {
  useAOS();
  const [state, setState] = useState("idle"); // idle | sending | ok | fail

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      const r = await fetch(ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
      if (r.ok) { setState("ok"); form.reset(); } else setState("fail");
    } catch { setState("fail"); }
  };

  return (
    <div className="k-section !pb-40" style={{ background: "var(--soft)" }}>
      <div className="k-wrap max-w-xl">
        <div className="text-center" data-aos="fade-up">
          <h2 className="k-h2" style={{ background: "var(--c3)" }}>Contact Me <span className="inline-block animate-bounce" aria-hidden>📬</span></h2>
        </div>
        <p className="mt-6 text-center text-lg" data-aos="fade-up" data-aos-delay="100">
          Punya pertanyaan atau ingin berkolaborasi? Isi formulir di bawah, saya senang mendengar dari Anda!
        </p>

        <form onSubmit={submit} className="k-sticker mt-8 space-y-4 p-6" data-aos="zoom-in" data-aos-delay="200" style={{ transform: "rotate(-.6deg)" }}>
          <input required type="text" name="name" placeholder="👤  Nama Anda" className="k-field" />
          <input required type="email" name="email" placeholder="✉️  Email Anda" className="k-field" />
          <textarea required name="message" rows="5" placeholder="💬  Pesan Anda" className="k-field" />

          <button type="submit" disabled={state === "sending"} className="k-btn w-full justify-center" style={{ background: "var(--c1)" }}>
            {state === "sending" ? <>Mengirim <span className="k-spin inline-block">⏳</span></> : <>Kirim Pesan <span className="k-fly inline-block">✈️</span></>}
          </button>

          <div role="status" className="h-6 text-center font-bold">
            {state === "ok" && <p className="k-modal">Pesan terkirim! 🎉</p>}
            {state === "fail" && <p className="k-modal" style={{ color: "var(--c2)" }}>Gagal mengirim. Coba lagi ya.</p>}
          </div>
        </form>
      </div>
    </div>
  );
}