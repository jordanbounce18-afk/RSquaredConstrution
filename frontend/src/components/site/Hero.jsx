import { ArrowRight, ArrowDown } from "lucide-react";
import { HERO } from "@/constants/testIds";

const HERO_IMG = "https://images.pexels.com/photos/7045356/pexels-photo-7045356.jpeg";

export const Hero = () => {
  return (
    <section
      id="home"
      data-testid={HERO.section}
      className="relative w-full min-h-[100svh] overflow-hidden bg-[#1C1C1C] text-[#FAF9F6]"
    >
      <img
        src={HERO_IMG}
        alt="High-end kitchen remodel"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C]/70 via-[#1C1C1C]/30 to-[#1C1C1C]/80" />
      <div className="r2-grain absolute inset-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-44 md:pt-56 pb-24 md:pb-32">
        <div className="max-w-4xl">
          <p className="r2-fade-up r2-delay-100 uppercase tracking-[0.32em] text-[11px] text-[#E8E4DB] mb-8 font-sans-r2">
            R² Construction — Remodel · Renovate · Refine
          </p>
          <h1 className="r2-fade-up r2-delay-200 font-serif-r2 text-5xl md:text-7xl lg:text-[88px] font-light leading-[1.02] tracking-tight">
            Spaces, built to be
            <span className="block italic font-light text-[#E8E4DB]">lived in for decades.</span>
          </h1>
          <p className="r2-fade-up r2-delay-300 mt-10 max-w-xl text-base md:text-lg text-[#E8E4DB]/85 leading-relaxed">
            We are a residential remodeling and renovation studio crafting kitchens,
            bathrooms, whole-home transformations, additions, and outdoor living with
            quiet, considered detail.
          </p>

          <div className="r2-fade-up r2-delay-400 mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#estimate"
              data-testid={HERO.primaryCta}
              className="inline-flex items-center gap-3 bg-[#FAF9F6] text-[#1C1C1C] hover:bg-white px-8 py-4 uppercase tracking-[0.24em] text-[11px] font-sans-r2 transition-colors group"
            >
              Request a Free Estimate
              <ArrowRight strokeWidth={1.5} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              data-testid={HERO.secondaryCta}
              className="inline-flex items-center gap-3 border border-[#FAF9F6]/40 text-[#FAF9F6] hover:bg-[#FAF9F6] hover:text-[#1C1C1C] px-8 py-4 uppercase tracking-[0.24em] text-[11px] font-sans-r2 transition-colors"
            >
              See Our Work
            </a>
          </div>
        </div>

        <div className="r2-fade-up r2-delay-500 mt-24 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-[#FAF9F6]/15 pt-10">
          {[
            { k: "120+", v: "Projects Delivered" },
            { k: "14yr", v: "Combined Craft" },
            { k: "98%", v: "Repeat & Referral" },
            { k: "On-Time", v: "Schedule Discipline" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-serif-r2 text-3xl md:text-4xl text-[#FAF9F6]">{s.k}</div>
              <div className="mt-2 uppercase tracking-[0.2em] text-[10px] text-[#E8E4DB]/70">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#FAF9F6]/70 hover:text-[#FAF9F6] flex flex-col items-center gap-2"
        aria-label="Scroll"
      >
        <span className="uppercase tracking-[0.3em] text-[10px]">Scroll</span>
        <ArrowDown strokeWidth={1.25} className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
