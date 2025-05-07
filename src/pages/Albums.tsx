
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAlbums } from '@/services/api';
import MainLayout from '@/components/layout/MainLayout';
import AlbumCard from '@/components/music/AlbumCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for when API is unavailable
const mockAlbums = [
  {
    id: '1',
    title: '30',
    artist_name: 'Adele',
    cover_art_url: 'https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0?w=500&auto=format&fit=crop&q=60',
    release_date: '2021-11-19T00:00:00.000Z'
  },
  {
    id: '2',
    title: '÷ (Divide)',
    artist_name: 'Ed Sheeran',
    cover_art_url: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=500&auto=format&fit=crop&q=60',
    release_date: '2017-03-03T00:00:00.000Z'
  },
  {
    id: '3',
    title: '1989 (Taylor\'s Version)',
    artist_name: 'Taylor Swift',
    cover_art_url: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=500&auto=format&fit=crop&q=60',
    release_date: '2023-10-27T00:00:00.000Z'
  },
  {
    id: '4',
    title: 'Dawn FM',
    artist_name: 'The Weeknd',
    cover_art_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60',
    release_date: '2022-01-07T00:00:00.000Z'
  },
  {
    id: '5',
    title: 'Future Nostalgia',
    artist_name: 'Dua Lipa',
    cover_art_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60',
    release_date: '2020-03-27T00:00:00.000Z'
  },
];

const Albums = () => {
  const { toast } = useToast();
  const [retryCount, setRetryCount] = useState(0);
  const [useMockData, setUseMockData] = useState(false);
  
  const { data: albums, isLoading, error, refetch } = useQuery({
    queryKey: ['albums', retryCount],
    queryFn: getAlbums,
    retry: 1, 
    retryDelay: 1000
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

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const handleUseMockData = () => {
    setUseMockData(true);
    toast({
      title: 'Using Demo Mode',
      description: 'Switched to offline demo data',
    });
  };

  const displayedAlbums = useMockData ? mockAlbums : albums;

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
        ) : error && !useMockData ? (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-3">
              <p>Failed to load albums. Please check your connection and try again.</p>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-fit" 
                  onClick={handleRetry}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-fit" 
                  onClick={handleUseMockData}
                >
                  <WifiOff className="mr-2 h-4 w-4" />
                  Use Demo Data
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        ) : displayedAlbums?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {displayedAlbums.map((album) => (
              <AlbumCard 
                key={album.id}
                id={album.id}
                title={album.title}
                artist={album.artist_name}
                coverUrl={album.cover_art_url || `/public/lovable-uploads/01801b6c-697b-49e7-8845-a127e88259a2.png`}
                year={new Date(album.release_date).getFullYear().toString()}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-zinc-400 my-10">No albums found.</p>
        )}
        
        {useMockData && (
          <div className="mt-6 p-4 border border-yellow-600/20 rounded-md bg-yellow-600/10">
            <p className="text-yellow-400 text-sm flex items-center">
              <WifiOff className="h-4 w-4 mr-2" />
              Running in demo mode with sample data
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Albums;
