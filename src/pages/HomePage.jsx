import React from 'react';
import Convertor from '../components/Convertor';
import Header from '../components/Header';

const HomePage = () => {
    const [currencyTickers, setCurrencyTickers] = React.useState({
        'EUR': 0,
        'UAH': 0,
    })

    const [tickersFetched, setTickersFetched] = React.useState(false);

    React.useEffect(() => {
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch('https://openexchangerates.org/api/latest.json?app_id=ae84a6bdd3644cf6abf3d78d349a4a75&base=USD&symbols=UAH,EUR&prettyprint=false&show_alternative=false', options)
            .then(response => response.json())
            .then(response => setCurrencyTickers(response.rates), setTickersFetched(true))
            .catch(err => console.error(err));
    }, [])

    return (
        <div className='w-screen h-screen'>
            <Header 
                currencyTickers={currencyTickers} 
                tickersFetched={tickersFetched}
            />
            <Convertor 
                currencyTickers={currencyTickers}
                tickersFetched={tickersFetched}
            />
        </div>
    );
};

export default HomePage;