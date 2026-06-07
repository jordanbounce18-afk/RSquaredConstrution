import { TESTIMONIALS } from "@/data/site";
import { TESTIMONIALS as IDS } from "@/constants/testIds";
import { Quote } from "lucide-react";

export const Testimonials = () => {
  return (
    <section
      data-testid={IDS.section}
      className="relative bg-[#1C1C1C] text-[#FAF9F6] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end mb-16">
          <div className="md:col-span-4">
            <p className="uppercase tracking-[0.3em] text-[11px] text-[#9E907F]">04 — Voices</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-serif-r2 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              The work speaks.
              <span className="italic text-[#E8E4DB]"> The clients second it.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <figure
              key={t.author}
              data-testid={IDS.item(idx)}
              className="bg-[#262626] border border-[#333] p-8 md:p-10"
            >
              <Quote strokeWidth={1} className="w-6 h-6 text-[#9E907F] mb-6" />
              <blockquote className="font-serif-r2 text-xl md:text-2xl italic text-[#FAF9F6] leading-snug">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-[#333]">
                <div className="text-[#FAF9F6] font-medium">{t.author}</div>
                <div className="text-[#E8E4DB]/60 text-xs uppercase tracking-[0.2em] mt-1">
                  {t.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
