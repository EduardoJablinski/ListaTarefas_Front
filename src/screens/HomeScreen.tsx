import React from 'react';
import { View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { ProvedorEstadoGlobal } from '../hooks/EstadoGlobal';
import AdicionarTarefa from '../components/AdicionarTarefa';
import ListaTarefas from '../components/ListaTarefas';

// Definimos aqui o tipo para a propriedade navigation
type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleLogout = () => {
    // Ao clicar no botão de logout, navegamos para a tela de login para que o usuário possa fazer login novamente
    navigation.navigate('Login');
  };

  return (
   <NativeBaseProvider>
   <ProvedorEstadoGlobal>
     <View style={{ flex: 1 }}>
       {/* Componente para adicionar tarefas */}
       <AdicionarTarefa />
       {/* Componente que lista as tarefas */}
       <ListaTarefas />
     </View>
   </ProvedorEstadoGlobal>
 </NativeBaseProvider>
  );
};

export default HomeScreen;