"use client";

import { BarPlayer, type Track } from "@/components/audio-player";

const R2_URL = "https://pub-5c42135ba19f42c8bf2be18a72dda052.r2.dev";

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
      <div className="max-w-4xl mx-auto">
        <BarPlayer
          tracks={tracks}
          defaultCoverArt="/club-business-cover.jpg"
        />
      </div>
    </section>
  );
}
