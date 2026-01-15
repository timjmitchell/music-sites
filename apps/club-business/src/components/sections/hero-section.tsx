import Image from "next/image";

export function HeroSection() {
  return (
    <section className="pt-16">
      {/* Hero Image */}
      <div className="w-full">
        <Image
          src="/red-wide-noguit2-cblogo-gray.jpg"
          alt="Club Business"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </div>
    </section>
  );
}
