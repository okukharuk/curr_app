import React from 'react';
import Select, { ActionMeta } from 'react-select';
import { useAppSelector } from '../hooks/redux';
import triangle from '../public/triangle.svg'
import { Currency, SelectOption } from '../types/types';

export interface CardProps {
    labelValue: string
    selectedCurrency: Currency;
    setSelectedCurrency: (value: Currency) => void;
    setCurrencyChanged: (value: boolean) => void;
    setConvertChanged?: (value: boolean) => void;
}

const Card: React.FC<CardProps> = ({labelValue, selectedCurrency, setSelectedCurrency, setCurrencyChanged, setConvertChanged}) => {

    const currencyPairs = useAppSelector((state) => state.PairReducer.pairs);
    
    const options: SelectOption[] = currencyPairs.map((pair) => {
        return {value: pair.toLowerCase(), label: pair}
    })

    const handleSelect = (selectedOption: SelectOption | null, actionMeta: ActionMeta<SelectOption>) => {
        setConvertChanged 
        ? setConvertChanged(true)
        : setCurrencyChanged(true)
        selectedOption 
        ? setSelectedCurrency({amount: selectedCurrency.amount, currency: selectedOption.label})
        : setSelectedCurrency({amount: selectedCurrency.amount, currency: 'UAH'})
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(isNaN(Number(event.target.value)) || 
            event.target.value.length > 16 || 
            event.target.value.indexOf(' ') >= 0) return
        setCurrencyChanged(true);
        setSelectedCurrency({amount: Number(event.target.value), currency: selectedCurrency.currency});
    }

    const selectStyles = {
        control: (styles: any) => ({ ...styles, backgroundColor: "transparent", border: "0px", width: "max-content", fontWeight: "600"}),
        menuList: (styles: any) => ({ ...styles, 
            "::-webkit-scrollbar": {
                display: "none",
                msOverflowStyle: "none", /* IE and Edge */
                scrollbarWidth: "none", /* Firefox */
            }
        }),
    }

    return (
        <div className='flex flex-col lg:w-1/3 h-1/3 w-[90%]'>
            <div>{labelValue}</div>
            <div className='flex flex-row'>
                <input
                    value={selectedCurrency.amount}
                    type="text" 
                    placeholder='0.00' 
                    className='bg-transparent border-b-2 border-black w-full focus:outline-none'
                    onChange={handleInput}
                />
                <Select 
                    value={{value: selectedCurrency.currency.toLowerCase(), label: selectedCurrency.currency}}
                    styles={selectStyles}
                    options={options} 
                    defaultValue={options[0]} 
                    onChange={handleSelect} 
                    components={{ DropdownIndicator:() => <img src={triangle}/>, IndicatorSeparator:() => null }}
                />
            </div>
        </div>
    );
};

export default Card;