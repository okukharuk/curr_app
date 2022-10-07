import React from 'react';

interface TickerProps {
    ticker: string[],
}

const Ticker: React.FC<TickerProps> = ({ticker}) => {
    return (
        <div className='flex flex-col justify-center min-w-[10%] border-gray-300 border-b-2 mr-4'>
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