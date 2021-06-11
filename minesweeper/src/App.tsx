import React from 'react';
import Board from './features/board/Board';
import DashBoard from './features/dashboard/dashboard';
import './styles/App.css';

const App = () => {
  return (
    <div id="App">
      <a href='/' className='back'>Back</a>
      <DashBoard />
      <Board />
    </div>
  );
}

export default App;
