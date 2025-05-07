
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getArtists } from '@/services/api';
import MainLayout from '@/components/layout/MainLayout';
import ArtistCard from '@/components/music/ArtistCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const Artists = () => {
  const { toast } = useToast();
  
  const { data: artists, isLoading, error } = useQuery({
    queryKey: ['artists'],
    queryFn: getArtists
  });

  // Handle error with useEffect to prevent render loop
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load artists',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  return (
    <MainLayout>
      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold mb-6">Artists</h1>
        
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="h-40 w-40 rounded-full mb-4" />
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        ) : artists?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {artists.map((artist) => (
              <ArtistCard 
                key={artist.id}
                id={artist.id}
                name={artist.name}
                imageUrl={artist.profile_picture_url}
                genres={artist.genres}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-zinc-400 my-10">No artists found.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default Artists;
