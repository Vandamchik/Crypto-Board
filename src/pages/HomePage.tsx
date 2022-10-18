import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchCrypto } from "../store/reducers/ActionCreator";
import { CoinBoard } from "../components/CoinBoard";
import { TitleBoard } from "../components/TitleBoard";
import "../styles/HomePage.css"


export function HomePage(): JSX.Element  {
    const dispatch = useAppDispatch()
    const { crypto, isLoading, error } = useAppSelector(state => state.cryptoReducer)
    const [search, setSearch] = useState<string>("")

    const filterCoins = crypto.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() => {
        dispatch(fetchCrypto())
    }, [])

    return (
        <>
            { error && <h1>{error}</h1> }
            { isLoading ?
                ( <h1 style={{textAlign: "center"}}>Loading...</h1> )
                :
                ( <div className="wrapper">
                    <form onSubmit={ (e) => e.preventDefault()} >
                        <input
                            onChange={ (e) => setSearch(e.target.value.trim()) }
                            className="input-search"
                            type="text"
                            placeholder="Search coins"
                        />
                    </form>
                    <TitleBoard />
                    { filterCoins.length > 0 ?
                        ( filterCoins.map(coin =>
                            <CoinBoard
                                key={coin.id}
                                name={coin.name}
                                image={coin.image}
                                symbol={coin.symbol}
                                volume={coin.market_cap}
                                price={coin.current_price}
                                priceChange={coin.price_change_percentage_24h}
                                id={coin.id}
                            />))
                        :
                        ( <h1> No coin <span style={{color: 'red'}}>{search}</span> in the list</h1> )
                    }
                </div> )
            }
        </>
    );
}