import React, { useRef, useState } from "react";
import { Headphones, Pause, Play, Volume2, VolumeX } from "lucide-react";
import type { MediaAsset } from "../types/cultural";

interface AudioPlayerProps {
  asset: MediaAsset;
  projectName: string;
  leader?: string | null;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  asset,
  projectName,
  leader,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(asset.durationSeconds ?? 0);
  const [isMuted, setIsMuted] = useState(false);

  if (asset.status !== "ready" || !asset.publicUrl) {
    return null;
  }

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
    } else {
      el.pause();
    }
  };

  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = audioRef.current;
    const nextTime = Number(e.target.value);
    setCurrentTime(nextTime);
    if (el) {
      el.currentTime = nextTime;
    }
  };

  return (
    <div className="rounded-xl bg-[#211820] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
      <audio
        ref={audioRef}
        src={asset.publicUrl}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />

      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={
              isPlaying
                ? `Pausar audio ${asset.title ?? projectName}`
                : `Escuchar audio ${asset.title ?? projectName}`
            }
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#742940] hover:bg-[#8c324e] text-[#F5F0E7] transition-colors cursor-pointer shrink-0"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Play className="w-5 h-5" aria-hidden="true" />
            )}
          </button>

          <div>
            <span className="font-mono-meta text-xs text-[#A8B69C] flex items-center gap-2">
              <Headphones className="w-4 h-4" aria-hidden="true" />
              <span>Voces del territorio · Audio</span>
            </span>
            <h4 className="font-display font-semibold text-lg text-[#F5F0E7] mt-1">
              {asset.title ?? projectName}
            </h4>
            {leader && (
              <p className="text-base text-[#D8CDC8] mt-1">
                Responsable: {leader}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Activar sonido" : "Silenciar audio"}
          className="p-2 rounded-lg bg-[#161317] text-[#D8CDC8] hover:text-[#F5F0E7] cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Volume2 className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <label htmlFor={`seek-${asset.id}`} className="sr-only">
          Progreso de reproducción de audio
        </label>
        <input
          id={`seek-${asset.id}`}
          type="range"
          min={0}
          max={duration > 0 ? duration : 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full accent-[#A8B69C] cursor-pointer"
        />
        <div className="flex items-center justify-between font-mono-meta text-xs text-[#D8CDC8]">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
