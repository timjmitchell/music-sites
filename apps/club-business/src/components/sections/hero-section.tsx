import Image from "next/image";

export function HeroSection() {
  return (
    <section className="pt-16">
      {/* Hero Image */}
      <div className="w-full">
        <Image
          src="/hero-image.png"
          alt="Club Business"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Content */}
      <div className="text-center px-4 max-w-4xl mx-auto py-8">
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Take a seat. There is lub business
        </p>
      </div>
    </section>
  );
}
