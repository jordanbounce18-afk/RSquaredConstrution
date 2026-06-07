import { ABOUT } from "@/constants/testIds";

const ABOUT_IMG = "https://images.pexels.com/photos/10738764/pexels-photo-10738764.jpeg";

export const About = () => {
  return (
    <section
      id="about"
      data-testid={ABOUT.section}
      className="relative bg-[#FAF9F6] py-24 md:py-32 border-t border-[#DCD7CE]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
        <div className="md:col-span-5">
          <p className="uppercase tracking-[0.3em] text-[11px] text-[#9E907F] mb-6">03 — About R²</p>
          <h2 className="font-serif-r2 text-4xl md:text-5xl font-light tracking-tight text-[#1C1C1C] leading-[1.05]">
            A small studio.
            <span className="italic"> Built around the build.</span>
          </h2>
          <div className="mt-8 space-y-5 text-[#595959] text-base md:text-lg leading-relaxed">
            <p>
              R² Construction is a remodeling and renovation studio led by craftsmen who
              have spent decades on tools. We take on a measured number of projects each
              year so every site gets a senior eye, every day.
            </p>
            <p>
              We work in plaster and stone, in old framing and new glass — comfortable in
              both century-old homes and forward-leaning new builds.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-[#DCD7CE] pt-8">
            {[
              { k: "Licensed", v: "& Insured" },
              { k: "Local", v: "Colorado-based" },
              { k: "Senior-led", v: "Every project" },
              { k: "Schedule", v: "Honored, not estimated" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-serif-r2 text-xl md:text-2xl text-[#1C1C1C]">{s.k}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#9E907F] mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-7 relative">
          <div className="relative overflow-hidden">
            <img
              src={ABOUT_IMG}
              alt="Architectural interior"
              className="w-full h-[520px] md:h-[640px] object-cover"
            />
          </div>
          <div className="hidden md:block absolute -bottom-10 -left-10 bg-[#1C1C1C] text-[#FAF9F6] p-8 max-w-xs">
            <p className="font-serif-r2 italic text-2xl leading-snug">
              "Detail isn't decorative. It's structural."
            </p>
            <p className="mt-4 uppercase tracking-[0.3em] text-[10px] text-[#E8E4DB]/80">— R² Studio</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
