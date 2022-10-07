import React from 'react';
import Convertor from '../components/Convertor';
import Header from '../components/Header';
import { exchangePairs } from '../consts/consts';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import LoadingIcon from '../public/LoadingIcon';
import { fetchTickers, setPairs } from '../store/reducers/ActionCreators';

const HomePage = () => {
    const {tickers, isLoading, error} = useAppSelector(state => state.TickersReducer)
    const dispatch = useAppDispatch();
    const currencyPairs = exchangePairs.slice(0, 5); 
    //                             ^ ^ ^ ^ ^ ^ ^
    // You can change number of used currencies by changing the slice params 
    // or you can set it manually like this: const currencyPairs = ['USD', 'EUR', 'UAH', ...] 
    // though for program to remain working it should contain 'UAH' and 'USD':)
    const currencyString = currencyPairs.join(',').toUpperCase();
    
    React.useEffect(() => {
        dispatch(setPairs(currencyPairs))
        dispatch(fetchTickers(currencyString))
    }, [])

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            {
            error !== '' ?
            <div className='text-3xl'>{error}</div>
            :
            isLoading ?
            <LoadingIcon />
            :
            <div className='w-screen h-screen'>
                <Header 
                    currencyTickers={tickers}
                />
                <Convertor 
                    currencyTickers={tickers}
                />
            </div>
            }
        </div>
    );
};

export default HomePage;