import { Button } from "@/components/ui/button";

export function HeroSection() {
  // TODO: Replace with R2 URL once hero image is uploaded
  // const heroImage = `${process.env.NEXT_PUBLIC_R2_URL}/hero-image.png`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient placeholder - replace with image when ready */}
      <div className="absolute inset-0 top-16 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
          <span className="text-muted text-5xl">Club Business</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Where sound meets soul. Experience the raw energy of alternative rock
          that pushes boundaries and ignites emotions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8">
            Listen Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 border-primary/50 text-foreground hover:bg-primary/10"
          >
            Tour Dates
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
