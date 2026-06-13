import { AppAction } from "./action";
import { ActionTypes } from "./actionTypes";

//state interface

export interface IAppState{
    count:number;
    items:string[];
    user:string;
}
//initial state

const initialState:IAppState={
    count:0,
    items:[],
    user:'SharePoint User'
}

//reducer


export function counterReducer(
    state:IAppState=initialState,
    action:AppAction
):IAppState{
    switch(action.type){
        case ActionTypes.INCREMENT:
            return{
                ...state,count:state.count+1
            };
        case ActionTypes.DECREMENT:
            return{
                ...state,count:state.count-1
            };
        case ActionTypes.RESET:
            return{
                ...state,count:0
            };

        case ActionTypes.ADD_ITEM:
            return{
                ...state,items:[...state.items,action.payload]
            };
        case ActionTypes.REMOVE_ITEM:
            return{
                ...state,items:state.items.filter((_,index)=>index!==action.payload)
            };

        default:
            return state;

    }
}