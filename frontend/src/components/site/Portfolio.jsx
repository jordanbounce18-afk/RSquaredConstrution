import { useMemo, useState } from "react";
import { PORTFOLIO_ITEMS } from "@/data/site";
import { PORTFOLIO } from "@/constants/testIds";

const CATEGORIES = ["All", "Full Home", "Kitchen", "Bathroom", "Additions", "Exterior"];

export const Portfolio = () => {
  const [active, setActive] = useState("All");

  const items = useMemo(
    () => (active === "All" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section
      id="portfolio"
      data-testid={PORTFOLIO.section}
      className="relative bg-[#F2EFE9] py-24 md:py-32 border-t border-[#DCD7CE]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end mb-16">
          <div className="md:col-span-4">
            <p className="uppercase tracking-[0.3em] text-[11px] text-[#9E907F]">02 — Selected Work</p>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-serif-r2 text-4xl md:text-6xl font-light tracking-tight text-[#1C1C1C] leading-[1.05]">
              Recent projects.
              <span className="italic"> Built with intention.</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              data-testid={PORTFOLIO.filter(c.toLowerCase().replace(/\s+/g, "-"))}
              onClick={() => setActive(c)}
              className={`px-5 py-2.5 uppercase tracking-[0.2em] text-[10px] border transition-colors ${
                active === c
                  ? "bg-[#1C1C1C] text-[#FAF9F6] border-[#1C1C1C]"
                  : "bg-transparent text-[#1C1C1C] border-[#DCD7CE] hover:bg-[#E8E4DB]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {items.map((p, idx) => (
            <div
              key={p.title}
              data-testid={PORTFOLIO.item(idx)}
              className={`group relative overflow-hidden bg-[#1C1C1C] ${p.span}`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 opacity-95 group-hover:opacity-100"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-[#1C1C1C]/85 via-[#1C1C1C]/30 to-transparent text-[#FAF9F6]">
                <p className="uppercase tracking-[0.3em] text-[10px] text-[#E8E4DB]/80">{p.category}</p>
                <h3 className="font-serif-r2 text-2xl md:text-3xl mt-2 leading-tight">{p.title}</h3>
                <p className="text-[#E8E4DB]/80 text-sm mt-1">{p.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
