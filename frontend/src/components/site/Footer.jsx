import { COMPANY } from "@/data/site";
import { FOOTER } from "@/constants/testIds";

export const Footer = () => {
  return (
    <footer
      data-testid={FOOTER.section}
      className="bg-[#1C1C1C] text-[#FAF9F6] py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12 border-b border-[#FAF9F6]/15">
          <div className="md:col-span-5">
            <div className="flex items-baseline gap-3">
              <span className="font-serif-r2 text-5xl">R<sup className="text-2xl">2</sup></span>
              <span className="uppercase tracking-[0.3em] text-[10px] text-[#E8E4DB]/70">
                Construction
              </span>
            </div>
            <p className="mt-6 text-[#E8E4DB]/70 max-w-md leading-relaxed">
              {COMPANY.tagline}. Senior-led residential remodeling, renovation, and
              additions for Colorado homes.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="uppercase tracking-[0.3em] text-[10px] text-[#9E907F] mb-5">Visit</p>
            <ul className="space-y-3 font-sans-r2">
              <li><a href="#services" className="hover:underline underline-offset-4">Services</a></li>
              <li><a href="#portfolio" className="hover:underline underline-offset-4">Portfolio</a></li>
              <li><a href="#about" className="hover:underline underline-offset-4">About</a></li>
              <li><a href="#estimate" className="hover:underline underline-offset-4">Request Estimate</a></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="uppercase tracking-[0.3em] text-[10px] text-[#9E907F] mb-5">Contact</p>
            <ul className="space-y-3 font-sans-r2">
              <li><a href={COMPANY.phoneHref} className="hover:underline underline-offset-4">{COMPANY.phone}</a></li>
              <li><a href={COMPANY.emailHref} className="hover:underline underline-offset-4 break-all">{COMPANY.email}</a></li>
              <li className="text-[#E8E4DB]/70">{COMPANY.area}</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#E8E4DB]/60 uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} R² Construction. Licensed & Insured.</p>
          <a href="/admin" data-testid="footer-admin-link" className="hover:text-[#FAF9F6]">Admin</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
