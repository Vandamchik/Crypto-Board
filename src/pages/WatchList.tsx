import React from 'react';
import {useAppSelector} from "../hooks/redux";

export function WatchList(): JSX.Element  {
    const { favorites } = useAppSelector(state => state.watchList)

    if(favorites.length === 0) return <p>No Items</p>

    return (
        <div >
            {favorites.map(f => <p key={f}>{f}</p>)}
        </div>
    );
}