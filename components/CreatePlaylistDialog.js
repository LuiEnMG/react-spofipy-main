import { useState } from 'react';
import { Dialog, Portal, TextInput, Button } from 'react-native-paper';

export default function CreatePlaylistDialog({ visible, onDismiss, onCreate }) {
  const [nombre, setNombre] = useState('');

  const handleCreate = () => {
    if (!nombre.trim()) return;
    onCreate(nombre.trim());
    setNombre('');
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Nueva Playlist</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Nombre de la playlist"
            mode="outlined"
            value={nombre}
            onChangeText={setNombre}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancelar</Button>
          <Button mode="contained" onPress={handleCreate} disabled={!nombre.trim()}>
            Crear
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}