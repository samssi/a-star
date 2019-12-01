import {SELECT_CELL, EDIT_TYPE, TOGGLE_MODE, NEXT_STEP} from "../actionTypes";
import * as objectTypes from "../objectTypes";
import * as modes from "../modes";
import * as astar from "../../algorithm/astar"
import * as stepState from "../stepState"
import * as R from "ramda";
import {START} from "../objectTypes";
import {emptyTable, mutateCell} from "../../algorithm/control";
import {END} from "../objectTypes";
import {OBSTACLE} from "../objectTypes";

const initTable = () => {
  const table = emptyTable(12, 9);
  mutateCell(table, 0,3, START);
  mutateCell(table, 1, 3, OBSTACLE);
  mutateCell(table, 1, 4, OBSTACLE);
  mutateCell(table, 0, 4, OBSTACLE);
  mutateCell(table, 3,8, END);
  return table;
};

const initialState = {
    table: initTable(),
    mode: modes.RUN,
    editObjectType: objectTypes.FREE,
    stepState: stepState.INIT,
    stepInfo: "Astar ready!",
    startPosition: [-1,-1],
    endPosition: [-1,-1],
    currentPosition: [-1,-1]
};

const resetTable = (state) => {
    const newTable = emptyTable(12, 7);
    return {
        ...state,
        table: newTable
    };
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
            return action.payload.object.value === objectTypes.RESET.value ?
                resetTable(state, action) :
                {
                    ...state,
                    editObjectType: action.payload.object
                };
        case TOGGLE_MODE:
            return {
                ...state,
                stepState: stepState.INIT,
                mode: action.payload.mode === modes.EDIT ? modes.RUN : modes.EDIT
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
