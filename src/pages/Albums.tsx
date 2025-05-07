
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAlbums } from '@/services/api';
import MainLayout from '@/components/layout/MainLayout';
import AlbumCard from '@/components/music/AlbumCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const Albums = () => {
  const { toast } = useToast();
  
  const { data: albums, isLoading, error } = useQuery({
    queryKey: ['albums'],
    queryFn: getAlbums
  });

  // Handle error with useEffect to prevent render loop
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load albums',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  return (
    <MainLayout>
      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold mb-6">Albums</h1>
        
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="aspect-square w-full rounded-md" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            ))}
          </div>
        ) : albums?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {albums.map((album) => (
              <AlbumCard 
                key={album.id}
                id={album.id}
                title={album.title}
                artist={album.artist_name}
                coverUrl={album.cover_art_url}
                year={new Date(album.release_date).getFullYear().toString()}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-zinc-400 my-10">No albums found.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default Albums;
