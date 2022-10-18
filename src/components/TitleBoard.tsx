import React from 'react';
import '../styles/TitleBoard.css'

export function TitleBoard():JSX.Element {
    return (
        <div className="titleBoard-wrapper">
        <p>Coin</p>
        <p>Current Price</p>
        <p>Market Capitalization</p>
        <p>1 day %</p>
        </div>
    );
}