import React, { useEffect } from 'react';
import Card from './Card';
import arrows from '../public/arrows.svg'
import { Currency } from '../types/types';
import { defaultCurrency } from '../consts/consts';

interface ConvertorProps {
    currencyTickers: Record<string, number>,
}

const Convertor: React.FC<ConvertorProps> = ({currencyTickers}) => {
    
    const [convertCurrency, setConvertCurrency] = React.useState(defaultCurrency);
    const [exchangeCurrency, setExchangeCurrency] = React.useState(defaultCurrency);

    const [convertChanged, setConvertChanged] = React.useState(false);
    const [exchangeChanged, setExchangeChanged] = React.useState(false);

    const changeCurrency = (exchange: Currency, convert: Currency) => {
        setExchangeCurrency(exchange);
        setConvertCurrency(convert);
    }

    const calculateRates = (
        currency: Currency, 
        currencyChanged: boolean, 
        resCurrency: Currency, 
        setResCurrency: (value: Currency) => void, 
        setCurrencyChanged: (value: boolean) => void
        ) => {
        const convertAmount = currency.amount;
        const convertedCurrency = resCurrency.currency;

        if (currencyChanged) {
            currency.currency === resCurrency.currency
            ?setResCurrency({
                amount: convertAmount, 
                currency: convertedCurrency
            })
            :setResCurrency({
                amount: convertAmount*currencyTickers[convertedCurrency]/currencyTickers[currency.currency], 
                currency: convertedCurrency
            });    
            setCurrencyChanged(false);
        }
    }

    const handleChange = () => {
        const bufferCurrency = convertCurrency;
        changeCurrency(bufferCurrency, exchangeCurrency);
    }

    const handleClick = () => {
        changeCurrency(defaultCurrency, defaultCurrency);
    }

    useEffect(() => {
        calculateRates(convertCurrency, convertChanged, exchangeCurrency, setExchangeCurrency, setConvertChanged);
    }, [convertChanged])

    useEffect(() => {
        calculateRates(exchangeCurrency, exchangeChanged, convertCurrency, setConvertCurrency, setExchangeChanged);
    }, [exchangeChanged])

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='flex justify-center items-center bg-gray-100 min-w-[66%] min-h-[50%] w-2/3 h-1/2 rounded-lg'>
                <div className='flex flex-col lg:flex-row justify-center items-center w-full h-full'>
                    <Card 
                        labelValue="Меняю" 
                        selectedCurrency={convertCurrency} 
                        setSelectedCurrency={setConvertCurrency} 
                        setCurrencyChanged={setConvertChanged}
                    />
                    <img 
                        alt='Swap currency' 
                        src={arrows} 
                        className="mx-5 pb-5 w-[4%] min-w-[2rem] hover:cursor-pointer" 
                        onClick={handleChange}
                    />
                    <Card 
                        labelValue="Получаю" 
                        selectedCurrency={exchangeCurrency} 
                        setSelectedCurrency={setExchangeCurrency} 
                        setCurrencyChanged={setExchangeChanged}
                        setConvertChanged={setConvertChanged}
                    />
                </div>  
                <div 
                    className='absolute mt-60 lg:mt-48 hover:cursor-pointer font-semibold' 
                    onClick={handleClick}
                >
                    Сбросить
                </div>
            </div>
        </div>
    );
};

export default Convertor;