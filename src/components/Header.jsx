import React from 'react';
import Ticker from './Ticker';

const Header = ({currencyTickers}) => {
    const [tickers, setTickers] = React.useState([]);

    React.useEffect(() => {
        const handledTickers = [];
        for (const key in currencyTickers) {
            key == 'UAH' ?
                handledTickers.push(['USD', currencyTickers['UAH'].toFixed(2)])
                :
                handledTickers.push([key, (currencyTickers['UAH']/currencyTickers[key]).toFixed(2)])
        }
        setTickers(handledTickers);
    }, [currencyTickers])

    return (
        <div className='flex flex-row absolute justify-center h-1/10 w-full'>
            {
                tickers.map((ticker) => {
                    return <Ticker ticker={ticker} />
                })
            }     
        </div>
    );
};

export default Header;