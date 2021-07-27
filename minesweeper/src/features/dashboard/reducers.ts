import { PayloadAction } from '@reduxjs/toolkit';
import { DashState, HighScore, HIGHSCORECOUNT } from './dashSlice';
import { Rank } from'../leaders/leadersSlice'

interface highScorePayload extends HighScore {
  rankings: Rank[]
}

const dashReducers = {
  setLevel: (state: DashState, action: PayloadAction<string>) => {
    state.level = action.payload;
    state.isPlaying = true;
    if (action.payload === 'intermediate') {
      state.width = 15;
      state.height = 13;
      state.flagTotal = 40;
    } else if (action.payload === 'beginner') {
      state.width = 11;
      state.height = 9;
      state.flagTotal = 10;
    } else if (action.payload === 'expert') {
      state.width = 29;
      state.height = 17;
      state.flagTotal = 99;
    }
  },

  tick: (state: DashState) => {
    state.clock += 1;
  },

  reset: (state: DashState) => {
    state.isPlaying = false;
    state.width = 0;
    state.height = 0;
    state.flagTotal = 0;
    state.clock = 0;
    state.isHighScore = false;
    state.highScore = null;
  },

  setHighScore: (state: DashState, action: PayloadAction<highScorePayload>) => {
    let rankings = action.payload.rankings;
    let score = action.payload.score;

    if (rankings.length < HIGHSCORECOUNT || score < rankings[rankings.length - 1].score) {
      state.highScore = { score, level: action.payload.level }
      state.isHighScore = true;
    }
  }
}

export default dashReducers;