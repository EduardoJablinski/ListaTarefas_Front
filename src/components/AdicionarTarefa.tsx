import React, { useState } from "react";
import { View, Input, IconButton } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useEstadoGlobal } from "../hooks/EstadoGlobal";

const AdicionarTarefa: React.FC = () => {
  const [novaTarefa, setNovaTarefa] = useState("");
  const { adicionarTarefa } = useEstadoGlobal();

  const handleAdicionarTarefa = () => {
    if (novaTarefa.trim() !== "") {
      adicionarTarefa(novaTarefa);
      setNovaTarefa("");
    }
  };

  return (
    <View style={{ backgroundColor: '#525252', paddingVertical: 20, paddingHorizontal: 20, paddingTop: 50 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Input
            placeholder="insira uma task"
            placeholderTextColor="white"
            value={novaTarefa}
            onChangeText={setNovaTarefa}
            fontSize={18}
            color="white"
          />
        </View>
        <IconButton
          icon={<Ionicons name="add" size={24} color="#402291" />}
          onPress={handleAdicionarTarefa}
          style={{ borderRadius: 50, backgroundColor: 'gray' }}
        />
      </View>
    </View>
  );
};

export default AdicionarTarefa;
