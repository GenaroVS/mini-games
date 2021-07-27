import { createSlice, createSelector, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { reset } from '../dashboard/dashSlice';
import { getTopPlayers, postEntry } from './leadersAPI'
import { AxiosError } from 'axios';
import { RootState } from '../../app/store';

export type Rank = {
  name: string;
  score: number;
  date?: string;
  level: string;
}

export type LeadersState = {
  [index:string]: Rank[] | string;
  beginner: Rank[];
  intermediate: Rank[];
  expert: Rank[];
  apiStatus: 'pending' | 'success' | 'failed' | 'ready';
}


const initialState: LeadersState = {
  beginner: [],
  intermediate: [],
  expert: [],
  apiStatus: 'ready'
}

const errorHandler = (err: AxiosError) => {
  if (err.response) {
    return {
      data: err.response.data,
      status: err.response.status,
      headers: err.response.headers
    }
  } else if (err.request) {
    return err.request;
  }
  return 'Error: ' + err.message;
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
  async (entry: Rank, { rejectWithValue }) => {
    try {
      const response = await postEntry(entry);
      return response.data;
    } catch(err) {
      return rejectWithValue(errorHandler(err))
    }
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
      .addCase(postTopEntry.rejected, (state: LeadersState) => {
        state.apiStatus = 'failed';
      })
      .addCase(postTopEntry.pending, (state: LeadersState) => {
        state.apiStatus = 'pending';
      })
      .addCase(postTopEntry.fulfilled, (state: LeadersState, action: PayloadAction<Rank[]>) => {
        if (action.payload.length > 0) {
          let level = action.payload[0].level
          state[level] = action.payload
          state.apiStatus = 'success';
        }
      })
      .addCase(reset, (state: LeadersState) => {
        state.apiStatus = 'ready';
      })
  }
});

export const selectLeaders = (state: RootState) => state.leaders;
export const selectRankings = createSelector(
  (state: RootState) => state.leaders.beginner,
  (state: RootState) => state.leaders.intermediate,
  (state: RootState) => state.leaders.expert,
  (beginner, intermediate, expert) => {
    type rankings = {
      [index:string]: Rank[],
      beginner: Rank[],
      intermediate: Rank[],
      expert: Rank[],
    }
    return { beginner, intermediate, expert } as rankings;
  }
)


export default dashSlice.reducer;
