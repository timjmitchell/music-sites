"use client";

import { useEffect, useState } from "react";
import { Music, Headphones, Radio, ExternalLink } from "lucide-react";

interface OdesliResponse {
  linksByPlatform: Record<
    string,
    {
      url: string;
      country: string;
    }
  >;
  entitiesByUniqueId: Record<
    string,
    {
      title: string;
      artistName: string;
      thumbnailUrl: string;
    }
  >;
  entityUniqueId: string;
}

// Platform display config
const PLATFORMS = {
  spotify: {
    name: "Spotify",
    icon: "spotify",
    color: "#1DB954",
  },
  appleMusic: {
    name: "Apple Music",
    icon: "apple",
    color: "#FA243C",
  },
  tidal: {
    name: "Tidal",
    icon: "tidal",
    color: "#000000",
  },
  amazonMusic: {
    name: "Amazon Music",
    icon: "amazon",
    color: "#FF9900",
  },
  youtubeMusic: {
    name: "YouTube Music",
    icon: "youtube",
    color: "#FF0000",
  },
  soundcloud: {
    name: "SoundCloud",
    icon: "soundcloud",
    color: "#FF5500",
  },
  pandora: {
    name: "Pandora",
    icon: "pandora",
    color: "#224099",
  },
  deezer: {
    name: "Deezer",
    icon: "deezer",
    color: "#FEAA2D",
  },
} as const;

// Priority order for display
const PLATFORM_ORDER = [
  "spotify",
  "appleMusic",
  "soundcloud",
  "youtubeMusic",
  "tidal",
  "amazonMusic",
  "deezer",
  "pandora",
];

interface StreamingLinksProps {
  musicUrl: string;
  title?: string;
  className?: string;
}

