import React from 'react';
import Ticker from './Ticker';

interface HeaderProps {
    currencyTickers: Record<string, number>,
}

const Header: React.FC<HeaderProps> = ({currencyTickers}) => {
    const [tickers, setTickers] = React.useState<string[][]>([]);

    React.useEffect(() => {
        const handledTickers = [];
        for (const key in currencyTickers) {
            if(key === 'UAH') continue
            handledTickers.push([key, (currencyTickers['UAH']/currencyTickers[key]).toFixed(2)])
        }
        setTickers(handledTickers);
    }, [currencyTickers])

    return (
        <div className='flex flex-row absolute justify-center h-1/10 w-full overflow-y-scroll pl-10 no-scrollbar'>
            {
                tickers.map((ticker) => {
                    return <Ticker ticker={ticker} />
                })
            }     
        </div>
    );
};

export default Header;