import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/** Ikuti tema gelap/terang dari kelas "dark" di <html> (diatur tombol tema di Layout). */
export function useDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const el = document.documentElement;
    const sync = () => setDark(el.classList.contains("dark"));
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return dark;
}

/** Aktifkan animasi scroll (AOS) lalu hitung ulang posisi setelah semua section tampil. */
export function useAOS() {
  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-out-cubic", once: true, offset: 80 });
    const t = setTimeout(() => AOS.refreshHard(), 500);
    return () => clearTimeout(t);
  }, []);
}

/** Di Astro, import gambar berupa objek { src }. */
export const img = (i) => i?.src ?? i;
