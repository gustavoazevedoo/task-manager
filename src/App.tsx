import { useContext } from 'react';
import { PlusCircle } from 'phosphor-react';

import { Header } from './components/Header';
import { Tasks } from './components/Tasks';

import { TaskContext } from './contexts/TaskContext';

import './global.css';
import styles from './App.module.css';

function App() {
  const { handleCreateNewTask, handleTaskTextChange, task } = useContext(TaskContext);

  const isTaskTextEmpty = task.trim() === '';
  
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
          <button type="submit" disabled={isTaskTextEmpty}>
            Criar
            <PlusCircle size={16} weight="bold" />
          </button>
        </form>

        <Tasks />
      </div>
    </>
  );
}

export default App
