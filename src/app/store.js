import { configureStore } from "@reduxjs/toolkit";
import appReducer from '../redux/appSlice'; 

export const store = configureStore({
    reducer: {
        movie: appReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})