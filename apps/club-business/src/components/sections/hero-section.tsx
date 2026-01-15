import Image from "next/image";

export function HeroSection() {
  return (
    <section className="pt-16">
      {/* Hero Image */}
      <div className="w-full">
        <Image
          src="/red-wide-noguit.jpg"
          alt="Club Business"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </div>
      {/* Tagline */}
      <div className="text-center py-8">
        <p className="font-display font-bold text-2xl md:text-3xl tracking-widest text-foreground">
          Take a seat. There is club business to be done... alone.
        </p>
      </div>
    </section>
  );
}
