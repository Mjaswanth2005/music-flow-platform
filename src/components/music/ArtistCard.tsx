
import React from 'react';
import { Link } from 'react-router-dom';

interface ArtistCardProps {
  id: string;
  name: string;
  imageUrl: string;
  genres?: string[];
}

const ArtistCard = ({ id, name, imageUrl, genres = [] }: ArtistCardProps) => {
  return (
    <Link to={`/artists/${id}`} className="group text-center">
      <div className="relative mb-4">
        <img 
          src={imageUrl || 'https://via.placeholder.com/200'} 
          alt={name}
          className="w-full aspect-square object-cover rounded-full cover-art mx-auto"
        />
      </div>
      <h3 className="font-bold text-white mb-1">{name}</h3>
      {genres.length > 0 && (
        <p className="text-xs text-zinc-400">
          {genres.slice(0, 2).join(' • ')}
        </p>
      )}
    </Link>
  );
};

export default ArtistCard;
