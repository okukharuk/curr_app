import React from 'react';

interface TickerProps {
    ticker: string[],
}

const Ticker: React.FC<TickerProps> = ({ticker}) => {
    return (
        <div className='flex flex-col justify-center border-gray-300 border-b-2 ml-8 last:mr-8'>
            <div>
                UAH/{ticker[0]}
            </div>
            <div>
                {ticker[1]}
            </div>
        </div>
    );
};

export default Ticker;