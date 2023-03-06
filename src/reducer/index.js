import { combineReducers } from '@reduxjs/toolkit'
import counter from './counterSlice'

const reducer = combineReducers({
    counter,
})

export default reducer;
