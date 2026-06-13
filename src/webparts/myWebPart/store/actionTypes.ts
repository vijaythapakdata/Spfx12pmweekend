//Action type cosntants
export const ActionTypes={
    INCREMENT:'INCREMENT',
    DECREMENT:'DECREMENT',
    RESET:'RESET',
    ADD_ITEM:'ADD_ITEM',
    REMOVE_ITEM:'REMOVE_ITEM'

} as const;

export type ActionType=typeof ActionTypes[keyof typeof ActionTypes];