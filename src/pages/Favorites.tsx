
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Heart, Play, User, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const mockFavoriteSongs = [
  { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20', album: 'After Hours' },
  { id: '2', title: 'Levitating', artist: 'Dua Lipa', duration: '3:23', album: 'Future Nostalgia' },
  { id: '3', title: 'Stay', artist: 'Kid LAROI & Justin Bieber', duration: '2:21', album: 'F*CK LOVE 3: OVER YOU' },
];

const mockFavoriteAlbums = [
  { id: '1', title: 'Thriller', artist: 'Michael Jackson', year: '1982', imageUrl: 'https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0?w=500&auto=format&fit=crop&q=60' },
  { id: '2', title: '21', artist: 'Adele', year: '2011', imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60' },
  { id: '3', title: 'SOUR', artist: 'Olivia Rodrigo', year: '2021', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60' },
];

const mockFavoriteArtists = [
  { id: '1', name: 'Taylor Swift', genre: 'Pop', imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5463ebf?w=500&auto=format&fit=crop&q=60' },
  { id: '2', name: 'Drake', genre: 'Hip-Hop', imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=60' },
  { id: '3', name: 'Beyoncé', genre: 'R&B', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60' },
];

const Favorites = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-full py-20">
          <Heart className="h-16 w-16 text-zinc-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-zinc-400 text-center mb-6">
            Please log in to view and manage your favorite songs, albums, and artists.
          </p>
          <Button asChild className="bg-spotify hover:bg-green-600">
            <a href="/login">Sign In</a>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Your Favorites</h1>
          <Link to="/profile">
            <Button variant="outline" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              View Profile
            </Button>
          </Link>
        </div>
        
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Favorite Songs</h2>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
              View All
            </Button>
          </div>
          
          <div className="bg-zinc-900/50 rounded-md p-4">
            {mockFavoriteSongs.length > 0 ? (
              <div className="grid gap-2">
                {mockFavoriteSongs.map((song) => (
                  <div key={song.id} className="flex items-center justify-between p-2 hover:bg-zinc-800 rounded-md group">
                    <div className="flex items-center gap-4">
                      <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100">
                        <Play className="h-4 w-4" />
                      </Button>
                      <div>
                        <p className="font-medium">{song.title}</p>
                        <p className="text-sm text-zinc-400">{song.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-zinc-400">{song.album}</span>
                      <span className="text-sm text-zinc-400">{song.duration}</span>
                      <Button size="icon" variant="ghost" className="text-red-500">
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-400 text-center py-4">No favorite songs yet.</p>
            )}
          </div>
        </div>
        
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Favorite Albums</h2>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mockFavoriteAlbums.length > 0 ? (
              mockFavoriteAlbums.map((album) => (
                <Card key={album.id} className="bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700/50 transition duration-200">
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="aspect-square w-full mb-3 overflow-hidden rounded-md">
                      <img 
                        src={album.imageUrl} 
                        alt={album.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-center line-clamp-1">{album.title}</h3>
                    <p className="text-sm text-zinc-400 text-center">{album.artist}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-zinc-400 col-span-full text-center py-4">No favorite albums yet.</p>
            )}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Favorite Artists</h2>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mockFavoriteArtists.length > 0 ? (
              mockFavoriteArtists.map((artist) => (
                <div key={artist.id} className="flex flex-col items-center">
                  <div className="mb-3 rounded-full overflow-hidden w-32 h-32">
                    <img 
                      src={artist.imageUrl} 
                      alt={artist.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-center">{artist.name}</h3>
                  <p className="text-sm text-zinc-400">{artist.genre}</p>
                </div>
              ))
            ) : (
              <p className="text-zinc-400 col-span-full text-center py-4">No favorite artists yet.</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Favorites;
