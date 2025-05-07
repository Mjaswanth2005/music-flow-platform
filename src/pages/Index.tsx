import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import AlbumCard from '../components/music/AlbumCard';
import PlaylistCard from '../components/music/PlaylistCard';
import ArtistCard from '../components/music/ArtistCard';
import SongCard from '../components/music/SongCard';

// Mock data for initial UI
const featuredPlaylists = [
  { id: '1', name: 'Discover Weekly', description: 'Your weekly mixtape of fresh music. Enjoy new discoveries and deep cuts chosen just for you.', coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60', songCount: 30 },
  { id: '2', name: 'Chill Vibes', description: 'The perfect playlist for relaxation and unwinding.', coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60', songCount: 25 },
  { id: '3', name: 'Workout Mix', description: 'High energy tracks to power your workout session.', coverUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&auto=format&fit=crop&q=60', songCount: 40 },
  { id: '4', name: 'Focus Flow', description: 'Ambient sounds and minimal beats for maximum concentration.', coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60', songCount: 35 },
];

const newReleases = [
  { id: '1', title: 'Future Nostalgia', artist: 'Dua Lipa', coverUrl: 'https://images.unsplash.com/photo-1484876065684-b683cf17d276?w=500&auto=format&fit=crop&q=60', year: '2023' },
  { id: '2', title: 'Dawn FM', artist: 'The Weeknd', coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60', year: '2023' },
  { id: '3', title: 'Harry\'s House', artist: 'Harry Styles', coverUrl: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=500&auto=format&fit=crop&q=60', year: '2022' },
  { id: '4', title: 'Midnights', artist: 'Taylor Swift', coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2cb6?w=500&auto=format&fit=crop&q=60', year: '2022' },
  { id: '5', title: 'Renaissance', artist: 'Beyoncé', coverUrl: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=500&auto=format&fit=crop&q=60', year: '2023' },
];

const topArtists = [
  { id: '1', name: 'Ed Sheeran', imageUrl: 'https://images.unsplash.com/photo-1549213783-8284d0336c4f?w=500&auto=format&fit=crop&q=60', genres: ['Pop', 'Folk'] },
  { id: '2', name: 'Billie Eilish', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60', genres: ['Alternative', 'Pop'] },
  { id: '3', name: 'Drake', imageUrl: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=500&auto=format&fit=crop&q=60', genres: ['Hip-Hop', 'R&B'] },
  { id: '4', name: 'Adele', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60', genres: ['Pop', 'Soul'] },
  { id: '5', name: 'BTS', imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=60', genres: ['K-Pop', 'Pop'] },
];

const recentSongs = [
  { id: '1', title: 'As It Was', artist: 'Harry Styles', coverUrl: 'https://images.unsplash.com/photo-1598387181032-a3eb161ffa5f?w=80&auto=format&fit=crop&q=60', duration: '3:29' },
  { id: '2', title: 'Blinding Lights', artist: 'The Weeknd', coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&auto=format&fit=crop&q=60', duration: '3:20' },
  { id: '3', title: 'STAY', artist: 'The Kid LAROI, Justin Bieber', coverUrl: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=80&auto=format&fit=crop&q=60', duration: '2:21' },
  { id: '4', title: 'Heat Waves', artist: 'Glass Animals', coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=80&auto=format&fit=crop&q=60', duration: '3:59' },
  { id: '5', title: 'Easy On Me', artist: 'Adele', coverUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60', duration: '3:45' },
];

const Index = () => {
  return (
    <MainLayout>
      <div className="px-8 py-6">
        <section className="mb-10 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6">Featured Playlists</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} {...playlist} />
            ))}
          </div>
        </section>
        
        <section className="mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold mb-6">New Releases</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
            {newReleases.map((album) => (
              <AlbumCard key={album.id} {...album} />
            ))}
          </div>
        </section>
        
        <section className="mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-6">Popular Artists</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
            {topArtists.map((artist) => (
              <ArtistCard key={artist.id} {...artist} />
            ))}
          </div>
        </section>
        
        <section className="mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-2xl font-bold mb-6">Recently Played</h2>
          <div className="bg-zinc-900/50 rounded-lg p-4">
            {recentSongs.map((song) => (
              <SongCard key={song.id} {...song} />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
