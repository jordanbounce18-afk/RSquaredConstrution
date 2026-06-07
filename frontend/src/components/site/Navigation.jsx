import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { COMPANY } from "@/data/site";
import { NAV } from "@/constants/testIds";

const links = [
  { to: "/#services", label: "Services", id: NAV.services },
  { to: "/#portfolio", label: "Portfolio", id: NAV.portfolio },
  { to: "/#about", label: "About", id: NAV.about },
  { to: "/#contact", label: "Contact", id: NAV.contact },
];

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#DCD7CE]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link to="/" data-testid={NAV.logo} className="flex items-baseline gap-2 group">
          <span className="font-serif-r2 text-3xl tracking-tight text-[#1C1C1C]">
            R<sup className="text-base">2</sup>
          </span>
          <span className="hidden sm:block uppercase tracking-[0.28em] text-[10px] text-[#595959] font-sans-r2">
            Construction
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.to}
              data-testid={l.id}
              className="r2-link uppercase tracking-[0.2em] text-xs text-[#1C1C1C] font-sans-r2"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={COMPANY.phoneHref}
            data-testid={NAV.adminLink}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#595959] hover:text-[#1C1C1C] transition-colors"
          >
            <Phone strokeWidth={1.5} className="w-4 h-4" />
            {COMPANY.phone}
          </a>
          <a
            href="/#estimate"
            data-testid={NAV.estimateCta}
            className="bg-[#1C1C1C] text-[#FAF9F6] hover:bg-[#333] transition-colors px-6 py-3 uppercase tracking-[0.2em] text-[11px] font-sans-r2"
          >
            Request Estimate
          </a>
        </div>

        <button
          data-testid={NAV.mobileToggle}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden p-2 text-[#1C1C1C]"
        >
          {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#FAF9F6] border-t border-[#DCD7CE]">
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.to}
                data-testid={`${l.id}-mobile`}
                className="uppercase tracking-[0.2em] text-sm text-[#1C1C1C]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/#estimate"
              className="mt-2 bg-[#1C1C1C] text-[#FAF9F6] px-6 py-3 uppercase tracking-[0.2em] text-xs text-center"
            >
              Request Estimate
            </a>
            <a href={COMPANY.phoneHref} className="text-[#595959] text-sm">
              {COMPANY.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
