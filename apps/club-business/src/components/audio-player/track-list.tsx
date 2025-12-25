"use client";

import { Play, Pause } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Track } from "./use-audio-player";

interface TrackListProps {
  tracks: Track[];
  currentTrackIndex: number | null;
  isPlaying: boolean;
  onTrackSelect: (index: number) => void;
}

export function TrackList({
  tracks,
  currentTrackIndex,
  isPlaying,
  onTrackSelect,
}: TrackListProps) {
  return (
    <div className="space-y-3">
      {tracks.map((track, index) => {
        const isActive = currentTrackIndex === index;
        const isCurrentlyPlaying = isActive && isPlaying;

        return (
          <Card
            key={track.id}
            onClick={() => onTrackSelect(index)}
            className={`
              bg-card/50 border-border/50 p-4 flex items-center gap-4
              hover:bg-card transition-colors cursor-pointer group
              ${isActive ? "bg-card border-primary/50" : ""}
            `}
          >
            {/* Track Number / Play indicator */}
            <span className="text-muted-foreground font-mono text-sm w-6 flex items-center justify-center">
              {isCurrentlyPlaying ? (
                <span className="flex gap-0.5">
                  <span className="w-1 h-3 bg-primary rounded-full animate-pulse" />
                  <span className="w-1 h-3 bg-primary rounded-full animate-pulse delay-75" />
                  <span className="w-1 h-3 bg-primary rounded-full animate-pulse delay-150" />
                </span>
              ) : (
                String(index + 1).padStart(2, "0")
              )}
            </span>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <h4
                className={`
                font-medium truncate transition-colors
                ${isActive ? "text-primary" : "text-foreground group-hover:text-primary"}
              `}
              >
                {track.title}
              </h4>
              {track.artist && (
                <p className="text-sm text-muted-foreground truncate">
                  {track.artist}
                </p>
              )}
            </div>

            {/* Duration */}
            <span className="text-muted-foreground font-mono text-sm">
              {track.duration}
            </span>

            {/* Play/Pause Icon */}
            <div className="w-8 h-8 flex items-center justify-center">
              {isCurrentlyPlaying ? (
                <Pause className="w-4 h-4 text-primary" />
              ) : (
                <Play className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
