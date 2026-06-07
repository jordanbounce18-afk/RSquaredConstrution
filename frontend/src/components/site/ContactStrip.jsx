import { Phone, Mail, MapPin } from "lucide-react";
import { COMPANY } from "@/data/site";
import { CONTACT } from "@/constants/testIds";

export const ContactStrip = () => {
  return (
    <section
      id="contact"
      data-testid={CONTACT.section}
      className="relative bg-[#E8E4DB] py-20 md:py-24 border-t border-[#DCD7CE]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        <a href={COMPANY.phoneHref} data-testid={CONTACT.phone} className="group">
          <Phone strokeWidth={1.25} className="w-6 h-6 text-[#1C1C1C]" />
          <p className="uppercase tracking-[0.24em] text-[10px] text-[#9E907F] mt-6">Call</p>
          <p className="font-serif-r2 text-2xl md:text-3xl text-[#1C1C1C] mt-2 group-hover:underline underline-offset-4">
            {COMPANY.phone}
          </p>
        </a>
        <a href={COMPANY.emailHref} data-testid={CONTACT.email} className="group">
          <Mail strokeWidth={1.25} className="w-6 h-6 text-[#1C1C1C]" />
          <p className="uppercase tracking-[0.24em] text-[10px] text-[#9E907F] mt-6">Email</p>
          <p className="font-serif-r2 text-2xl md:text-3xl text-[#1C1C1C] mt-2 break-all group-hover:underline underline-offset-4">
            {COMPANY.email}
          </p>
        </a>
        <div data-testid={CONTACT.area}>
          <MapPin strokeWidth={1.25} className="w-6 h-6 text-[#1C1C1C]" />
          <p className="uppercase tracking-[0.24em] text-[10px] text-[#9E907F] mt-6">Service Area</p>
          <p className="font-serif-r2 text-2xl md:text-3xl text-[#1C1C1C] mt-2">
            {COMPANY.area}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactStrip;
