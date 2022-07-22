import { useContext } from "react";
import { PlusCircle } from "phosphor-react";

import { TaskContext } from "../contexts/TaskContext";
import styles from './TaskForm.module.css';

export function TaskForm() {
  const { handleCreateNewTask, handleTaskTextChange, task } = useContext(TaskContext);
  const isTaskTextEmpty = task.trim() === '';

  return (
    <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
      <input
        type="text"
        placeholder='Adicione uma nova tarefa'
        onChange={handleTaskTextChange}
        value={task}
      />
      <button type="submit" disabled={isTaskTextEmpty}>
        <span>Criar</span>
        <PlusCircle size={18} weight="bold" />
      </button>
    </form>
  );
}