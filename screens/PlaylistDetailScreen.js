import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Icon, IconButton, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import SongListItem from '../components/SongListItem';
import AddSongsDialog from '../components/AddSongsDialog';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylist } from '../context/PlaylistContext';

export default function PlaylistDetailScreen({ playlistId, onBack }) {
  const theme = useTheme();
  const { reproducir } = usePlayer();
  const { obtenerPlaylist, agregarCancion, eliminarCancion } = usePlaylist();
  const [dialogVisible, setDialogVisible] = useState(false);

  const playlist = obtenerPlaylist(playlistId);

  if (!playlist) return null;

  return (
    <SafeAreaView edges={['top']} style={styles.pantalla}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" onPress={onBack} />
        <Text variant="titleLarge" style={styles.titulo}>{playlist.nombre}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={[styles.icono, { backgroundColor: theme.colors.primary }]}>
          <Icon source="playlist-music" size={32} color="#FFFFFF" />
        </View>
        <View style={styles.textos}>
          <Text variant="headlineSmall" style={styles.negrita}>{playlist.nombre}</Text>
          <Text variant="bodyMedium" style={styles.gris}>
            {playlist.canciones.length} {playlist.canciones.length === 1 ? 'canción' : 'canciones'}
          </Text>
        </View>
      </View>

      {playlist.canciones.length > 0 && (
        <Button mode="contained" icon="play" onPress={() => reproducir(playlist.canciones[0], playlist.canciones)}>
          Reproducir
        </Button>
      )}

      <Button mode="outlined" icon="plus" onPress={() => setDialogVisible(true)} style={styles.botonAgregar}>
        Agregar canciones
      </Button>

      <FlatList
        data={playlist.canciones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <SongListItem
              cancion={item}
              onPress={() => reproducir(item, playlist.canciones)}
            />
            <IconButton
              icon="trash-can-outline"
              iconColor={theme.colors.error}
              onPress={() => eliminarCancion(playlistId, item.id)}
            />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.vacio}>
            <Icon source="music-note-outline" size={56} color={theme.colors.onSurfaceVariant} />
            <Text variant="titleMedium" style={styles.vacioTitulo}>Aún no hay canciones</Text>
            <Text variant="bodyMedium" style={[styles.gris, styles.centrado]}>
              Toca el botón "Agregar canciones" para empezar.
            </Text>
          </View>
        }
      />

      <AddSongsDialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        onAdd={(canciones) => {
          canciones.forEach((c) => agregarCancion(playlistId, c));
          setDialogVisible(false);
        }}
        cancionesExistentes={playlist.canciones}
      />
    </SafeAreaView>
  );
}