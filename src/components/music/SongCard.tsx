
import React from 'react';
import { Play, Pause } from 'lucide-react';

interface SongCardProps {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  duration: string;
  isPlaying?: boolean;
  onPlay?: () => void;
}

const SongCard = ({ 
  id, 
  title, 
  artist, 
  coverUrl, 
  duration,
  isPlaying = false,
  onPlay = () => {}
}: SongCardProps) => {
  return (
    <div className="group flex items-center p-2 rounded-md hover:bg-zinc-800 transition-colors">
      <div className="relative mr-3">
        <img 
          src={coverUrl || 'https://via.placeholder.com/50'} 
          alt={`${title} by ${artist}`}
          className="h-12 w-12 rounded object-cover"
        />
        <button 
          onClick={onPlay}
          className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 rounded transition-opacity"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 text-white" />
          ) : (
            <Play className="h-5 w-5 text-white" />
          )}
        </button>
      </div>
      <div className="flex-grow min-w-0">
        <p className="text-sm font-medium truncate">{title}</p>
        <p className="text-xs text-zinc-400 truncate">{artist}</p>
      </div>
      <div className="text-xs text-zinc-400 ml-2">
        {duration}
      </div>
    </div>
  );
};

export default SongCard;
