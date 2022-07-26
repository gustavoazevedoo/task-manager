import { useContext, useMemo, useState } from 'react';

import { Task } from './Task';

import { TaskContext } from '../contexts/TaskContext';

import styles from './Tasks.module.css';
import clipboardEmpty from '../assets/clipboard-empty.png';

export function Tasks() {
  
  const { tasks } = useContext(TaskContext);
  const [tasksToShow, setTasksToShow] = useState<CurrrentTasksKey>('allTasks')
  const completedTasks = useMemo(() => tasks.filter((task) => task.isComplete), [tasks]);
  const uncompletedTasks = useMemo(() => tasks.filter((task) => !task.isComplete), [tasks]);
  
  const tasksOptions = {
    allTasks: tasks,
    completedTasks,
    uncompletedTasks,
  }
  
  type CurrrentTasksKey = keyof typeof tasksOptions;
  
  const currentTasks = useMemo(() => tasksOptions[tasksToShow] || tasks, [tasksToShow, tasks]);

  function handleShowAllTasks() {
    setTasksToShow('allTasks')
  }

  function handleShowCompletedTasks() {
    setTasksToShow('completedTasks')
  }

  function handleShowUncompletedTasks() {
    setTasksToShow('uncompletedTasks')
  }

  return (
    <>
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

        {currentTasks.length > 0 && (
          <div className={styles.taskList}>
            {currentTasks.map(task => (
              <Task
                key={task.id}
                task={task}
              />
            ))}
          </div>
        )}

        {(!tasks.length && tasksToShow === 'allTasks') && (
          <div className={styles.emptyTasks}>
            <img src={clipboardEmpty} alt="Sem tarefas criadas" />

            <p>
              <strong>Você ainda não tem tarefas cadastradas</strong>
              Crie tarefas e organize seus itens a fazer
            </p>
          </div>
        )}

        {(!completedTasks.length && tasksToShow === 'completedTasks') &&  (
          <div className={styles.emptyTasks}>
            <img src={clipboardEmpty} alt="Sem tarefas completas" />

            <p>
              <strong>Você ainda não tem tarefas finalizadas</strong>
              marque uma tarefa como conccluída
            </p>
          </div>
        )}

        {(!uncompletedTasks.length && tasksToShow === 'uncompletedTasks') &&  (
          <div className={styles.emptyTasks}>
            <img src={clipboardEmpty} alt="Sem tarefas pendentes" />

            <p>
              <strong>Você ja completou todas as tarefas!</strong>
              Crie novas tarefas e continue organizando seus itens a fazer
            </p>
          </div>
        )}
      </main>

      {(tasks.length > 0) && (
        <footer>
          <div>
            <button 
              type='button' 
              onClick={handleShowAllTasks} 
              className={tasksToShow === 'allTasks' ? styles.selected : ''}
            >
              Todas
            </button>

            <button
              type='button'
              onClick={handleShowUncompletedTasks}
              className={tasksToShow === 'uncompletedTasks' ? styles.selected : ''}
            >
              Pendentes
            </button>

            <button
              type='button'
              onClick={handleShowCompletedTasks}
              className={tasksToShow === 'completedTasks' ? styles.selected : ''}
            >
              Concluídas
            </button>
          </div>
        </footer>
      )}
    </>
  );
}