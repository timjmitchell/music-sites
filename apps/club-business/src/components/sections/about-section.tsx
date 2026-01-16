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
              There comes a time when your basement studio feels like home and you trade dilusions of grandeur for different dilusions. I could say something pithy like "this music is very personal", but that's pretentious, but it is.  This is all me, from soup to nuts, no one to blame, and no one to complain. It was just me without a net, larping bargain basement Prince or something.   
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Enough with the self-deprecation, ok, fine. After a musical life spent in indie rock (<a href="https://open.spotify.com/artist/1iwR6f7MoIBAu3RDCiKhhI" target="_blank" rel="noopener noreferrer" className="text-iris-400 hover:text-iris-200 underline">Pinq</a>, <a href="https://open.spotify.com/artist/7clr9vL9EfYUb9JDsyRsgs" target="_blank" rel="noopener noreferrer" className="text-iris-400 hover:text-iris-200 underline">The Decoration</a>), and yes - METAL (<a href="https://open.spotify.com/artist/5wZZXtlsvc4XRJo09a5RXY" target="_blank" rel="noopener noreferrer" className="text-iris-400 hover:text-iris-200 underline">Hot Fog</a>) - I wanted to do something all on my own and also out of my wheelhouse, and if that seems like a bad idea, well, it took me 2 years to finish 3 songs. I&apos;m going to keep going though... not be so precious. You can&apos;t stop me.
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
