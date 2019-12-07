import {SELECT_CELL, EDIT_TYPE, TOGGLE_MODE, NEXT_STEP} from "../actionTypes";
import * as objectTypes from "../objectTypes";
import * as modes from "../modes";
import * as astar from "../../algorithm/astar"
import * as stepState from "../stepState"
import * as R from "ramda";
import { emptyTable, startUpTable } from "../../algorithm/control";
import {Map} from "immutable";

const tableWidth = 12;
const tableHeight = 7;

const initialState = {
    table: startUpTable(),
    openNodes: Map(),
    closedNodes: Map(),
    mode: modes.RUN,
    editObjectType: objectTypes.FREE,
    stepState: stepState.INIT,
    stepInfo: "Astar ready!",
    startPosition: [-1,-1],
    endPosition: [-1,-1],
    currentPosition: [-1,-1]
};

const resetTable = (state) => {
    return {
        ...state,
        openNodes: Map(),
        closedNodes: Map(),
        table: emptyTable(tableWidth, tableHeight)
    };
};

const main = (state = initialState, action) => {
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

export default main;
