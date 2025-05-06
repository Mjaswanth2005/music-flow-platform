
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  return (
    <MainLayout>
      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold mb-6">Search</h1>
        
        <div className="relative mb-10">
          <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
          <Input 
            type="search" 
            placeholder="Search for songs, artists, or albums" 
            className="pl-10 py-6 bg-zinc-800 border-none focus:ring-spotify focus:ring-2 text-lg" 
          />
        </div>
        
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Browse Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Pop', 'Hip-Hop', 'Rock', 'Electronic', 'Latin', 'K-Pop', 'R&B', 'Country', 'Metal', 'Jazz', 'Classical', 'Indie'].map((genre) => (
              <Button 
                key={genre} 
                variant="outline" 
                className="h-24 bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-spotify hover:to-green-700 border-none text-lg font-bold"
              >
                {genre}
              </Button>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4">Trending Searches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {['Taylor Swift new album', 'Summer hits 2023', 'Workout playlist', 'BTS latest', 'Reggaeton party', 'Study music'].map((search) => (
              <Button 
                key={search} 
                variant="ghost" 
                className="justify-start py-6 text-left hover:bg-zinc-800"
              >
                <SearchIcon className="h-4 w-4 mr-2" />
                {search}
              </Button>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Search;
