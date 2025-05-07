
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAlbumById } from '@/services/api';
import MainLayout from '@/components/layout/MainLayout';
import SongCard from '@/components/music/SongCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Album = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const { toast } = useToast();
  
  const { data: album, isLoading, error } = useQuery({
    queryKey: ['album', albumId],
    queryFn: () => albumId ? getAlbumById(albumId) : null,
    enabled: !!albumId
  });

  // Handle error with useEffect to prevent render loop
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load album data',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  const AlbumHeader = () => {
    if (isLoading) {
      return (
        <div className="flex space-x-6 mb-8">
          <Skeleton className="w-48 h-48 rounded-md" />
          <div className="flex-1">
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-8 w-64 mb-3" />
            <Skeleton className="h-4 w-40 mb-6" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      );
    }
    
    return album ? (
      <div className="flex space-x-6 mb-8">
        <img 
          src={album.cover_art_url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=60'} 
          alt={album.title}
          className="w-48 h-48 rounded-md object-cover shadow-lg"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-zinc-400 mb-1">Album</p>
          <h1 className="text-4xl font-bold text-white mb-2">{album.title}</h1>
          <p className="text-zinc-300 mb-6">
            By <span className="text-white">{album.artist_name}</span> • 
            {new Date(album.release_date).getFullYear()} • 
            {album.songs?.length || 0} songs
          </p>
          <Button className="bg-spotify hover:bg-green-600">
            <Play className="h-5 w-5 mr-2" fill="white" />
            Play Album
          </Button>
        </div>
      </div>
    ) : null;
  };

  return (
    <MainLayout>
      <div className="px-8 py-6">
        <AlbumHeader />
        
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-md" />
            ))}
          </div>
        ) : album?.songs?.length ? (
          <div className="mt-6">
            <div className="grid grid-cols-12 text-zinc-400 text-sm px-4 py-2 border-b border-zinc-800">
              <div className="col-span-1">#</div>
              <div className="col-span-10">Title</div>
              <div className="col-span-1 text-right">Duration</div>
            </div>
            
            <div className="space-y-1 mt-2">
              {album.songs.map((song, index) => (
                <div key={song.id} className="grid grid-cols-12 items-center">
                  <div className="col-span-1 text-zinc-400 text-sm pl-4">
                    {song.track_number || index + 1}
                  </div>
                  <div className="col-span-10">
                    <SongCard 
                      id={song.id}
                      title={song.title}
                      artist={album.artist_name}
                      coverUrl={album.cover_art_url || `https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=80&auto=format&fit=crop&q=60`}
                      duration={formatDuration(song.duration)}
                    />
                  </div>
                  <div className="col-span-1 text-zinc-400 text-sm text-right pr-4">
                    {formatDuration(song.duration)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-zinc-400 my-10">No songs available for this album.</p>
        )}
        
        {album?.description && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-2">About this album</h2>
            <p className="text-zinc-300">{album.description}</p>
          </div>
        )}
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

export default Album;
