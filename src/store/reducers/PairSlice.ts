import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PairsState {
    pairs: string[],
}

const initialState: PairsState = {
    pairs: [],
}

export const PairSlice = createSlice({
    name: 'pairs',
    initialState,
    reducers: {
        setPairs(state, action: PayloadAction<string[]>) {
            state.pairs = action.payload;
        }
    }
})

export default PairSlice.reducer