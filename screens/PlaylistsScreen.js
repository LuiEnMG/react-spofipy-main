import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Icon, IconButton, List, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePlaylist } from '../context/PlaylistContext';
import CreatePlaylistDialog from '../components/CreatePlaylistDialog';

export default function PlaylistsScreen() {
  const theme = useTheme();
  const { playlists, crearPlaylist, eliminarPlaylist } = usePlaylist();
  const [dialogVisible, setDialogVisible] = useState(false);

  return (
    <SafeAreaView edges={['top']} style={styles.pantalla}>
      <View style={styles.encabezado}>
        <Text variant="headlineSmall" style={styles.negrita}>Tus playlists</Text>
        <Button mode="contained" icon="plus" onPress={() => setDialogVisible(true)}>
          Nueva
        </Button>
      </View>

      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.nombre}
            description={`${item.canciones.length} ${item.canciones.length === 1 ? 'canción' : 'canciones'}`}
            onPress={() => console.log('abrir playlist', item.id)}
            left={() => (
              <View style={[styles.icono, { backgroundColor: theme.colors.primaryContainer }]}>
                <Icon source="playlist-music" size={24} color={theme.colors.primary} />
              </View>
            )}
            right={() => (
              <IconButton
                icon="trash-can-outline"
                iconColor={theme.colors.error}
                onPress={() => eliminarPlaylist(item.id)}
              />
            )}
          />
        )}
        ListEmptyComponent={
          <View style={styles.vacio}>
            <Icon source="playlist-music" size={56} color={theme.colors.onSurfaceVariant} />
            <Text variant="titleMedium" style={styles.vacioTitulo}>Aún no tienes playlists</Text>
            <Text variant="bodyMedium" style={[styles.gris, styles.centrado]}>
              Crea una nueva playlist y agrega tus canciones favoritas.
            </Text>
          </View>
        }
      />

      <CreatePlaylistDialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        onCreate={(nombre) => {
          crearPlaylist(nombre);
          setDialogVisible(false);
        }}
      />
    </SafeAreaView>
  );
}