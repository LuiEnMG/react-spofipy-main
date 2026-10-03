import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { Button, Checkbox, Dialog, Portal, Searchbar, Text } from 'react-native-paper';
import data from '../data.json';

export default function AddSongsDialog({ visible, onDismiss, onAdd, cancionesExistentes }) {
  const [busqueda, setBusqueda] = useState('');
  const [seleccionadas, setSeleccionadas] = useState([]);

  const cancionesDisponibles = data.canciones.filter(
    (song) =>
      !cancionesExistentes.some((c) => c.id === song.id) &&
      (song.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
       song.artista.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const toggleCancion = (id) => {
    setSeleccionadas((actuales) =>
      actuales.includes(id) ? actuales.filter((c) => c.id !== id) : [...actuales, id]
    );
  };

  const handleAdd = () => {
    const canciones = data.canciones.filter((c) => seleccionadas.includes(c.id));
    onAdd(canciones);
    setSeleccionadas([]);
    setBusqueda('');
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={{ maxHeight: '80%' }}>
        <Dialog.Title>Agregar canciones</Dialog.Title>
        <Dialog.Content>
          <Searchbar
            placeholder="Buscar canción"
            value={busqueda}
            onChangeText={setBusqueda}
          />
          <FlatList
            data={cancionesDisponibles}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                  status={seleccionadas.includes(item.id) ? 'checked' : 'unchecked'}
                  onPress={() => toggleCancion(item.id)}
                />
                <Text>{item.titulo} - {item.artista}</Text>
              </View>
            )}
            ListEmptyComponent={<Text style={{ textAlign: 'center', marginVertical: 12 }}>No hay canciones disponibles</Text>}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancelar</Button>
          <Button onPress={handleAdd} mode="contained" disabled={seleccionadas.length === 0}>
            Agregar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}