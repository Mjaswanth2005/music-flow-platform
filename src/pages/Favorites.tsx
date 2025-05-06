
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const Favorites = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-full py-20">
          <Heart className="h-16 w-16 text-zinc-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-zinc-400 text-center mb-6">
            Please log in to view and manage your favorite songs, albums, and artists.
          </p>
          <Button asChild className="bg-spotify hover:bg-green-600">
            <a href="/login">Sign In</a>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
        
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Favorite Songs</h2>
          <p className="text-zinc-400">Your favorite songs will appear here.</p>
        </div>
        
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Favorite Albums</h2>
          <p className="text-zinc-400">Your favorite albums will appear here.</p>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Favorite Artists</h2>
          <p className="text-zinc-400">Your favorite artists will appear here.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Favorites;
