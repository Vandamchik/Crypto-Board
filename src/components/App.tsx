import React, {useEffect, useState} from "react";
import '../styles/App.css'
import { CoinBoard } from "./CoinBoard";
import {ICryptoData} from "../modules/modules";
import axios from "axios";

const BASE_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'

export const App: React.FC = () => {
    const [search, setSearch] = useState<string>("")
    const [coins, setCoins] = useState<ICryptoData[]>([])

    useEffect(() => {
        axios.get<ICryptoData[]>(`${BASE_URL}`)
            .then(response => {
                setCoins(response.data)
            }).catch(error => alert(`Server ${error}`))
    },[])

    function submitHandler(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault()
    }

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value.trim())
    }

    const filterCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    )



    return (
        <div className="wrapper">
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
                { filterCoins.map(coin =>
                    <CoinBoard
                        key={coin.id}
                        name={coin.name}
                        image={coin.image}
                        symbol={coin.symbol}
                        volume={coin.market_cap}
                        price={coin.current_price}
                        priceChange={coin.price_change_percentage_24h}
                        marketcap={coin.total_volume}
                    />
                ) }
        </div>
    );
}

