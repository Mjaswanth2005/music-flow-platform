
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Heart, Music, Disc, PlayCircle, Star, Settings, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account"
    });
    navigate('/');
  };
  
  const userStats = [
    { name: "Favorites", value: "48", icon: Heart, color: "text-red-400" },
    { name: "Playlists", value: "12", icon: Music, color: "text-blue-400" },
    { name: "Songs Played", value: "256", icon: PlayCircle, color: "text-green-400" },
    { name: "Albums Saved", value: "34", icon: Disc, color: "text-purple-400" },
  ];
  
  return (
    <MainLayout>
      <div className="px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-1/3">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="bg-zinc-700 rounded-full w-24 h-24 flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-zinc-300" />
                </div>
                <h2 className="text-2xl font-bold">{user?.username || 'User'}</h2>
                <p className="text-zinc-400 mb-4">Member since May 2023</p>
                
                <div className="flex gap-2 mb-6">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Settings className="h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1 text-red-400" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                  {userStats.map((stat) => (
                    <div key={stat.name} className="bg-zinc-900/70 rounded-lg p-4 flex flex-col items-center">
                      <stat.icon className={`h-6 w-6 ${stat.color} mb-1`} />
                      <span className="text-lg font-bold">{stat.value}</span>
                      <span className="text-xs text-zinc-400">{stat.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="w-full md:w-2/3">
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-green-500 pl-4 py-1">
                    <div className="flex items-center gap-2">
                      <PlayCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-zinc-300">Listened to <strong>Blinding Lights</strong></span>
                    </div>
                    <p className="text-xs text-zinc-500">2 hours ago</p>
                  </div>
                  
                  <div className="border-l-2 border-red-500 pl-4 py-1">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-zinc-300">Added <strong>SOUR</strong> to favorites</span>
                    </div>
                    <p className="text-xs text-zinc-500">Yesterday</p>
                  </div>
                  
                  <div className="border-l-2 border-blue-500 pl-4 py-1">
                    <div className="flex items-center gap-2">
                      <Music className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-zinc-300">Created playlist <strong>Summer Vibes</strong></span>
                    </div>
                    <p className="text-xs text-zinc-500">3 days ago</p>
                  </div>
                  
                  <div className="border-l-2 border-purple-500 pl-4 py-1">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-purple-500" />
                      <span className="text-sm text-zinc-300">Followed artist <strong>The Weeknd</strong></span>
                    </div>
                    <p className="text-xs text-zinc-500">1 week ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Top Artists</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1516450360452-9312f5463ebf?w=100" alt="Taylor Swift" className="object-cover" />
                        </div>
                        <span>Taylor Swift</span>
                      </div>
                      <span className="text-xs text-zinc-500">124 plays</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=100" alt="Drake" className="object-cover" />
                        </div>
                        <span>Drake</span>
                      </div>
                      <span className="text-xs text-zinc-500">87 plays</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100" alt="Billie Eilish" className="object-cover" />
                        </div>
                        <span>Billie Eilish</span>
                      </div>
                      <span className="text-xs text-zinc-500">65 plays</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Recently Played</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-zinc-700 flex items-center justify-center overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0?w=100" alt="Song" className="object-cover" />
                        </div>
                        <div>
                          <div>Blinding Lights</div>
                          <div className="text-xs text-zinc-500">The Weeknd</div>
                        </div>
                      </div>
                      <span className="text-xs text-zinc-500">2h ago</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-zinc-700 flex items-center justify-center overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100" alt="Song" className="object-cover" />
                        </div>
                        <div>
                          <div>Levitating</div>
                          <div className="text-xs text-zinc-500">Dua Lipa</div>
                        </div>
                      </div>
                      <span className="text-xs text-zinc-500">6h ago</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-zinc-700 flex items-center justify-center overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0?w=100" alt="Song" className="object-cover" />
                        </div>
                        <div>
                          <div>Stay</div>
                          <div className="text-xs text-zinc-500">Kid LAROI, Justin Bieber</div>
                        </div>
                      </div>
                      <span className="text-xs text-zinc-500">Yesterday</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
