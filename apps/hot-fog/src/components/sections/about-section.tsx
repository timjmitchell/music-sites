const members = [
  { name: "Alex Reed", role: "Vocals/Guitar" },
  { name: "Jordan Blake", role: "Lead Guitar" },
  { name: "Sam Torres", role: "Bass" },
  { name: "Casey Quinn", role: "Drums" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-2">
            Who We Are
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About The Band</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
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

          <div className="grid grid-cols-2 gap-4">
            {members.map((member) => (
              <div
                key={member.name}
                className="aspect-square bg-gradient-to-br from-primary/20 to-accent/10 rounded-lg flex items-end p-4"
              >
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {member.name}
                  </p>
                  <p className="text-muted-foreground text-xs">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
