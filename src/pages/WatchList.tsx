import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchCrypto } from "../store/reducers/ActionCreator";
import { CoinBoard } from "../components/CoinBoard";
import { TitleBoard } from "../components/TitleBoard";
import '../styles/WatchList.css'


export function WatchList(): JSX.Element  {
    const { favorites } = useAppSelector(state => state.watchList)
    const dispatch = useAppDispatch()
    const { crypto, isLoading, error } = useAppSelector(state => state.cryptoReducer)

    const filterFav = crypto.filter(item => {
        for(let i = 0; i < favorites.length; i++){
            if(item.id === favorites[i]) return true
        }
    })

    useEffect(() => {
        dispatch(fetchCrypto())
    }, [])

    if(favorites.length === 0) return <p>No Items</p>

    return (
        <>
            { error && <h1>{error}</h1> }
            { isLoading ?
                ( <h1 style={{textAlign: "center"}}>Loading...</h1> )
                :
                (
                    <div className="watchList_wrapper">
                        <TitleBoard />
                        { filterFav.map(item =>
                            <CoinBoard
                                key={item.id}
                                name={item.name}
                                image={item.image}
                                symbol={item.symbol}
                                volume={item.market_cap}
                                price={item.current_price}
                                priceChange={item.price_change_percentage_24h}
                                id={item.id}
                            />
                        )}
                    </div>
                )
            }
        </>
    );
}