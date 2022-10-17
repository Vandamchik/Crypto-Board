import React, { useEffect, useState } from "react";
import { CoinBoard } from "./CoinBoard";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchCrypto } from "../store/reducers/ActionCreator";
import '../styles/App.css'


export function App(): JSX.Element {
    const dispatch = useAppDispatch()
    const { crypto, isLoading, error } = useAppSelector(state => state.cryptoReducer)
    const [search, setSearch] = useState<string>("")

    function submitHandler(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault()
    }

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value.trim())
    }

    const filterCoins = crypto.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() => {
        dispatch(fetchCrypto())
    }, [])


    return (
        <div className="wrapper">
            { error && <h1>{error}</h1> }
            { isLoading ?
                <h1>Loading...</h1>
                :
                <form
                    onSubmit={submitHandler}
                >
                    <input
                        onChange={changeHandler}
                        className="input-search"
                        type="text"
                        placeholder="Search coins"
                    />
                </form>
            }
            { filterCoins.map(coin =>
               <CoinBoard
                   key={coin.id}
                   name={coin.name}
                   image={coin.image}
                   symbol={coin.symbol}
                   volume={coin.market_cap}
                   price={coin.current_price}
                   priceChange={coin.price_change_percentage_24h}
                   id={coin.id}
               />
            ) }
        </div>
    );
}

