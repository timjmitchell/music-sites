"use client";

import { Play } from "lucide-react";
import { AudioPlayer, TrackList, useAudioPlayer, type Track } from "@/components/audio-player";

// Sample tracks - replace src with R2 URLs when ready
const tracks: Track[] = [
  {
    id: "1",
    title: "Midnight Echoes",
    album: "Neon Dreams",
    duration: "4:32",
    // TODO: Replace with actual R2 URL
    src: "", // Will be: `${process.env.NEXT_PUBLIC_R2_URL}/audio/midnight-echoes.mp3`
  },
  {
    id: "2",
    title: "Shattered Glass",
    album: "Neon Dreams",
    duration: "3:48",
    src: "",
  },
  {
    id: "3",
    title: "Electric Pulse",
    album: "Neon Dreams",
    duration: "5:01",
    src: "",
  },
  {
    id: "4",
    title: "Fading Lights",
    album: "Neon Dreams",
    duration: "4:15",
    src: "",
  },
];

export function MusicSection() {
  const player = useAudioPlayer(tracks);

  return (
    <section id="music" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-2">
            Latest Release
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Neon Dreams</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our debut album exploring the depths of modern alternative rock
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Album Art + Player */}
          <div className="space-y-4">
            {/* Album Art */}
            <div className="relative group">
              <div className="aspect-square bg-gradient-to-br from-primary/30 via-accent/20 to-secondary rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-foreground">
                      CLUB BUSINESS
                    </h3>
                    <p className="text-primary mt-2">Neon Dreams</p>
                  </div>
                </div>
              </div>
              {!player.isPlaying && (
                <div
                  onClick={() => player.play(0)}
                  className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg cursor-pointer"
                >
                  <button className="w-16 h-16 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </button>
                </div>
              )}
            </div>

            {/* Player Controls */}
            <AudioPlayer
              currentTrack={player.currentTrack}
              isPlaying={player.isPlaying}
              currentTime={player.currentTime}
              duration={player.duration}
              volume={player.volume}
              isMuted={player.isMuted}
              onTogglePlay={player.togglePlay}
              onSeek={player.seek}
              onSetVolume={player.setVolume}
              onToggleMute={player.toggleMute}
              onNextTrack={player.nextTrack}
              onPrevTrack={player.prevTrack}
            />
          </div>

          {/* Track List */}
          <TrackList
            tracks={tracks}
            currentTrackIndex={player.currentTrackIndex}
            isPlaying={player.isPlaying}
            onTrackSelect={(index) => player.play(index)}
          />
        </div>
      </div>
    </section>
  );
}
