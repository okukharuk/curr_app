import React from 'react';
import Select from 'react-select';
import triangle from '../public/triangle.svg'

const Card = ({labelValue, selectedCurrency, setSelectedCurrency, setCurrencyChanged}) => {
    
    const options = [
        {value: 'uah', label: 'UAH'},
        {value: 'eur', label: 'EUR'},
        {value: 'usd', label: 'USD'},
    ]

    const handleSelect = (selectedOption) => {
        setCurrencyChanged(true);
        setSelectedCurrency({amount: selectedCurrency.amount, currency: selectedOption.label});
    }

    const handleInput = (event) => {
        if(isNaN(event.target.value) || event.target.value.length > 16 || event.target.value.indexOf(' ') >= 0) return
        setCurrencyChanged(true);
        setSelectedCurrency({amount: event.target.value, currency: selectedCurrency.currency});
    }

    const selectStyles = {
        control: (styles) => ({ ...styles, backgroundColor: "transparent", border: "0px", width: "max-content", fontWeight: "600"}),
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