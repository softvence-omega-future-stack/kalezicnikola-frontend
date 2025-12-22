import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CallState {
  unreviewedCount: number;
  totalCalls: number;
  lastUpdated: string | null;
}

const initialState: CallState = {
  unreviewedCount: 0,
  totalCalls: 0,
  lastUpdated: null,
};

const callSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    setTotalCalls: (state, action: PayloadAction<number>) => {
      state.totalCalls = action.payload;
    },
    
    setUnreviewedCount: (state, action: PayloadAction<number>) => {
      state.unreviewedCount = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    
    markCallAsReviewed: (state) => {
      if (state.unreviewedCount > 0) {
        state.unreviewedCount -= 1;
        state.lastUpdated = new Date().toISOString();
      }
    },
    
    resetUnreviewedCount: (state) => {
      state.unreviewedCount = state.totalCalls;
      state.lastUpdated = new Date().toISOString();
    },
    
    syncWithLocalStorage: (state, action: PayloadAction<number>) => {
      state.totalCalls = action.payload;
      // Calculate unreviewed based on localStorage
      const reviewedCount = 0; // We'll calculate this in component
      state.unreviewedCount = Math.max(0, action.payload - reviewedCount);
    }
  },
});

export const { 
  setTotalCalls,
  setUnreviewedCount, 
  markCallAsReviewed, 
  resetUnreviewedCount,
  syncWithLocalStorage
} = callSlice.actions;

export default callSlice.reducer;