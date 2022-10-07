import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Tickers } from "../../models/Tickers";

interface TickersState {
    tickers: Tickers,
    isLoading: boolean,
    error: string,
}

const initialState: TickersState = {
    tickers: {},
    isLoading: false,
    error: '',
}

export const TickersSlice = createSlice({
    name: 'tickers',
    initialState,
    reducers: {
        tickersFetching(state) {
            state.isLoading = true;
        },
        tickersFetchingSuccess(state, action: PayloadAction<Tickers>) {
            state.isLoading = false;
            state.error = '';
            state.tickers = action.payload;
        },
        tickersFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default TickersSlice.reducer