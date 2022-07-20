import { PlusCircle } from 'phosphor-react';

import { Header } from './components/Header';

import './global.css';

import styles from './App.module.css';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { Tasks } from './components/Tasks';

export interface TaskType {
  id: number;
  task: string;
  isComplete: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [task, setTask] = useState('');


  function handleTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    setTasks((prevState) => [
      ...prevState,
      {
        id: Math.random(),
        task,
        isComplete: false,
      }
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
    <>
      <Header />

      <div className={styles.container}>
        <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
          <input
            type="text"
            placeholder='Adicione uma nova tarefa'
            onChange={handleTaskTextChange}
            value={task}
          />
          <button type="submit">
            Criar
            <PlusCircle size={16} weight="bold" />
          </button>
        </form>

        <Tasks 
          tasks={tasks}
          onDeleteTask={deleteTask}
          onToggleTaskCompletion={toggleTaskCompletion}
        />
      </div>
    </>
  );
}

export default App
