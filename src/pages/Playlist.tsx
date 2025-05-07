
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPlaylistById } from '@/services/api';
import MainLayout from '@/components/layout/MainLayout';
import SongCard from '@/components/music/SongCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Playlist = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  const { data: playlist, isLoading, error } = useQuery({
    queryKey: ['playlist', playlistId],
    queryFn: () => playlistId ? getPlaylistById(playlistId) : null,
    enabled: !!playlistId && isAuthenticated,
  });

  // Handle error with useEffect to prevent render loop
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load playlist data',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-full py-20">
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-zinc-400 text-center mb-6">
            Please log in to view and manage playlists.
          </p>
          <Button asChild className="bg-spotify hover:bg-green-600">
            <a href="/login">Sign In</a>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const PlaylistHeader = () => {
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
    
    return playlist ? (
      <div className="flex space-x-6 mb-8">
        <div className="w-48 h-48 bg-zinc-800 flex items-center justify-center rounded-md shadow-lg">
          <span className="text-6xl">🎵</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-zinc-400 mb-1">
            {playlist.is_public ? 'Public Playlist' : 'Private Playlist'}
          </p>
          <h1 className="text-4xl font-bold text-white mb-2">{playlist.name}</h1>
          <p className="text-zinc-300 mb-2">{playlist.description}</p>
          <p className="text-zinc-400 mb-6">
            Created on {new Date(playlist.creation_date).toLocaleDateString()} • 
            {playlist.songs?.length || 0} songs
          </p>
          <Button className="bg-spotify hover:bg-green-600">
            <Play className="h-5 w-5 mr-2" fill="white" />
            Play Playlist
          </Button>
        </div>
      </div>
    ) : null;
  };

  return (
    <MainLayout>
      <div className="px-8 py-6">
        <PlaylistHeader />
        
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-md" />
            ))}
          </div>
        ) : playlist?.songs?.length ? (
          <div className="mt-6">
            <div className="grid grid-cols-12 text-zinc-400 text-sm px-4 py-2 border-b border-zinc-800">
              <div className="col-span-1">#</div>
              <div className="col-span-9">Title</div>
              <div className="col-span-1">Date Added</div>
              <div className="col-span-1 text-right">Duration</div>
            </div>
            
            <div className="space-y-1 mt-2">
              {playlist.songs.map((song, index) => (
                <div key={song.id} className="grid grid-cols-12 items-center">
                  <div className="col-span-1 text-zinc-400 text-sm pl-4">
                    {index + 1}
                  </div>
                  <div className="col-span-9">
                    <SongCard 
                      id={song.id}
                      title={song.title}
                      artist={song.artist_name}
                      coverUrl={song.file_url}
                      duration={formatDuration(song.duration)}
                    />
                  </div>
                  <div className="col-span-1 text-zinc-400 text-xs">
                    {new Date(song.date_added).toLocaleDateString()}
                  </div>
                  <div className="col-span-1 text-zinc-400 text-sm text-right pr-4">
                    {formatDuration(song.duration)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-zinc-400 my-10">
            This playlist doesn't have any songs yet.
          </p>
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

export default Playlist;
