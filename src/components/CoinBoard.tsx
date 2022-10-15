import React from 'react';
import '../styles/CoinBoard.css'
import { IProps } from "../modules/modules";


export const CoinBoard = ( props: IProps) => {
const {
    name,
    image,
    symbol,
    price,
    volume,
    priceChange,
    marketcap
    } = props

    return (
        <div className="coinBoard_container">
            <div className="coinBoard_row">
                    <img className="coinBoard_img" src={image} alt="crypto"/>
                    <p className="coinBoard_name">{name}</p>
                    <p className="coinBoard_symbol">{symbol}</p>
                    <p className="coinBoard_price">${price}</p>
                    <p className="coinBoard_volume">${volume.toLocaleString()}</p>
                { priceChange < 0 ? (
                    <p className="coinBoard_percent red">{priceChange.toFixed(2)}%</p>
                ) : (
                    <p className="coinBoard_percent green">{priceChange.toFixed(2)}%</p>
                )}
                    <p className="coinBoard_marketcap">
                        Mkt Cap: ${marketcap.toLocaleString()}
                    </p>
            </div>
        </div>
    );
};