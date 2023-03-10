import { createSlice } from '@reduxjs/toolkit';
import { incrementAsync } from '../api/counterAPI'

const initialState = {
    value: 0,
    status: 'idle',
    errors: '',
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: {
        [incrementAsync.pending]: state => {
            state.status = 'loading';
        },
        [incrementAsync.fulfilled]: (state, action) => {
            state.status = 'idle';
            state.value += action.payload;
        },
        [incrementAsync.rejected]: (state, action) => {
            state.status = 'error';
            state.errors = action.payload;
        }
    },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
