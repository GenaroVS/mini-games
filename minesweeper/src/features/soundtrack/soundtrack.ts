import { Howl } from 'howler';
import Theme_Intro from './audio/Minesweeper_Theme_Intro.mp3';
import Theme_Body from './audio/Minesweeper_Theme_Body.mp3';
import Win_Jingle from './audio/Minesweeper_Win_Jingle.mp3';
import Lose_Jingle from './audio/Minesweeper_Lose_Jingle.mp3';

export let intro = new Howl({
  src: [Theme_Intro],
  volume: 0.2,
  onplayerror: function() {
    intro.once('unlock', function() {
      intro.play();
    });
  }
});

export let main_theme = new Howl({
  src: [Theme_Body],
  volume: 0.2,
  loop: true,
  preload: true,
  onplayerror: function() {
    intro.once('unlock', function() {
      intro.play();
    });
  }
})

export let win_sound = new Howl({
    src: [Win_Jingle],
    volume: 0.2,
    onplayerror: function() {
      win_sound.once('unlock', function() {
          win_sound.play();
      });
    }
});

export let lose_sound = new Howl({
    src: [Lose_Jingle],
    volume: 0.2,
    onplayerror: function() {
      lose_sound.once('unlock', function() {
          lose_sound.play();
      });
    }
});

export const playTempSound = (temp: Howl, main: Howl): void => {
    main.fade(0.2, 0, 500);
    main.once('fade', () => {
        temp.play();
    })
    temp.once('end', () => {
        main.fade(0, 0.2, 1000);
    })
}
