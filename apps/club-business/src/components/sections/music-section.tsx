"use client";

import { BarPlayer, type Track } from "@/components/audio-player";
import { StreamingLinks } from "@/components/streaming-links";

const R2_URL = "https://pub-5c42135ba19f42c8bf2be18a72dda052.r2.dev";
const ALBUM_URL = "https://music.apple.com/us/album/love-death-karaoke-single/1865060257";

const tracks: Track[] = [
  {
    id: "1",
    title: "L'apelle Du Vide",
    artist: "Club Business",
    album: "Club Business",
    duration: "4:12",
    src: `${R2_URL}/L'apelle%20Du%20Vide.mp3`,
  },
  {
    id: "2",
    title: "The Savior",
    artist: "Club Business",
    album: "Club Business",
    duration: "3:58",
    src: `${R2_URL}/The%20Savior.mp3`,
  },
  {
    id: "3",
    title: "Everything",
    artist: "Club Business",
    album: "Club Business",
    duration: "3:45",
    src: `${R2_URL}/Everything.mp3`,
  },
];

export function MusicSection() {
  return (
    <section id="music" className="py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Album Description */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-wide text-iris-200 mb-4">
            Love, Death &amp; Karaoke
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            This is the debut offering from Club Business, unnecessary sobriquet for Tim Mitchell, as if anyone is looking for him. Nonetheless, this very solo mission was planned, executed, and now this. The result, you will obviously judge for yourself. I did my best to make what was in my head, which sounded amazing, but we know that never works out. I can guarantee, however, that it came from the heart.   
          </p>
        </div>

        <BarPlayer
          tracks={tracks}
          defaultCoverArt="/club-business-album-brass.jpg"
          albumTitle="Love, Death & Karaoke"
        />
        <StreamingLinks musicUrl={ALBUM_URL} title="Stream the Album" />
      </div>
    </section>
  );
}
