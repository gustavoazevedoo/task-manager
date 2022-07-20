import { Trash } from 'phosphor-react';
import styles from './Task.module.css';

interface TaskProps {
  task: {
    id: number;
    task: string;
    isComplete: boolean;
  }
  onDeleteTask: (id: number) => void;
  onToggleTaskCompletion: (id: number) => void;
}

export function Task({ task, onDeleteTask, onToggleTaskCompletion }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(task.id);
  }

  function handleToggleTaskCompletion() {
    onToggleTaskCompletion(task.id);
  }

  return (
    <div className={styles.task}>
      <input 
        type="checkbox"
        checked={task.isComplete}
        onChange={handleToggleTaskCompletion}
      />
      {/* <label className="c-checkbox__label"> */}
        { task.isComplete && <s>{task.task}</s> }
        { !task.isComplete && <p>{task.task}</p> }
      {/* </label> */}
      <button 
        title='Deletar task'
        onClick={handleDeleteTask}
      >
        <Trash />
      </button>
    </div>
  );
}