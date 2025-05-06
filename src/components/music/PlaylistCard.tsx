
import React from 'react';
import { Link } from 'react-router-dom';

interface PlaylistCardProps {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  songCount: number;
}

const PlaylistCard = ({ id, name, description, coverUrl, songCount }: PlaylistCardProps) => {
  return (
    <Link to={`/playlists/${id}`} className="group">
      <div className="bg-zinc-800 hover:bg-zinc-700 transition-colors p-4 rounded-md h-full">
        <div className="relative mb-4">
          <img 
            src={coverUrl || 'https://via.placeholder.com/150'} 
            alt={name}
            className="w-full aspect-square object-cover rounded-md shadow-md cover-art"
          />
        </div>
        <h3 className="font-bold text-white mb-1 truncate">{name}</h3>
        <p className="text-sm text-zinc-400 line-clamp-2 mb-2">{description}</p>
        <p className="text-xs text-zinc-500">{songCount} songs</p>
      </div>
    </Link>
  );
};

export default PlaylistCard;
