import * as R from "ramda";
import {mutateCell, surroundingCells, updateNodesToTable} from "./control";
import {hPath} from "./hCalculator";
import {FGH_COST_LOWEST} from "../redux/stepState";
import {CLOSED, NodeObject, OPEN} from "../redux/objectTypes";

const movementCost = (currentPosition, neighborPosition) => {
    const dx = Math.abs(neighborPosition[0] - currentPosition[0]);
    const dy = Math.abs(neighborPosition[1] - currentPosition[1]);
    return (dx === 1 && dy === 1) ? 15 : 10;
};

const calculateFgh = (table, openNodes, cells, currentPosition, parentGCost, endPosition) => {
    return R.map(cell => {
        const hPathCost = hPath(table, cell, endPosition).totalPathCost;
        const gPathCost = parentGCost + movementCost(currentPosition, cell);
        const fCost = hPathCost + gPathCost;
        return { ...NodeObject(cell[0], cell[1], OPEN(gPathCost, hPathCost, fCost)), parent: currentPosition };
    }, cells);
};

const mergeOpenNodes = (existingNodes, newNodes) => {
    const merged = R.clone(existingNodes);
    R.forEach(newNode => {
        const existingIndex = R.findIndex(n => n.x === newNode.x && n.y === newNode.y, merged);
        if (existingIndex >= 0) {
            if (newNode.object.fCost < merged[existingIndex].object.fCost) {
                merged[existingIndex] = newNode;
            }
        } else {
            merged.push(newNode);
        }
    }, newNodes);
    return merged;
};

const getParentGCost = (closedNodes, currentPosition) => {
    const parentNode = R.find(n => n.x === currentPosition[0] && n.y === currentPosition[1], closedNodes);
    return parentNode ? parentNode.object.gCost : 0;
};

export const calculateFghCosts = (state) => {
    const cells = surroundingCells(state.table, state.closedNodes, state.currentPosition);
    const parentGCost = getParentGCost(state.closedNodes, state.currentPosition);
    const newNodes = calculateFgh(state.table, state.openNodes, cells, state.currentPosition, parentGCost, state.endPosition);
    const openNodes = mergeOpenNodes(state.openNodes, newNodes);
    const table = updateNodesToTable(state.table, openNodes);
    const nextTable = updateNodesToTable(table, state.closedNodes);

    return {
        table: nextTable,
        openNodes: openNodes,
        stepInfo: "Calculated FGH for next neighboring cells. Results visible",
        stepState: FGH_COST_LOWEST
    }
};