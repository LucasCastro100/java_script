import { useState, useEffect } from 'react';
import { getTasks, addTask } from '../services/api';

// Define a interface para uma task
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]); // << tipando o array

  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  const createTask = async (title: string) => {
    const newTask = await addTask(title);
    if (newTask) setTasks([...tasks, newTask]); // Agora sem erro
  };

  return { tasks, createTask };
}
