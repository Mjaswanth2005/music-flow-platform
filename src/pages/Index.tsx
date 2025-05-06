
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import AlbumCard from '../components/music/AlbumCard';
import PlaylistCard from '../components/music/PlaylistCard';
import ArtistCard from '../components/music/ArtistCard';
import SongCard from '../components/music/SongCard';

// Mock data for initial UI
const featuredPlaylists = [
  { id: '1', name: 'Discover Weekly', description: 'Your weekly mixtape of fresh music. Enjoy new discoveries and deep cuts chosen just for you.', coverUrl: 'https://via.placeholder.com/300/7D1D3F', songCount: 30 },
  { id: '2', name: 'Chill Vibes', description: 'The perfect playlist for relaxation and unwinding.', coverUrl: 'https://via.placeholder.com/300/1E555C', songCount: 25 },
  { id: '3', name: 'Workout Mix', description: 'High energy tracks to power your workout session.', coverUrl: 'https://via.placeholder.com/300/F15946', songCount: 40 },
  { id: '4', name: 'Focus Flow', description: 'Ambient sounds and minimal beats for maximum concentration.', coverUrl: 'https://via.placeholder.com/300/42858C', songCount: 35 },
];

const newReleases = [
  { id: '1', title: 'Future Nostalgia', artist: 'Dua Lipa', coverUrl: 'https://via.placeholder.com/300/E84855', year: '2023' },
  { id: '2', title: 'Dawn FM', artist: 'The Weeknd', coverUrl: 'https://via.placeholder.com/300/392F5A', year: '2023' },
  { id: '3', title: 'Harry\'s House', artist: 'Harry Styles', coverUrl: 'https://via.placeholder.com/300/4F0147', year: '2022' },
  { id: '4', title: 'Midnights', artist: 'Taylor Swift', coverUrl: 'https://via.placeholder.com/300/3C6997', year: '2022' },
  { id: '5', title: 'Renaissance', artist: 'Beyoncé', coverUrl: 'https://via.placeholder.com/300/007991', year: '2023' },
];

const topArtists = [
  { id: '1', name: 'Ed Sheeran', imageUrl: 'https://via.placeholder.com/300/631A86', genres: ['Pop', 'Folk'] },
  { id: '2', name: 'Billie Eilish', imageUrl: 'https://via.placeholder.com/300/BBE1C3', genres: ['Alternative', 'Pop'] },
  { id: '3', name: 'Drake', imageUrl: 'https://via.placeholder.com/300/B1740F', genres: ['Hip-Hop', 'R&B'] },
  { id: '4', name: 'Adele', imageUrl: 'https://via.placeholder.com/300/72A276', genres: ['Pop', 'Soul'] },
  { id: '5', name: 'BTS', imageUrl: 'https://via.placeholder.com/300/1E152A', genres: ['K-Pop', 'Pop'] },
];

const recentSongs = [
  { id: '1', title: 'As It Was', artist: 'Harry Styles', coverUrl: 'https://via.placeholder.com/50/4F0147', duration: '3:29' },
  { id: '2', title: 'Blinding Lights', artist: 'The Weeknd', coverUrl: 'https://via.placeholder.com/50/392F5A', duration: '3:20' },
  { id: '3', title: 'STAY', artist: 'The Kid LAROI, Justin Bieber', coverUrl: 'https://via.placeholder.com/50/7D1D3F', duration: '2:21' },
  { id: '4', title: 'Heat Waves', artist: 'Glass Animals', coverUrl: 'https://via.placeholder.com/50/1E555C', duration: '3:59' },
  { id: '5', title: 'Easy On Me', artist: 'Adele', coverUrl: 'https://via.placeholder.com/50/72A276', duration: '3:45' },
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
