import {SELECT_CELL, EDIT_TYPE, TOGGLE_MODE, NEXT_STEP} from "../actionTypes";
import * as objectTypes from "../objectTypes";
import * as modes from "../modes";
import * as astar from "../../algorithm/astar"
import * as stepState from "../stepState"
import * as R from "ramda";

const initialState = {
    table: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    mode: modes.RUN,
    editObjectType: objectTypes.FREE.value,
    stepState: stepState.INIT,
    stepInfo: "Astar ready!",
    startPosition: [-1,-1],
    endPosition: [-1,-1],
    currentPosition: [-1,-1]
};

const table = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_CELL:
            const newTable = R.clone(state.table);
            newTable[action.payload.y][action.payload.x] = state.editObjectType;
            return {
                ...state,
                table: newTable
            };
        case EDIT_TYPE:
            return {
                ...state,
                editObjectType: action.payload.objectValue
            };
        case TOGGLE_MODE:
            return {
                ...state,
                stepState: stepState.INIT,
                mode: action.payload.mode
            };
      case NEXT_STEP:
        return {
          ...state,
          ...astar.nextStep(state)
        };
        default: 
            return state;
    }
};

export default table;