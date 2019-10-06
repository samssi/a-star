import { SELECT_CELL, EDIT_TYPE } from "../actionTypes";
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
            const newObjectType = action.payload.objectValue;
            return {
                ...state,
                editObjectType: newObjectType
            };
        default: 
            return state;
    }
}

export default table;