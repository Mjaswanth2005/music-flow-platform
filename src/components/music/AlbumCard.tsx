
import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

interface AlbumCardProps {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  year: string;
}

const AlbumCard = ({ id, title, artist, coverUrl, year }: AlbumCardProps) => {
  return (
    <div className="group">
      <Link to={`/albums/${id}`}>
        <div className="relative overflow-hidden rounded-md aspect-square mb-2">
          <img 
            src={coverUrl || 'https://via.placeholder.com/200'} 
            alt={`${title} by ${artist}`}
            className="w-full h-full object-cover cover-art"
          />
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-spotify rounded-full p-2 shadow-md hover:scale-105 transition">
              <Play className="h-5 w-5 text-black" fill="black" />
            </button>
          </div>
        </div>
        <h3 className="text-sm font-medium truncate">{title}</h3>
        <p className="text-xs text-zinc-400 truncate">{year} • {artist}</p>
      </Link>
    </div>
  );
};

export default AlbumCard;
