import Navigation from "@/components/site/Navigation";
import Hero from "@/components/site/Hero";
import Services from "@/components/site/Services";
import Portfolio from "@/components/site/Portfolio";
import About from "@/components/site/About";
import Testimonials from "@/components/site/Testimonials";
import EstimateForm from "@/components/site/EstimateForm";
import ContactStrip from "@/components/site/ContactStrip";
import Footer from "@/components/site/Footer";

export default function HomePage() {
  return (
    <div className="bg-[#FAF9F6] text-[#1C1C1C]">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Testimonials />
        <EstimateForm />
        <ContactStrip />
      </main>
      <Footer />
    </div>
  );
}
