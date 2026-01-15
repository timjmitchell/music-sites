import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-iris-400 font-mono text-sm tracking-widest uppercase mb-2">
            Who What Why?
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-iris-200 mb-4">About</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Born in the underground music scene of 2020, Club Business emerged
              as a force that refuses to be defined. Our sound blends the raw
              energy of alternative rock with electronic undertones and
              introspective lyrics.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Four musicians united by a shared vision: to create music that
              resonates deep within the soul. From intimate club shows to
              festival stages, we bring the same intensity and passion to every
              performance.
            </p>
          </div>

          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="/huh-cropped-ppl.jpg"
              alt="Club Business band photo"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
