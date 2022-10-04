import React, { useEffect } from 'react';
import Card from './Card';
import arrows from '../public/arrows.svg'

const Convertor = ({currencyTickers, tickersFetched}) => {
    const defaultCurrency = {amount: '', currency: 'UAH'};

    const [convertCurrency, setConvertCurrency] = React.useState(defaultCurrency);
    const [getCurrency, setGetCurrency] = React.useState(defaultCurrency);

    const [convertChanged, setConvertChanged] = React.useState(false);
    const [getChanged, setGetChanged] = React.useState(false);

    const calculateRates = (currency, currencyChanged, resCurrency, setResCurrency, setCurrencyChanged) => {
        const convertAmount = currency.amount;
        const convertedCurrency = resCurrency.currency;

        if (tickersFetched && currencyChanged) {
            if (currency.currency == resCurrency.currency) 
                setResCurrency({amount: convertAmount, currency: convertedCurrency});
            else if (currency.currency == 'USD') 
                setResCurrency({amount: convertAmount*currencyTickers[convertedCurrency], currency: convertedCurrency});
            else if (convertedCurrency == 'USD') 
                setResCurrency({amount: convertAmount/currencyTickers[currency.currency], currency: convertedCurrency});
            else 
                setResCurrency({amount: convertAmount*currencyTickers[convertedCurrency]/currencyTickers[currency.currency], currency: convertedCurrency});

            setCurrencyChanged(false);
        }
    }

    const handleChange = () => {
        const bufferCurrency = convertCurrency;
        setConvertCurrency(getCurrency);
        setGetCurrency(bufferCurrency);
    }

    const handleClick = () => {
        setConvertCurrency(defaultCurrency);
        setGetCurrency(defaultCurrency);
    }

    useEffect(() => {
        calculateRates(convertCurrency, convertChanged, getCurrency, setGetCurrency, setConvertChanged);
    }, [convertChanged])

    useEffect(() => {
        calculateRates(getCurrency, getChanged, convertCurrency, setConvertCurrency, setGetChanged);
    }, [getChanged])

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='flex justify-center items-center bg-gray-100 min-w-[66%] min-h-[50%] w-2/3 h-1/2 rounded-lg'>
                <div className='flex flex-col lg:flex-row justify-center items-center w-full h-full'>
                    <Card labelValue="Меняю" selectedCurrency={convertCurrency} setSelectedCurrency={setConvertCurrency} setCurrencyChanged={setConvertChanged}/>
                    <img src={arrows} className="mx-5 pb-5 w-[4%] min-w-[2rem] hover:cursor-pointer" onClick={handleChange}/>
                    <Card labelValue="Получаю" selectedCurrency={getCurrency} setSelectedCurrency={setGetCurrency} setCurrencyChanged={setGetChanged}/>
                </div>  
                <div className='absolute mt-60 lg:mt-48 hover:cursor-pointer font-semibold' onClick={handleClick}>
                    Сбросить
                </div>
            </div>
        </div>
    );
};

export default Convertor;