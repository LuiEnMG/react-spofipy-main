import { createContext, useCallback, useContext, useState } from 'react';

const PlaylistContext = createContext(null);

export function PlaylistProvider({ children }) {
  const [playlists, setPlaylists] = useState([]);

  const crearPlaylist = useCallback((nombre) => {
    const nueva = {
      id: Date.now().toString(),
      nombre,
      canciones: [],
    };
    setPlaylists((actuales) => [...actuales, nueva]);
    return nueva.id;
  }, []);

  const agregarCancion = useCallback((playlistId, cancion) => {
    setPlaylists((actuales) =>
      actuales.map((playlist) => {
        if (playlist.id !== playlistId) return playlist;
        if (playlist.canciones.some((c) => c.id === cancion.id)) return playlist;
        return { ...playlist, canciones: [...playlist.canciones, cancion] };
      })
    );
  }, []);

  const eliminarCancion = useCallback((playlistId, cancionId) => {
    setPlaylists((actuales) =>
      actuales.map((playlist) => {
        if (playlist.id !== playlistId) return playlist;
        return {
          ...playlist,
          canciones: playlist.canciones.filter((c) => c.id !== cancionId),
        };
      })
    );
  }, []);

  const eliminarPlaylist = useCallback((playlistId) => {
    setPlaylists((actuales) => actuales.filter((playlist) => playlist.id !== playlistId));
  }, []);

  const value = {
    playlists,
    crearPlaylist,
    agregarCancion,
    eliminarCancion,
    eliminarPlaylist,
  };

  return <PlaylistContext.Provider value={value}>{children}</PlaylistContext.Provider>;
}

export function usePlaylist() {
  const ctx = useContext(PlaylistContext);
  if (!ctx) throw new Error('usePlaylist debe usarse dentro de <PlaylistProvider>');
  return ctx;
}