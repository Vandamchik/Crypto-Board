import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./reducers/cryptoSlice";

const rootReducer = combineReducers({
     cryptoReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']