export function StreamingLinks({
  musicUrl,
  title = "Listen Now",
  className = "",
}: StreamingLinksProps) {
  const [links, setLinks] = useState<OdesliResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLinks() {
      try {
        const response = await fetch(
          `https://api.song.link/v1-alpha.1/links?url=${encodeURIComponent(musicUrl)}`
        );
        if (!response.ok) throw new Error("Failed to fetch links");
        const data = await response.json();
        setLinks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load links");
      } finally {
        setLoading(false);
      }
    }
    fetchLinks();
  }, [musicUrl]);

  if (loading) {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-10 w-32 bg-muted animate-pulse rounded-md"
          />
        ))}
      </div>
    );
  }

  if (error || !links) {
    return null;
  }

  const availablePlatforms = PLATFORM_ORDER.filter(
    (platform) => links.linksByPlatform[platform]
  );

  return (
    <div className={className}>
      {title && (
        <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-3">
          {title}
        </h3>
      )}
      <div className="flex flex-wrap gap-2">
        {availablePlatforms.map((platform) => {
          const platformConfig = PLATFORMS[platform as keyof typeof PLATFORMS];
          const link = links.linksByPlatform[platform];

          if (!platformConfig || !link) return null;

          return (
            <a
              key={platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-card hover:bg-card/80 border border-border rounded-md text-sm font-medium transition-colors group"
            >
              <PlatformIcon platform={platform} />
              <span>{platformConfig.name}</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

function PlatformIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "spotify":
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1DB954">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      );
    case "appleMusic":
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FA243C">
          <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81.84-.553 1.472-1.287 1.88-2.208.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.8-.56-2.03-1.49-.18-.73.03-1.49.69-1.94.38-.26.82-.39 1.27-.42.39-.03.78-.06 1.16-.14.24-.05.46-.14.64-.35.13-.16.18-.34.18-.54V9.946c0-.26-.06-.51-.36-.58-.23-.05-.47-.08-.7-.12l-2.96-.5c-.78-.12-1.56-.25-2.34-.37-.22-.03-.38.06-.44.28a2.45 2.45 0 00-.06.54v7.12c0 .46-.06.91-.27 1.32-.31.6-.79.97-1.44 1.13-.37.1-.74.15-1.12.16-.94.02-1.77-.58-1.98-1.52-.17-.76.05-1.46.68-1.92.39-.28.84-.4 1.31-.43.38-.02.76-.06 1.13-.13.3-.06.55-.18.72-.45.1-.17.14-.35.14-.55V6.32c0-.24.04-.48.14-.7.16-.36.46-.55.83-.6.39-.06.78-.1 1.17-.16l3.51-.58 2.56-.42c.34-.05.68-.12 1.02-.15.27-.02.46.14.51.42.02.1.03.22.03.33v5.48z" />
        </svg>
      );
    case "tidal":
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996l4.004 4.004L8.008 8l4.004 4-4.004 4.004L12.012 20l4.004-4.004L20.02 20l4.004-4.004-4.004-4.004L24.024 7.988l-4.004-4.004L16.016 8z" />
        </svg>
      );
    case "amazonMusic":
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FF9900">
          <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.659.659 0 01-.75.077c-1.054-.875-1.242-1.28-1.822-2.113-1.742 1.777-2.976 2.308-5.236 2.308-2.672 0-4.752-1.649-4.752-4.949 0-2.577 1.397-4.332 3.387-5.188 1.725-.756 4.135-.891 5.977-1.1v-.41c0-.753.058-1.643-.385-2.294-.382-.578-1.117-.817-1.766-.817-1.199 0-2.266.615-2.528 1.89-.053.285-.261.566-.548.58l-3.061-.33c-.258-.057-.543-.266-.47-.66C6.057 1.926 9.311 1 12.152 1c1.435 0 3.31.382 4.441 1.469 1.435 1.342 1.298 3.132 1.298 5.078v4.599c0 1.382.573 1.988 1.113 2.736.188.263.229.58-.012.776-.602.501-1.676 1.434-2.267 1.955l-.018-.002z" />
        </svg>
      );
    case "youtubeMusic":
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FF0000">
          <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" />
        </svg>
      );
    case "soundcloud":
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FF5500">
          <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.052-.1-.084-.1zm-.899.828c-.06 0-.091.037-.104.094L0 14.479l.165 1.308c.014.057.045.094.107.094s.092-.037.105-.094l.199-1.308-.2-1.332c-.012-.057-.045-.094-.1-.094zm1.83-1.229c-.061 0-.12.045-.12.104l-.21 2.563.225 2.458c0 .06.045.104.106.104.061 0 .12-.044.12-.104l.24-2.458-.24-2.563c0-.06-.06-.104-.12-.104zm.945-.089c-.075 0-.135.06-.15.135l-.193 2.64.21 2.544c.016.077.075.138.149.138.075 0 .135-.061.15-.138l.225-2.544-.225-2.64c-.016-.075-.075-.135-.165-.135zm.93-.132c-.09 0-.149.075-.165.165l-.195 2.775.195 2.52c.015.09.075.164.165.164.089 0 .149-.074.164-.164l.225-2.52-.225-2.775c-.015-.09-.074-.165-.164-.165zm.96-.015c-.104 0-.179.09-.195.195l-.164 2.79.18 2.49c.016.104.09.179.194.179.104 0 .179-.074.195-.179l.194-2.49-.21-2.79c-.015-.104-.074-.195-.194-.195zm.976-.09c-.119 0-.209.09-.225.209l-.165 2.88.165 2.505c.015.119.105.21.225.21.119 0 .21-.091.225-.21l.18-2.505-.196-2.88c-.015-.12-.09-.21-.209-.21zm1.02-.12c-.135 0-.24.105-.255.24l-.149 2.999.149 2.474c.016.135.12.24.255.24.135 0 .24-.105.254-.24l.166-2.474-.182-2.999c-.015-.135-.119-.24-.238-.24zm4.155 1.545c-.24 0-.464.045-.674.135-.18-2.085-1.935-3.72-4.095-3.72-.555 0-1.094.12-1.574.315-.18.074-.24.149-.24.314v7.545c0 .165.119.314.299.329h6.284c1.32 0 2.385-1.065 2.385-2.385 0-1.32-1.065-2.533-2.385-2.533z" />
        </svg>
      );
    case "pandora":
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#224099">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.996 12.038c0 2.088-1.404 3.792-4.188 3.792H9.6v3.57H6.708V4.6h5.1c2.784 0 4.188 1.704 4.188 3.792v3.646z" />
        </svg>
      );
    case "deezer":
      return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FEAA2D">
          <path d="M18.81 4.16v3.03H24V4.16h-5.19zM6.27 8.38v3.027h5.189V8.38h-5.19zm12.54 0v3.027H24V8.38h-5.19zM6.27 12.59v3.027h5.189V12.59h-5.19zm6.27 0v3.027h5.19V12.59h-5.19zm6.27 0v3.027H24V12.59h-5.19zM0 16.81v3.027h5.19V16.81H0zm6.27 0v3.027h5.189V16.81h-5.19zm6.27 0v3.027h5.19V16.81h-5.19zm6.27 0v3.027H24V16.81h-5.19z" />
        </svg>
      );
    default:
      return <Music className="w-4 h-4" />;
  }
}
