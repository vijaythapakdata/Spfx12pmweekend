import {  ActionTypes } from "./actionTypes";

export interface IIncrementAction{
    type:typeof ActionTypes.INCREMENT;
}

export interface IDecrementAction{
    type:typeof ActionTypes.DECREMENT;
}

export interface IResetAction{
    type:typeof ActionTypes.RESET;
}
export interface IAddItemAction{
    type:typeof ActionTypes.ADD_ITEM;
    payload:string;
}
export interface IRemoveItemAction{
    type:typeof ActionTypes.REMOVE_ITEM;
    payload:number;
}

//union type of all Action
export type AppAction=|IIncrementAction|IDecrementAction|IResetAction|IAddItemAction|IRemoveItemAction;

// Action creators
export const increment=():IIncrementAction=>({
    type:ActionTypes.INCREMENT
});

export const decrement=():IDecrementAction=>({
    type:ActionTypes.DECREMENT
});

export const reset=():IResetAction=>({
    type:ActionTypes.RESET
});

export const addItem=(item:string):IAddItemAction=>({
    type:ActionTypes.ADD_ITEM,
    payload:item
});

export const removeItem=(index:number):IRemoveItemAction=>({
    type:ActionTypes.REMOVE_ITEM,
    payload:index
});
