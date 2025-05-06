
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume, Volume1, Volume2, Heart } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [position, setPosition] = useState([30]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const VolumeIcon = () => {
    if (volume[0] === 0) return <Volume className="h-4 w-4" />;
    if (volume[0] < 50) return <Volume1 className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-4 py-2">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center w-1/4">
          <img 
            src="https://via.placeholder.com/48" 
            alt="Album Cover" 
            className="h-12 w-12 rounded-md mr-3" 
          />
          <div>
            <p className="text-sm font-medium text-white">Song Title</p>
            <p className="text-xs text-zinc-400">Artist Name</p>
          </div>
          <button className="ml-4 text-zinc-400 hover:text-white transition">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        
        <div className="w-1/2 flex flex-col items-center">
          <div className="flex items-center mb-2 space-x-4">
            <button className="text-zinc-400 hover:text-white transition music-control">
              <SkipBack className="h-5 w-5" />
            </button>
            <button 
              onClick={togglePlay} 
              className="bg-white rounded-full p-1 text-black hover:scale-105 transition music-control"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </button>
            <button className="text-zinc-400 hover:text-white transition music-control">
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
          
          <div className="w-full flex items-center">
            <span className="text-xs text-zinc-400 mr-2">1:30</span>
            <Slider 
              value={position} 
              onValueChange={setPosition} 
              max={100} 
              step={1} 
              className="flex-1"
            />
            <span className="text-xs text-zinc-400 ml-2">3:45</span>
          </div>
        </div>
        
        <div className="w-1/4 flex justify-end items-center">
          <VolumeIcon />
          <Slider 
            value={volume} 
            onValueChange={setVolume} 
            max={100} 
            step={1} 
            className="w-24 ml-2"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
