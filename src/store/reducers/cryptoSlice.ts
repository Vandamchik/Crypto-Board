import { CryptoState, ICryptoData } from "../../modules/modules";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCrypto } from "./ActionCreator";



const initialState: CryptoState = {
    crypto: [],
    isLoading: false,
    error: "",
}

export const cryptoSlice = createSlice({
    name: "crypto",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCrypto.fulfilled.type]: (state, action: PayloadAction<ICryptoData[]>) => {
            state.isLoading = false;
            state.error = "";
            state.crypto = action.payload;
        },
        [fetchCrypto.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchCrypto.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default cryptoSlice.reducer;