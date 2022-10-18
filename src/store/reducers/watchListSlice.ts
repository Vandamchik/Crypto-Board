import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWatchListSlice } from "../../modules/modules";


const FAV_KEY = "favcrypto";

const initialState: IWatchListSlice = {
    favorites: JSON.parse(localStorage.getItem(FAV_KEY) ?? "[]")
}

export const watchListSlice = createSlice({
    name: "watchList",
    initialState,
    reducers: {
        addFavourite(state, action: PayloadAction<any>) {
            state.favorites.push(action.payload)
            localStorage.setItem(FAV_KEY, JSON.stringify(state.favorites))
        },
        removeFavourite(state, action: PayloadAction<any>) {
            state.favorites = state.favorites.filter(f => f !== action.payload)
            localStorage.setItem(FAV_KEY, JSON.stringify(state.favorites))
        }
    }
})

export const watchListActions = watchListSlice.actions
export const watchListReducer = watchListSlice.reducer
