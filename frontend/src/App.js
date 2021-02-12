import './App.css';

import Header from './components/Header'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <>
      <Header/>
      <main>
        <Sidebar />
        <div className="taskSection"></div>
      </main>
    </>
  );
}

export default App;
