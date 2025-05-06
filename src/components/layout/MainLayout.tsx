
import React from 'react';
import Sidebar from './Sidebar';
import MusicPlayer from './MusicPlayer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto pb-24">
          {children}
        </main>
      </div>
      <MusicPlayer />
    </div>
  );
};

export default MainLayout;
