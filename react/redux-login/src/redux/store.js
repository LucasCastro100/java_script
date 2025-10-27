import { configureStore } from "@reduxjs/toolkit";
import rootReduce from "./root-reducer";


export const store = configureStore({
    reducer: rootReduce
})