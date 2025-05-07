
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getArtists } from '@/services/api';
import MainLayout from '@/components/layout/MainLayout';
import ArtistCard from '@/components/music/ArtistCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Artists = () => {
  const { toast } = useToast();
  const [retryCount, setRetryCount] = useState(0);
  
  const { data: artists, isLoading, error, refetch } = useQuery({
    queryKey: ['artists', retryCount],
    queryFn: getArtists,
    retry: 1,
    retryDelay: 1000
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

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

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
        ) : error ? (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-3">
              <p>Failed to load artists. Please check your connection and try again.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-fit" 
                onClick={handleRetry}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        ) : artists?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {artists.map((artist) => (
              <ArtistCard 
                key={artist.id}
                id={artist.id}
                name={artist.name}
                imageUrl={artist.profile_picture_url || `/public/lovable-uploads/01801b6c-697b-49e7-8845-a127e88259a2.png`}
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
