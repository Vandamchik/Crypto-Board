import axios from "axios";
import { ICryptoData } from "../../modules/modules";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'

export const fetchCrypto = createAsyncThunk(
    "crypto/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<ICryptoData[]>(`${BASE_URL}`)
            return response.data
        }
        catch (e) {
            return thunkAPI.rejectWithValue("Something goes wrong")
        }
    }
)




