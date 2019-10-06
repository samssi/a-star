import { SELECT_CELL, EDIT_TYPE, TOGGLE_MODE } from "../actionTypes";
import * as objectTypes from "../objectTypes";
import * as modes from "../modes";

const initialState = {
    table: [[0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 8, 0, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 9, 0],
            [0, 0, 0, 0, 0, 0]],
    mode: modes.EDIT,
    editObjectType: objectTypes.FREE.value
}

const selectCell = (state,x, y) => {
    const newTable = [...state.table]
    newTable[x][y] = state.editObjectType;
    return {
        ...state,
        table: newTable
    };
}

const table = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_CELL:
            return selectCell(state, action.payload.x, action.payload.y)
        case EDIT_TYPE:
            return {
                ...state,
                editObjectType: action.payload.objectValue
            };
        case TOGGLE_MODE:
            return {
                ...state,
                mode: action.payload.mode
            }
        default: 
            return state;
    }
}

export default table;