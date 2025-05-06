
const API_BASE_URL = 'http://localhost:5000/api';

export const getAuthHeader = () => {
  const token = localStorage.getItem('musicflow_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Artist APIs
export const getArtists = async () => {
  const response = await fetch(`${API_BASE_URL}/artists`);
  if (!response.ok) throw new Error('Failed to fetch artists');
  return await response.json();
};

export const getArtistById = async (artistId: string) => {
  const response = await fetch(`${API_BASE_URL}/artists/${artistId}`);
  if (!response.ok) throw new Error('Failed to fetch artist');
  return await response.json();
};

// Song APIs
export const getSongs = async () => {
  const response = await fetch(`${API_BASE_URL}/songs`);
  if (!response.ok) throw new Error('Failed to fetch songs');
  return await response.json();
};

export const getSongById = async (songId: string) => {
  const response = await fetch(`${API_BASE_URL}/songs/${songId}`);
  if (!response.ok) throw new Error('Failed to fetch song');
  return await response.json();
};

export const incrementPlayCount = async (songId: string) => {
  const response = await fetch(`${API_BASE_URL}/songs/${songId}/play`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    }
  });
  if (!response.ok) throw new Error('Failed to update play count');
  return await response.json();
};

// Album APIs
export const getAlbums = async () => {
  const response = await fetch(`${API_BASE_URL}/albums`);
  if (!response.ok) throw new Error('Failed to fetch albums');
  return await response.json();
};

export const getAlbumById = async (albumId: string) => {
  const response = await fetch(`${API_BASE_URL}/albums/${albumId}`);
  if (!response.ok) throw new Error('Failed to fetch album');
  return await response.json();
};

// Playlist APIs
export const getUserPlaylists = async () => {
  const response = await fetch(`${API_BASE_URL}/playlists`, {
    headers: getAuthHeader()
  });
  if (!response.ok) throw new Error('Failed to fetch playlists');
  return await response.json();
};

export const getPlaylistById = async (playlistId: string) => {
  const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}`, {
    headers: getAuthHeader()
  });
  if (!response.ok) throw new Error('Failed to fetch playlist');
  return await response.json();
};

export const createPlaylist = async (name: string, description: string, isPublic: boolean) => {
  const response = await fetch(`${API_BASE_URL}/playlists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify({ name, description, is_public: isPublic })
  });
  if (!response.ok) throw new Error('Failed to create playlist');
  return await response.json();
};

export const addSongToPlaylist = async (playlistId: string, songId: string) => {
  const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}/songs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify({ song_id: songId })
  });
  if (!response.ok) throw new Error('Failed to add song to playlist');
  return await response.json();
};
