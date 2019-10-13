import {SELECT_CELL, EDIT_TYPE, TOGGLE_MODE, NEXT_STEP} from "../actionTypes";
import * as objectTypes from "../objectTypes";
import * as modes from "../modes";
import * as astar from "../../algorithm/astar"

const initialState = {
    table: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 8, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    mode: modes.EDIT,
    editObjectType: objectTypes.FREE.value,
    currentPosition: {
      x: -1,
      y: -1
    }
}

const selectCell = (state, x, y) => {
    const newTable = [...state.table]
    newTable[y][x] = state.editObjectType;
    return {
        ...state,
        table: newTable
    };
}

const table = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_CELL:
            return selectCell(state, action.payload.x, action.payload.y);
        case EDIT_TYPE:
            return {
                ...state,
                editObjectType: action.payload.objectValue
            };
        case TOGGLE_MODE:
            return {
                ...state,
                mode: action.payload.mode
            };
      case NEXT_STEP:
        astar.nextStep(state.table, state.currentPosition);
        return {
          ...state
        };
        default: 
            return state;
    }
}

export default table;