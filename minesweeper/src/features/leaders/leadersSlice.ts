import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getTopPlayers, postEntry } from './leadersAPI'
import { RootState } from '../../app/store';

export type Rank = {
  name: string;
  score: number;
  date: string;
  level: string;
}

export type LeadersState = {
  [index: string]: Rank[];
  beginner: Rank[];
  intermediate: Rank[];
  expert: Rank[];
}

const initialState: LeadersState = {
  beginner: [],
  intermediate: [],
  expert: []
}

export const getAllPlayers = createAsyncThunk(
  'leaders/getAllPlayers',
  async (thunkAPI) => {
    let leaders: Rank[][] = []
    const responses = await Promise.all([
      getTopPlayers('beginner'),
      getTopPlayers('intermediate'),
      getTopPlayers('expert')
    ])

    responses.forEach(res => {
      leaders.push(res.data)
    })

    return leaders
  }
)

export const postTopEntry = createAsyncThunk(
  'leaders/postTopEntry',
  async (entry: Rank, thunkAPI) => {
    const response = await postEntry(entry);
    return response.data;
  }
)

export const dashSlice = createSlice({
  name: 'leaders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPlayers.fulfilled, (state: LeadersState, action: PayloadAction<Rank[][]>) => {
        action.payload.forEach(rankings => {
          let level = rankings[0].level
          state[level] = rankings
        })
      })
      .addCase(postTopEntry.fulfilled, (state: LeadersState, action: PayloadAction<Rank[]>) => {
        let level = action.payload[0].level
        state[level] = action.payload
      })
  }
});

export const leaders = (state: RootState) => state.leaders;
export const selectBeginners = (state: RootState) => state.leaders.beginner;
export const selectIntermediate = (state: RootState) => state.leaders.intermediate;
export const selectExpert = (state: RootState) => state.leaders.expert;


export default dashSlice.reducer;
