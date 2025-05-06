
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getArtistById } from '@/services/api';
import MainLayout from '@/components/layout/MainLayout';
import AlbumCard from '@/components/music/AlbumCard';
import SongCard from '@/components/music/SongCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const Artist = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const { toast } = useToast();
  
  const { data: artist, isLoading, error } = useQuery({
    queryKey: ['artist', artistId],
    queryFn: () => artistId ? getArtistById(artistId) : null,
    enabled: !!artistId
  });

  if (error) {
    toast({
      title: 'Error',
      description: 'Failed to load artist data',
      variant: 'destructive',
    });
  }

  const ArtistHeader = () => {
    if (isLoading) {
      return (
        <div className="flex items-center space-x-6 mb-8">
          <Skeleton className="w-32 h-32 rounded-full" />
          <div>
            <Skeleton className="h-8 w-40 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      );
    }
    
    return artist ? (
      <div className="flex items-center space-x-6 mb-8">
        <img 
          src={artist.profile_picture_url || 'https://via.placeholder.com/200'} 
          alt={artist.name}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <h1 className="text-4xl font-bold text-white">{artist.name}</h1>
          <p className="text-zinc-400">{artist.country}</p>
        </div>
      </div>
    ) : null;
  };

  return (
    <MainLayout>
      <div className="px-8 py-6">
        <ArtistHeader />
        
        {artist && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Biography</h2>
            <p className="text-zinc-300">{artist.bio || 'No biography available.'}</p>
          </div>
        )}
        
        {isLoading ? (
          <div className="space-y-6">
            <div>
              <Skeleton className="h-8 w-32 mb-4" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="aspect-square w-full rounded-md" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : artist ? (
          <>
            {artist.albums?.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Albums</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {artist.albums.map((album) => (
                    <AlbumCard 
                      key={album.id}
                      id={album.id}
                      title={album.title}
                      artist={artist.name}
                      coverUrl={album.cover_art_url}
                      year={new Date(album.release_date).getFullYear().toString()}
                    />
                  ))}
                </div>
              </section>
            )}
            
            {artist.songs?.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Popular Songs</h2>
                <div className="space-y-1">
                  {artist.songs.map((song) => (
                    <SongCard 
                      key={song.id}
                      id={song.id}
                      title={song.title}
                      artist={artist.name}
                      coverUrl={song.cover_art_url || 'https://via.placeholder.com/50'}
                      duration={formatDuration(song.duration)}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : null}
      </div>
    </MainLayout>
  );
};

// Helper function to format duration in seconds to MM:SS
const formatDuration = (seconds: number) => {
  if (!seconds) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default Artist;
