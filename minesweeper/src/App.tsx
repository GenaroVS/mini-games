import React from 'react';
import Board from './features/board/Board';
import DashBoard from './features/dashboard/Dashboard';
import './styles/App.css';

const App = () => {
  return (
    <div id="App">
      <a href='/' className='back'>Back</a>
      <h1 className='game-title'>Minesweeper</h1>
      <DashBoard />
      <Board />
    </div>
  );
}

export default App;
