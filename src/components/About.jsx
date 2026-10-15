import React from "react";
import ProfileImage from "../assets/ProfileImage.png";
import { useAOS, img } from "../hooks/useUi.js";

const SPARK = [
  { t: "Scalable", d: "Architecting systems that handle growing workloads without sacrificing performance.", e: "⚡", c: "var(--c3)" },
  { t: "Performant", d: "Optimizing for speed and efficiency so every interaction feels instant and reliable.", e: "🚀", c: "var(--c4)" },
  { t: "Aesthetic", d: "Crafting polished interfaces, because thoughtful design raises the perceived usability of a product.", e: "🎨", c: "var(--c5)" },
  { t: "Responsive", d: "Building layouts that adapt seamlessly to any screen size and device.", e: "📱", c: "var(--c2)" },
  { t: "Keep it Simple", d: "Favoring clear, minimal interactions that make products faster to learn and easier to use.", e: "🧩", c: "var(--c1)" },
];

export default function About() {
  useAOS();
  return (
    <div className="k-section">
      <div className="k-wrap">
        <div className="text-center" data-aos="fade-up"><h2 className="k-h2">About Me</h2></div>

        <div className="mt-14 flex flex-col items-center gap-12 md:flex-row">
          <div className="k-sticker p-6 md:w-1/2 md:p-8" data-aos="fade-right" style={{ transform: "rotate(-1.5deg)" }}>
            <p className="text-lg">
              I'm <b>Muh. Azzam Izzadin</b>, a{" "}
              <span className="rounded border-2 px-1 font-bold" style={{ background: "var(--c3)", color: "#1b1b3a", borderColor: "#1b1b3a" }}>fullstack developer</span>
              . Laravel is my primary stack and the foundation of most of the projects I've built. I have a strong affinity for the PHP ecosystem, and I also work with JavaScript frameworks such as React.js and Next.js, though to a lesser extent than PHP.
            </p>
            <p className="mt-4">
              My work spans the full development lifecycle: backend and frontend development, database management, API integration, testing, UAT, penetration testing, debugging, and deployment. Beyond shipping features, I focus on performance optimization, efficient request handling, and sound system architecture, building secure, maintainable applications that stay reliable under real-world load.
            </p>
          </div>

          <div className="flex justify-center md:w-1/2" data-aos="zoom-in">
            <div className="relative">
              <span aria-hidden className="k-spin absolute -right-6 -top-6 z-10 text-5xl" style={{ color: "var(--c1)", WebkitTextStroke: "2px #1b1b3a" }}>✦</span>
              <img src={img(ProfileImage)} alt="Profile photo"
                className="k-bob relative w-60 rounded-3xl border-[3px] bg-white md:w-72"
                style={{ borderColor: "var(--ink)", boxShadow: "8px 8px 0 var(--c2), 8px 8px 0 3px var(--ink)", transform: "rotate(2deg)" }} />
            </div>
          </div>
        </div>

        <h3 className="mb-10 mt-20 text-center text-4xl font-bold" data-aos="fade-up">
          S·P·A·R·K <span className="k-spin inline-block">✨</span>
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SPARK.map((s, i) => (
            <div key={s.t} data-aos="zoom-in" data-aos-delay={i * 90}
              className="k-sticker p-5 transition duration-200 hover:!rotate-0 hover:-translate-y-1"
              style={{ background: s.c, color: "#1b1b3a", transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}>
              <div className="k-bob mb-2 text-4xl" style={{ animationDelay: `${i * 0.3}s` }}>{s.e}</div>
              <h4 className="text-xl font-bold">{s.t}</h4>
              <p className="text-sm font-medium">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}