import { PLOT_CELL, OBJECT_TABLE } from "../actionTypes";

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
        case PLOT_CELL:
            state.table[action.payload.x][action.payload.y] = action.payload.objectType;
            console.log(state.table)
            return state;
        default: 
            return state;
    }
}

export default store;