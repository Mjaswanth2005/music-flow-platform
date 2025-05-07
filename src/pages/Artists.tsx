
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getArtists } from '@/services/api';
import MainLayout from '@/components/layout/MainLayout';
import ArtistCard from '@/components/music/ArtistCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for when API is unavailable
const mockArtists = [
  { 
    id: '1', 
    name: 'Adele', 
    profile_picture_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60',
    genres: ['Pop', 'Soul'] 
  },
  { 
    id: '2', 
    name: 'Ed Sheeran', 
    profile_picture_url: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=500&auto=format&fit=crop&q=60',
    genres: ['Pop', 'Folk'] 
  },
  { 
    id: '3', 
    name: 'Taylor Swift', 
    profile_picture_url: 'https://images.unsplash.com/photo-1516450360452-9312f5463ebf?w=500&auto=format&fit=crop&q=60',
    genres: ['Pop', 'Country'] 
  },
  { 
    id: '4', 
    name: 'The Weeknd', 
    profile_picture_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=60',
    genres: ['R&B', 'Pop'] 
  },
  { 
    id: '5', 
    name: 'Dua Lipa', 
    profile_picture_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60',
    genres: ['Pop', 'Dance'] 
  },
];

const Artists = () => {
  const { toast } = useToast();
  const [retryCount, setRetryCount] = useState(0);
  const [useMockData, setUseMockData] = useState(false);
  
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

  const handleUseMockData = () => {
    setUseMockData(true);
    toast({
      title: 'Using Demo Mode',
      description: 'Switched to offline demo data',
    });
  };

  const displayedArtists = useMockData ? mockArtists : artists;

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
        ) : error && !useMockData ? (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-3">
              <p>Failed to load artists. Please check your connection and try again.</p>
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
        ) : displayedArtists?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {displayedArtists.map((artist) => (
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

export default Artists;
