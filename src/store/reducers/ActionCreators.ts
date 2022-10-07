import axios from "axios";
import { Tickers } from "../../models/Tickers";
import { AppDispatch } from "../store";
import { PairSlice } from "./PairSlice";
import { TickersSlice } from "./TickersSlice";

interface TickersResponse {
    base: string;
    disclaimer: string;
    license: string;
    rates: Tickers;
}

export const fetchTickers = (exchangePairs: string) => async (dispatch: AppDispatch) => {
    const baseCurrency = 'USD';
    try {
        dispatch(TickersSlice.actions.tickersFetching());
        const response = await axios.get<TickersResponse>('https://openexchangerates.org/api/latest.json?' +
            'app_id=ae84a6bdd3644cf6abf3d78d349a4a75' + 
            `&base=${baseCurrency}` + 
            `&symbols=${exchangePairs}` + 
            '&prettyprint=false&show_alternative=false');
        dispatch(TickersSlice.actions.tickersFetchingSuccess(response.data.rates));
    } catch (e) {
        dispatch(TickersSlice.actions.tickersFetchingError('Something went wrong, please reload the page'))
    }
}

export const setPairs = (exchangePairs: string[]) => async (dispatch: AppDispatch) => {
    dispatch(PairSlice.actions.setPairs(exchangePairs))
}