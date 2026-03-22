import * as R from "ramda";
import {mutateCell, updateCurrentPositionToTable, updateNodesToTable} from "./control";
import {FGH_COST_NEXT, COMPLETE, NO_PATH} from "../redux/stepState";
import {CLOSED, FINAL_PATH, START, END} from "../redux/objectTypes";

const descByFCost = R.ascend(R.path(['object', 'fCost']));
const searchForLowestCost = (openNodes) => R.sort(descByFCost, openNodes)[0];

const reconstructPath = (closedNodes, endPosition, startPosition) => {
    const path = [];
    let current = endPosition;
    while (current[0] !== startPosition[0] || current[1] !== startPosition[1]) {
        path.push(current);
        const node = R.find(n => n.x === current[0] && n.y === current[1], closedNodes);
        if (!node || !node.parent) break;
        current = node.parent;
    }
    path.push(startPosition);
    return path.reverse();
};

const drawFinalPath = (table, path) => {
    const newTable = R.clone(table);
    R.forEach(pos => {
        const cell = newTable[pos[1]][pos[0]];
        if (cell.value !== START.value && cell.value !== END.value) {
            mutateCell(newTable, pos[0], pos[1], FINAL_PATH);
        }
    }, path);
    return newTable;
};

export const findLowestCost = (state) => {
    if (state.openNodes.length === 0) {
        return {
            ...state,
            stepInfo: "No path found! Open set is empty.",
            stepState: NO_PATH
        };
    }

    const lowestCostObject = searchForLowestCost(state.openNodes);
    const remainingOpenNodes = R.reject(
        node => node.x === lowestCostObject.x && node.y === lowestCostObject.y,
        state.openNodes
    );
    const closedNode = {
        ...lowestCostObject,
        object: CLOSED(lowestCostObject.object.gCost, lowestCostObject.object.hCost, lowestCostObject.object.fCost)
    };
    const closedNodes = R.append(closedNode, state.closedNodes);
    const currentPosition = [lowestCostObject.x, lowestCostObject.y];

    const reachedEnd = currentPosition[0] === state.endPosition[0] && currentPosition[1] === state.endPosition[1];

    if (reachedEnd) {
        const finalPath = reconstructPath(closedNodes, state.endPosition, state.startPosition);
        const finalTable = drawFinalPath(state.table, finalPath);
        return {
            ...state,
            table: finalTable,
            currentPosition: currentPosition,
            closedNodes: closedNodes,
            openNodes: remainingOpenNodes,
            stepInfo: "Complete!",
            stepState: COMPLETE
        };
    }

    return {
        ...state,
        table: updateCurrentPositionToTable(state.table, lowestCostObject),
        currentPosition: currentPosition,
        closedNodes: closedNodes,
        openNodes: remainingOpenNodes,
        stepInfo: `Selecting lowest cost position: ${currentPosition}`,
        stepState: FGH_COST_NEXT
    }
};
