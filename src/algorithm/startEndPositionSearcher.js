import * as R from "ramda";
import * as control from "./control";
import * as direction from "./direction";
import {START, END, FREE, OBSTACLE} from "../redux/objectTypes";
import * as stepState from "../redux/stepState";

export const returnStartEndPositions = (state) => {
    const positions = searchStartAndEndPositionsFromTable(state.table)
    return {
        stepInfo: `Found start position: ${positions.startPosition}, end position: ${positions.endPosition}`,
        stepState: stepState.H_COST,
        currentPosition: positions.startPosition,
        ...positions
    };
};

const searchStartAndEndPositionsFromTable = (table) => {
    const newStartPosition = {
        startPosition: control.searchTable(table, START)[0],
        endPosition: control.searchTable(table, END)[0]
    };
    return newStartPosition;
};