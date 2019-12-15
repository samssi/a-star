import * as R from "ramda";
import {mutateCell, surroundingCells, updateNodesToTable} from "./control";
import {hPath} from "./hCalculator";
import {FGH_COST_LOWEST} from "../redux/stepState";
import {CLOSED, NodeObject, OPEN} from "../redux/objectTypes";

const updateOpenNodes = (table, openNodes, cell, startPosition, endPosition) => {
    const hPathCost = hPath(table, cell, endPosition).totalPathCost;
    // TODO: using heuristic calculation is temp. Heuristics doesn't calculate around objects but direct path through them!
    const gPathCost = hPath(table, cell, startPosition).totalPathCost;
    const fCost = hPathCost + gPathCost;
    return R.append(NodeObject(cell[0], cell[1], OPEN(gPathCost, hPathCost, fCost)), openNodes);
};

const calculateFgh = (table, openNodes, cells, startPosition, endPosition) => {
    const untilCellsExhausted = (openNodes, cells) => {
        if (cells.isEmpty()) {
            return openNodes;
        }
        const newOpenNodes = updateOpenNodes(table, openNodes, cells.last(), startPosition, endPosition);
        return untilCellsExhausted(newOpenNodes, cells.pop());
    };
    return untilCellsExhausted(openNodes, cells);
};

export const calculateFghCosts = (state) => {
    const cells = surroundingCells(state.table, state.closedNodes, state.currentPosition);
    const openNodes = calculateFgh(state.table, state.openNodes, cells, state.startPosition, state.endPosition);
    const table = updateNodesToTable(state.table, openNodes);
    const nextTable = updateNodesToTable(table, state.closedNodes);

    return {
        table: nextTable,
        openNodes: openNodes,
        stepInfo: "Calculated FGH for next neighboring cells. Results visible",
        stepState: FGH_COST_LOWEST
    }
};