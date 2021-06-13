import { PayloadAction } from '@reduxjs/toolkit';
import { DashState } from './dashSlice';

const dashReducers = {
  setDifficulty: (state: DashState, action: PayloadAction<string>) => {
    state.difficulty = action.payload;
    state.isPlaying = true;
    if (action.payload === 'intermediate') {
      state.width = 15;
      state.height = 13;
      state.flagTotal = 40;
    } else if (action.payload === 'beginner') {
      state.width = 11;
      state.height = 10;
      state.flagTotal = 10;
    } else if (action.payload === 'expert') {
      state.width = 31;
      state.height = 16;
      state.flagTotal = 99;
    }
  },

  tick: (state: DashState, action: PayloadAction<undefined>) => {
    state.clock += 1;
  },

  reset: (state: DashState, action: PayloadAction<undefined>) => {
    state.isPlaying = false;
    state.difficulty = 'intermediate';
    state.width = 0;
    state.height = 0;
    state.flagTotal = 0;
    state.clock = 0;
  },
}

export default dashReducers;