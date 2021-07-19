import React from 'react';
import Board from './features/board/Board';
import DashBoard from './features/dashboard/Dashboard';
import LeaderBoard from './features/leaders/LeaderBoard';
import './styles/App.css';
import { intro, main_theme } from './features/soundtrack/soundtrack'


let currentSong = intro;
let hidden: string | null = null;
let visibilityChange: string | null = null;
if (typeof document.hidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
}

intro.play();
intro.once('end', function() {
  main_theme.play();
  currentSong = main_theme;
});

if (hidden && visibilityChange) {
  document.addEventListener(visibilityChange, () => {
    if (document.visibilityState === 'visible') {
      currentSong.play()
      currentSong.fade(0, 0.2, 1000);
    } else {
      if (currentSong.playing()) {
        currentSong.fade(0.2, 0, 1000);
        currentSong.once('fade', () => {
          currentSong.pause();
        })
      }
    }
  });
}

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