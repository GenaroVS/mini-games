import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import leadersReducers from './reducers';

export type Rank = {
    name: string;
    score: number;
    date: string;
    level: string;
}

export type LeadersState = {
    beginner: Rank[],
    intermediate: Rank[],
    expert: Rank[]
}

const initialState: LeadersState = {
  beginner: [],
  intermediate: [],
  expert: []
}

export const dashSlice = createSlice({
  name: 'leaders',
  initialState,
  reducers: leadersReducers
});

export const { } = dashSlice.actions;

export const selectBeginners = (state: RootState) => state.leaders.beginner;
export const selectIntermediate = (state: RootState) => state.leaders.intermediate;
export const selectExpert = (state: RootState) => state.leaders.expert;


export default dashSlice.reducer;
