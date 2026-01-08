import { Navbar } from "@/components/sections/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { MusicSection } from "@/components/sections/music-section";
import { EmailSignupSection } from "@/components/sections/email-signup-section";
import { AboutSection } from "@/components/sections/about-section";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <MusicSection />
        <EmailSignupSection />
      </main>
      <Footer />
    </div>
  );
}
