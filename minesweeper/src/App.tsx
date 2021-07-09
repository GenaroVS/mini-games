import React from 'react';
import Board from './features/board/Board';
import DashBoard from './features/dashboard/Dashboard';
import LeaderBoard from './features/leaders/LeaderBoard';
import './styles/App.css';

const App = () => {

  return (
    <div id="App">
      <a href='/' className='back'>Back</a>
      <h1 className='game-title'>Minesweeper</h1>
      <LeaderBoard />
      <DashBoard />
      <Board />
    </div>
  );
}

export default App;

// FOR PLAYING MUSIC BASED ON TAB VISIBILITY
// https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API