import { SELECT_CELL, OBJECT_TABLE } from "../actionTypes";

const initialState = {
    table: [[0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 8, 0, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 9, 0],
            [0, 0, 0, 0, 0, 0]]
}
            
const store = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_CELL:
            const newTable = [...state.table]
            newTable[action.payload.x][action.payload.y] = action.payload.objectType;
            return {
                ...state,
                table: newTable
            };
        default: 
            return state;
    }
}

export default store;