
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Album, Headphones, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-spotify-dark border-r border-zinc-800 h-full flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Headphones className="h-8 w-8 text-spotify" />
          <span>MusicFlow</span>
        </h1>
      </div>
      
      <nav className="flex-1 px-3">
        <div className="space-y-1 py-2">
          <Link to="/" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-zinc-800 text-white hover:bg-zinc-700 transition">
            <Home className="mr-3 h-5 w-5" />
            Home
          </Link>
          <Link to="/search" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white transition">
            <Search className="mr-3 h-5 w-5" />
            Search
          </Link>
          <Link to="/artists" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white transition">
            <User className="mr-3 h-5 w-5" />
            Artists
          </Link>
          <Link to="/albums" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white transition">
            <Album className="mr-3 h-5 w-5" />
            Albums
          </Link>
          <Link to="/favorites" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white transition">
            <Heart className="mr-3 h-5 w-5" />
            Favorites
          </Link>
        </div>
        
        <div className="pt-4 pb-2">
          <h3 className="px-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Your Playlists
          </h3>
        </div>
        <div className="space-y-1 py-2">
          {['Workout Mix', 'Road Trip', 'Study Music', 'Chill Vibes', 'Party Mix'].map((playlist) => (
            <Link 
              key={playlist}
              to={`/playlists/${playlist.toLowerCase().replace(/\s+/g, '-')}`}
              className="playlist-item flex items-center px-3 py-2 text-sm rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              {playlist}
            </Link>
          ))}
        </div>
        
        <div className="pt-6">
          <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
            Create Playlist
          </Button>
        </div>
      </nav>
      
      <div className="p-4 border-t border-zinc-800">
        <Button variant="ghost" className="w-full justify-start text-left hover:bg-zinc-800 text-zinc-300 hover:text-white">
          <User className="mr-2 h-5 w-5" />
          Sign In
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
