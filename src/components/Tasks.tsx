import { useMemo } from 'react';

import { Task } from './Task';

import styles from './Tasks.module.css';

import clipboardEmpty from '../assets/clipboard-empty.png';

interface TasksProps {
  tasks: {
    id: number;
    task: string;
    isComplete: boolean;
  }[];
  onDeleteTask: (id: number) => void;
  onToggleTaskCompletion: (id: number) => void;
}

export function Tasks({ tasks, onDeleteTask, onToggleTaskCompletion }: TasksProps) {

  const completedTasks = useMemo(() => tasks.filter((task) => task.isComplete), [tasks]);

  return (
    <main>
      <header className={styles.tasksHeader}>
        <div className={styles.createdTasks}>
          <strong>Tarefas criadas</strong>
          <span>{tasks.length}</span>
        </div>
        <div className={styles.doneTasks}>
          <strong>Concluídas</strong>
          <span>
            {`${completedTasks.length} de ${tasks.length}`}
          </span>
        </div>
      </header>

      <div className={styles.taskList}>
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onDeleteTask={onDeleteTask}
            onToggleTaskCompletion={onToggleTaskCompletion}
          />
        ))}

      </div>

      {!tasks.length && (
        <div className={styles.emptyTasks}>
          <img src={clipboardEmpty} alt="Sem tasks criadas" />

          <p>
            <strong>Você ainda não tem tarefas cadastradas</strong>
            Crie tarefas e organize seus itens a fazer
          </p>
        </div>
      )}
    </main>
  );
}