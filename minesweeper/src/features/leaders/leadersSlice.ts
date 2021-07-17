import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getTopPlayers, postEntry } from './leadersAPI'
import { AxiosError } from 'axios';
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

const errorHandler = (err: AxiosError) => {
  if (err.response) {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
  } else if (err.request) {
    console.log(err.request);
  } else {
    console.log('Error: ', err.message);
  }
  console.log(err.config);
}

export const getAllPlayers = createAsyncThunk(
  'leaders/getAllPlayers',
  async (_, thunkAPI) => {
    let leaders: Rank[][] = []
    try {
      const responses = await Promise.all([
        getTopPlayers('beginner'),
        getTopPlayers('intermediate'),
        getTopPlayers('expert')
      ])

      responses.forEach(res => {
        leaders.push(res.data)
      })
    } catch(error) {
      errorHandler(error)
    }

    return leaders
  }
)

export const postTopEntry = createAsyncThunk(
  'leaders/postTopEntry',
  async (entry: Rank, thunkAPI) => {
    try {
      const response = await postEntry(entry);
      return response.data;
    } catch(error) {
      errorHandler(error)
    }
    return [];
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
          if (rankings.length > 0) {
            let level = rankings[0].level
            state[level] = rankings
          }
        })
      })
      .addCase(postTopEntry.fulfilled, (state: LeadersState, action: PayloadAction<Rank[]>) => {
        if (action.payload.length > 0) {
          let level = action.payload[0].level
          state[level] = action.payload
        }
      })
  }
});

export const selectLeaders = (state: RootState) => state.leaders;
export const selectBeginners = (state: RootState) => state.leaders.beginner;
export const selectIntermediate = (state: RootState) => state.leaders.intermediate;
export const selectExpert = (state: RootState) => state.leaders.expert;


export default dashSlice.reducer;
