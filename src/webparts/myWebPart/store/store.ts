import { createStore } from "redux";

import { counterReducer } from "./reducer";

//create the redux store

export const store=createStore(
    counterReducer
);
//infer tyoes

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch