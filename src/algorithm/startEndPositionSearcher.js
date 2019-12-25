import * as R from "ramda";
import * as control from "./control";
import * as direction from "./direction";
import {
    START,
    END,
    FREE,
    OBSTACLE,
    NodeObject,
    CLOSED
} from "../redux/objectTypes";
import * as stepState from "../redux/stepState";
import {putNodeObject} from "./control";

export const returnStartEndPositions = (state) => {
    const positions = searchStartAndEndPositionsFromTable(state.table);
    const closedNodes = putNodeObject(state.closedNodes, NodeObject(positions.startPosition[0], positions.startPosition[1], CLOSED()));
    return {
        stepInfo: `Found start position: ${positions.startPosition}, end position: ${positions.endPosition}`,
        stepState: stepState.H_COST,
        closedNodes: closedNodes,
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
