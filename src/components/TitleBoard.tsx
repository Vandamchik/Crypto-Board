import React from 'react';
import '../styles/TitleBoard.css'

export function TitleBoard():JSX.Element {

    return (
        <div className="titleBoard-wrapper">
            <p style={{textAlign: 'center'}}>Watch list</p>
            <p style={{textAlign: "center"}}>Coin</p>
            <p style={{textAlign: "end"}}>Current Price</p>
            <p style={{textAlign: "end", width: "200px"}}>Market Capitalization</p>
            <p style={{textAlign: "center"}}>1 Day %</p>
            <p style={{textAlign: "center"}}>Watch Chart</p>
        </div>
    );
}