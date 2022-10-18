import React from "react";
import '../styles/App.css'
import { HomePage } from "../pages/HomePage";
import {Route, Routes} from "react-router-dom";
import {WatchList} from "../pages/WatchList";
import {Navigation} from "./Navigation";


export function App(): JSX.Element {

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={ <HomePage/> }/>
                <Route path="/watch-list" element={ <WatchList /> }/>
            </Routes>
        </>
    );
}

