import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/site";
import { SERVICES as IDS } from "@/constants/testIds";

export const Services = () => {
  return (
    <section
      id="services"
      data-testid={IDS.section}
      className="relative bg-[#FAF9F6] py-24 md:py-32 border-t border-[#DCD7CE]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end mb-16 md:mb-20">
          <div className="md:col-span-4">
            <p className="uppercase tracking-[0.3em] text-[11px] text-[#9E907F]">01 — Capabilities</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-serif-r2 text-4xl md:text-6xl font-light tracking-tight text-[#1C1C1C] leading-[1.05]">
              Five disciplines.
              <span className="italic"> One standard of craft.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-[#595959] text-base md:text-lg leading-relaxed">
              Whether you are reimagining a single room or rebuilding the entire envelope,
              every R² project is led by the same principles — clarity, durability, and
              materials chosen to age gracefully.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {SERVICES.map((s, idx) => {
            const span =
              idx === 0
                ? "md:col-span-7"
                : idx === 1
                ? "md:col-span-5"
                : idx === 2
                ? "md:col-span-4"
                : idx === 3
                ? "md:col-span-4"
                : idx === 4
                ? "md:col-span-4"
                : "md:col-span-12";
            return (
              <a
                key={s.slug}
                href="#estimate"
                data-testid={IDS.card(s.slug)}
                className={`group relative overflow-hidden bg-[#F2EFE9] border border-[#DCD7CE] ${span}`}
              >
                <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-10 flex items-start justify-between gap-6">
                  <div>
                    <p className="uppercase tracking-[0.3em] text-[10px] text-[#9E907F] mb-3">
                      0{idx + 1}
                    </p>
                    <h3 className="font-serif-r2 text-2xl md:text-3xl text-[#1C1C1C] mb-3 leading-tight">
                      {s.title}
                    </h3>
                    <p className="text-[#595959] text-sm md:text-base leading-relaxed max-w-md">
                      {s.description}
                    </p>
                  </div>
                  <ArrowUpRight
                    strokeWidth={1.25}
                    className="w-6 h-6 text-[#1C1C1C] flex-shrink-0 mt-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
