import React from "react";
import { FlatList, Text, Box, IconButton, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useEstadoGlobal } from "../hooks/EstadoGlobal";

interface TarefaItemProps {
  id: number;
  tarefa: string;
}

const TarefaItem: React.FC<TarefaItemProps> = ({ id, tarefa }) => {
  const { editarTarefa, excluirTarefa } = useEstadoGlobal();
  const [editando, setEditando] = React.useState(false);
  const [novoTitulo, setNovoTitulo] = React.useState(tarefa);

  const handleEditar = () => {
    if (editando) {
      editarTarefa(id, novoTitulo);
    }
    setEditando(!editando);
  };

  return (
    <Box flexDirection="row" justifyContent="space-between" alignItems="center" bg="gray.200" p={4} my={2} mx={2} borderRadius={8}>
      {editando ? (
        <Input flex={3} value={novoTitulo} onChangeText={setNovoTitulo} fontSize={18} />
      ) : (
        <Text flex={3} fontSize={18}>{tarefa}</Text>
      )}

      <IconButton
        icon={<Ionicons name={editando ? "checkmark" : "pencil"} size={14} color="#402291" />}
        onPress={handleEditar}
        style={{ borderRadius: 50, backgroundColor: 'gold', marginLeft: 4 }}
      />

      <IconButton
        icon={<Ionicons name="trash" size={14} color="#402291" />}
        onPress={() => excluirTarefa(id)}
        style={{ borderRadius: 50, backgroundColor: 'red', marginLeft: 4 }}
      />
    </Box>
  );
};

const ListaTarefas: React.FC = () => {
  const { tarefas } = useEstadoGlobal();

  return (
    <FlatList
      data={tarefas}
      renderItem={({ item }) => <TarefaItem id={item.id} tarefa={item.tarefa} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ width: '100%', backgroundColor: '#402291' }}
    />
  );
};

export default ListaTarefas;
