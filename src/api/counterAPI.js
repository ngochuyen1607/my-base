import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../utils/API';

export const incrementAsync = createAsyncThunk(
    // name action
    'counter/fetchCount',
    async (data, thunkAPI) => {
        // thunkAPI.dispatch(...): dispatch action, thunkAPI.getState(...): get state
        try {
            const response = await API.get({
                endpoint: '/test',
                body: {},
            })
            return response
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
);