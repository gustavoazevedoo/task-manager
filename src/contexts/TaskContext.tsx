import { ChangeEvent, createContext, FormEvent, ReactNode, useEffect, useState } from "react";
import { v4 } from 'uuid';
interface TaskProviderProps {
  children: ReactNode
}

interface Task {
  id: string;
  task: string;
  isComplete: boolean;
}

interface TaskContextProps {
  tasks: Task[];
  task: string;
  handleTaskTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCreateNewTask: (event: FormEvent) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

export const TaskContext = createContext({} as TaskContextProps);

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storageData = localStorage.getItem('tasks');

    if (storageData) {
      return JSON.parse(storageData)
    }

    return [];
  });

  const [task, setTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])

  function handleTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    if (task.trim() === "") return;

    const newTask = {
      id: v4(),
      task,
      isComplete: false,
    }

    setTasks((prevState) => [
      ...prevState,
      newTask,
    ])

    setTask('');
  }

  function deleteTask(id: string) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  function toggleTaskCompletion(id: string) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isComplete: !task.isComplete,
        }
      }

      return task;
    });

    setTasks(newTasks)
  }

  return (
    <TaskContext.Provider value={{ 
      tasks,
      task,
      handleTaskTextChange,
      handleCreateNewTask,
      deleteTask,
      toggleTaskCompletion
    }}>
      {children}
    </TaskContext.Provider>
  );
}