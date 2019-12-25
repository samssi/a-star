import * as R from "ramda";
import {
    findNodeObject,
    mutateCell,
    resolveByHighestGCost,
    surroundingCells,
    updateNodesToTable
} from "./control";
import {hPath} from "./hCalculator";
import {FGH_COST_LOWEST} from "../redux/stepState";
import {CLOSED, NodeObject, OPEN} from "../redux/objectTypes";

const calculateFgh = (table, openNodes, cells, startPosition, endPosition, currentPosition) => {
    const currentPositionNode = findNodeObject(currentPosition[0], currentPosition[1], openNodes);
    return R.map(cell => {
        const hPathCost = hPath(table, cell, endPosition).totalPathCost;
        // TODO: calculate parents together on the path
        const gPathCost = hPath(table, cell, startPosition).totalPathCost;
        const fCost = hPathCost + gPathCost;
        return resolveByHighestGCost(openNodes, NodeObject(cell[0], cell[1], OPEN(gPathCost, hPathCost, fCost, currentPositionNode)));
    }, cells);
};

export const calculateFghCosts = (state) => {
    const cells = surroundingCells(state.table, state.closedNodes, state.currentPosition);
    const openNodes = calculateFgh(state.table, state.openNodes, cells, state.startPosition, state.endPosition, state.currentPosition);
    const table = updateNodesToTable(state.table, openNodes);
    const nextTable = updateNodesToTable(table, state.closedNodes);

    console.log(openNodes)

    return {
        table: nextTable,
        openNodes: openNodes,
        stepInfo: "Calculated FGH for next neighboring cells. Results visible",
        stepState: FGH_COST_LOWEST
    }
};
