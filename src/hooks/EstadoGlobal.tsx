import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Interface que define a estrutura de uma tarefa
interface Tarefa {
  id: number;
  tarefa: string;
}

// Interface que define o contexto global de estado
interface ContextoEstadoGlobal {
  tarefas: Tarefa[];
  adicionarTarefa: (tarefa: string) => void;
  editarTarefa: (id: number, novoTitulo: string) => void;
  excluirTarefa: (id: number) => void;
}

// Cria o contexto global de estado
const ContextoEstadoGlobal = createContext<ContextoEstadoGlobal>({
  tarefas: [],
  adicionarTarefa: () => { },
  editarTarefa: () => { },
  excluirTarefa: () => { },
});

// Hook para acessar o contexto global de estado
export const useEstadoGlobal = () => useContext(ContextoEstadoGlobal);

// Componente que fornece o contexto global de estado para seus filhos
export const ProvedorEstadoGlobal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Define o estado inicial das tarefas
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  // Função para carregar as tarefas do backend
  const carregarTarefas = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/tarefas', {
        headers: {
          'Authorization': `Bearer ${token}`,

        },
      });

      if (!response.ok) {
        throw new Error('Não foi possível carregar as tarefas');
      }

      const data = await response.json();
      setTarefas(data);
    } catch (error) {
      console.error('Erro ao carregar as tarefas:', error);
    }
  };

  // Função para adicionar uma nova tarefa
  const adicionarTarefa = async (tarefa: string) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/tarefas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ tarefa: tarefa }),
      });

      if (!response.ok) {
        throw new Error('Não foi possível adicionar a tarefa');
      }

      const data = await response.json();
      console.log('Nova tarefa adicionada:', data);

      // Atualiza o estado das tarefas com a nova tarefa
      setTarefas([...tarefas, data]);

    } catch (error) {
      console.error('Erro ao adicionar a tarefa:', error);
    }
  };

  // Função para editar o título de uma tarefa
  const editarTarefa = async (id: number, novoTitulo: string) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ tarefa: novoTitulo }),
      });

      if (!response.ok) {
        throw new Error('Não foi possível editar a tarefa');
      }

      console.log('Tarefa editada com sucesso');

      // Atualiza o estado das tarefas após a edição
      const novasTarefas = tarefas.map(tarefa =>
        tarefa.id === id ? { ...tarefa, tarefa: novoTitulo } : tarefa
      );
      setTarefas(novasTarefas);

    } catch (error) {
      console.error('Erro ao editar a tarefa:', error);
    }
  };

  // Função para excluir uma tarefa
  const excluirTarefa = async (id: number) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Não foi possível excluir a tarefa');
      }

      console.log('Tarefa excluída com sucesso');

      // Atualiza o estado das tarefas após a exclusão
      const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
      setTarefas(novasTarefas);

    } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
    }
  };

  // Carrega as tarefas do backend na inicialização
  useEffect(() => {
    carregarTarefas();
  }, []);

  // Retorna o contexto global de estado com as funções para manipular as tarefas
  return (
    <ContextoEstadoGlobal.Provider value={{ tarefas, adicionarTarefa, editarTarefa, excluirTarefa }}>
      {children}
    </ContextoEstadoGlobal.Provider>
  );
};