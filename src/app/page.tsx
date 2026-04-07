import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <Hero />
      <Services />
      <Work />
      <Process />
      <Pricing />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
