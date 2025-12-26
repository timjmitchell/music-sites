"use client";

import Image from "next/image";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Volume1,
} from "lucide-react";
import { useAudioPlayer, type Track } from "./use-audio-player";
import { cn } from "@/lib/utils";

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

interface BarPlayerProps {
  tracks: Track[];
  defaultCoverArt?: string;
  className?: string;
}

export function BarPlayer({ tracks, defaultCoverArt, className }: BarPlayerProps) {
  const player = useAudioPlayer(tracks, { enableKeyboardControls: true });
  const progress = player.duration ? (player.currentTime / player.duration) * 100 : 0;

  const VolumeIcon = player.isMuted || player.volume === 0
    ? VolumeX
    : player.volume < 0.5
    ? Volume1
    : Volume2;

  const coverArt = player.currentTrack?.coverArt || defaultCoverArt;

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      {/* Main Player Bar */}
      <div className="bg-card border border-border rounded-t-lg overflow-hidden">
        {/* Top Section: Cover Art + Track Info + Controls */}
        <div className="flex items-center gap-4 p-4">
          {/* Cover Art */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
            {coverArt ? (
              <Image
                src={coverArt}
                alt={player.currentTrack?.title || "Album cover"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                <Volume2 className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">
              {player.currentTrack?.title || "Select a track"}
            </h3>
            {player.currentTrack?.artist && (
              <p className="text-sm text-muted-foreground truncate">
                {player.currentTrack.artist}
              </p>
            )}
            {player.currentTrack?.album && (
              <p className="text-xs text-muted-foreground/70 truncate">
                {player.currentTrack.album}
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Previous */}
            <button
              onClick={player.prevTrack}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Previous track"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={player.togglePlay}
              className="w-12 h-12 md:w-14 md:h-14 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
              aria-label={player.isPlaying ? "Pause" : "Play"}
            >
              {player.isPlaying ? (
                <Pause className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Play className="w-5 h-5 md:w-6 md:h-6 ml-0.5" />
              )}
            </button>

            {/* Next */}
            <button
              onClick={player.nextTrack}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Next track"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            {/* Volume - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2 ml-2">
              <button
                onClick={player.toggleMute}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={player.isMuted ? "Unmute" : "Mute"}
              >
                <VolumeIcon className="w-5 h-5" />
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={player.isMuted ? 0 : player.volume}
                onChange={(e) => player.setVolume(parseFloat(e.target.value))}
                className="w-20 h-1.5 bg-muted rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-3
                  [&::-webkit-slider-thumb]:h-3
                  [&::-webkit-slider-thumb]:bg-primary
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pb-4">
          <div
            className="h-2 bg-muted rounded-full cursor-pointer group relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = (e.clientX - rect.left) / rect.width;
              player.seek(percent * player.duration);
            }}
          >
            <div
              className="h-full bg-primary rounded-full relative transition-all"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2 font-mono">
            <span>{formatTime(player.currentTime)}</span>
            <span>{formatTime(player.duration)}</span>
          </div>
        </div>
      </div>

      {/* Playlist */}
      <div className="bg-card/50 border border-t-0 border-border rounded-b-lg overflow-hidden">
        <div className="divide-y divide-border/50">
          {tracks.map((track, index) => {
            const isActive = player.currentTrackIndex === index;
            const isPlaying = isActive && player.isPlaying;

            return (
              <button
                key={track.id}
                onClick={() => player.play(index)}
                className={cn(
                  "w-full flex items-center gap-4 p-3 md:p-4 text-left transition-colors hover:bg-muted/50",
                  isActive && "bg-primary/5"
                )}
              >
                {/* Track Number / Playing Indicator */}
                <div className="w-8 flex-shrink-0 text-center">
                  {isPlaying ? (
                    <div className="flex items-center justify-center gap-0.5">
                      <span className="w-1 h-3 bg-primary rounded-full animate-pulse" />
                      <span className="w-1 h-4 bg-primary rounded-full animate-pulse delay-75" />
                      <span className="w-1 h-2 bg-primary rounded-full animate-pulse delay-150" />
                    </div>
                  ) : isActive ? (
                    <Pause className="w-4 h-4 text-primary mx-auto" />
                  ) : (
                    <span className="text-sm text-muted-foreground font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "font-medium truncate transition-colors",
                      isActive ? "text-primary" : "text-foreground"
                    )}
                  >
                    {track.title}
                  </p>
                  {track.artist && (
                    <p className="text-sm text-muted-foreground truncate">
                      {track.artist}
                    </p>
                  )}
                </div>

                {/* Duration */}
                <span className="text-sm text-muted-foreground font-mono flex-shrink-0">
                  {track.duration || "--:--"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Keyboard Hints - Hidden on mobile */}
      <div className="hidden md:flex justify-center gap-6 mt-4 text-xs text-muted-foreground">
        <span>
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">Space</kbd> Play/Pause
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">←</kbd> Prev
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">→</kbd> Next
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">↑↓</kbd> Volume
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">M</kbd> Mute
        </span>
      </div>
    </div>
  );
}
