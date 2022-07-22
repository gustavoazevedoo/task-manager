import { useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { Trash } from 'phosphor-react';

import styles from './Task.module.css';

interface TaskProps {
  task: {
    id: string;
    task: string;
    isComplete: boolean;
  }
}

export function Task({ task }: TaskProps) {
  const { toggleTaskCompletion, deleteTask } = useContext(TaskContext);

  function handleToggleTaskCompletion() {
    toggleTaskCompletion(task.id);
  }

  function handleDeleteTask() {
    deleteTask(task.id);
  }

  return (
    <div className={styles.task}>
      <input 
        type="checkbox"
        checked={task.isComplete}
        onChange={handleToggleTaskCompletion}
      />
      { task.isComplete && <s>{task.task}</s> }
      { !task.isComplete && <p>{task.task}</p> }
      <button 
        title='Deletar task'
        onClick={handleDeleteTask}
      >
        <Trash size={'1.5rem'} />
      </button>
    </div>
  );
}