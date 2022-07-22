import { Header } from './components/Header';
import { Tasks } from './components/Tasks';

import './global.css';
import styles from './App.module.css';
import { TaskForm } from './components/TaskForm';

function App() {
  return (
    <>
      <Header />

      <div className={styles.container}>
        <TaskForm />

        <Tasks />
      </div>
    </>
  );
}

export default App
