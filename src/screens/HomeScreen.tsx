import React from 'react';
import { View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { ProvedorEstadoGlobal } from '../hooks/EstadoGlobal';
import AdicionarTarefa from '../components/AdicionarTarefa';
import ListaTarefas from '../components/ListaTarefas';

// definindo navegação
type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleLogout = () => {
    // implementação da navegação
    navigation.navigate('Login');
  };

  return (
   <NativeBaseProvider>
   <ProvedorEstadoGlobal>
     <View style={{ flex: 1 }}>
       {/* componente p adicionar tarefas */}
       <AdicionarTarefa />
       {/* componente q lista as tarefas */}
       <ListaTarefas />
     </View>
   </ProvedorEstadoGlobal>
 </NativeBaseProvider>
  );
};

export default HomeScreen;