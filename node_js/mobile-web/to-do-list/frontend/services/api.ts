import axios from 'axios';
import { API_BASE_URL } from '../constants/apiConfig';
import { Task } from '../types/Task';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    return [];
  }
};

export const addTask = async (title: string): Promise<Task | undefined> => {
  try {
    const response = await api.post('/tasks', { title });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
  }
};
