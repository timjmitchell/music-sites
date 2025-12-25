import { Navbar } from "@/components/sections/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { MusicSection } from "@/components/sections/music-section";
import { TourSection } from "@/components/sections/tour-section";
import { AboutSection } from "@/components/sections/about-section";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <MusicSection />
        <TourSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
