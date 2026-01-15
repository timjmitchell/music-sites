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
              There comes a time when your basement studio feels like home and you trade dilusions of grandeur for dilusions of creative expression. I could say something pithy like "it's very personal", but of course it fucking is, because it was just me without a net, larping bargain basement Prince or something.   
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Enough with the self-deprecation, ok, fine. After a musical life spent in punk, indie rock, and yes - METAL - I wanted to do something all on my own and also out of my wheelhouse, and if that seems like a bad idea, well, it took me 2 years to finish 3 songs. I'm going to keep going though... not be so precious. You can't stop me.
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
