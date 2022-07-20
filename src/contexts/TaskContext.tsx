import { ChangeEvent, createContext, FormEvent, ReactNode, useEffect, useState } from "react";

interface TaskProviderProps {
  children: ReactNode
}

interface Task {
  id: number;
  task: string;
  isComplete: boolean;
}

interface TaskContextProps {
  tasks: Task[];
  task: string;
  handleTaskTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCreateNewTask: (event: FormEvent) => void;
  deleteTask: (id: number) => void;
  toggleTaskCompletion: (id: number) => void;
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

    const newTask = {
      id: Math.random(),
      task,
      isComplete: false,
    }

    setTasks((prevState) => [
      ...prevState,
      newTask,
    ])

    setTask('');
  }

  function deleteTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  function toggleTaskCompletion(id: number) {
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