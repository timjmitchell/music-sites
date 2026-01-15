"use client";

import { BarPlayer, type Track } from "@/components/audio-player";
import { StreamingLinks } from "@/components/streaming-links";

const R2_URL = "https://pub-5c42135ba19f42c8bf2be18a72dda052.r2.dev";
const ALBUM_URL = "https://music.apple.com/us/album/love-death-karaoke-single/1865060257";

const tracks: Track[] = [
  {
    id: "1",
    title: "L'appel Du Vide",
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
            Three tracks exploring the space between intimacy and isolation.
            Raw, electronic-tinged alternative rock for late nights and early
            mornings.
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
