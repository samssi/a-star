import * as R from "ramda";
import {
    findNodeObject,
    mutateCell,
    resolveByHighestGCost, resolveByLowestGCost,
    surroundingCells,
    updateNodesToTable
} from "./control";
import {gPath, hPath} from "./hCalculator";
import {FGH_COST_LOWEST} from "../redux/stepState";
import {CLOSED, NodeObject, OPEN} from "../redux/objectTypes";
import {find} from "ramda";

const calculateFgh = (table, openNodes, cells, startPosition, endPosition, currentPosition, closedNodes) => {
    const currentPositionNode = findNodeObject(currentPosition[0], currentPosition[1], closedNodes);
    return R.map(cell => {
        const hPathCost = hPath(table, cell.position, endPosition).totalPathCost;
        const gPathCost = gPath(currentPositionNode, cell.moveGCost);
        const fCost = hPathCost + gPathCost;
        return resolveByLowestGCost(openNodes,
            NodeObject(cell.position[0], cell.position[1],
            OPEN(gPathCost, hPathCost, fCost, currentPositionNode)));
    }, cells);
};

const removeNodeObject = (x, y, nodes) => R.filter(node => node.x !== x && node.y !== y, nodes);
const replaceWithNew = (oldOpenNode, newOpenNode, resultingNodes) => R.append(newOpenNode, removeNodeObject(newOpenNode.x, newOpenNode.y, resultingNodes));

const concatNodes = (openNodes, newOpenNodes) => {
    const concat = (openNodes, newOpenNodes, resultingNodes) => {
        if (R.isEmpty(newOpenNodes)) {
            return resultingNodes;
        }

        const newOpenNode = newOpenNodes.pop();
        const oldOpenNode = findNodeObject(newOpenNode.x, newOpenNode.y, resultingNodes);

        return R.isNil(oldOpenNode)
            ? concat(openNodes, newOpenNodes, R.append(newOpenNode, resultingNodes))
            : replaceWithNew(oldOpenNode, newOpenNode, resultingNodes);

    };
    return concat(openNodes, newOpenNodes, openNodes);
};

export const calculateFghCosts = (state) => {
    const cells = surroundingCells(state.table, state.closedNodes, state.currentPosition);
    const newOpenNodeObjects = calculateFgh(state.table, state.openNodes, cells, state.startPosition, state.endPosition, state.currentPosition, state.closedNodes);
    const concatenatedOpenNodes = concatNodes(state.openNodes, newOpenNodeObjects, state.currentPosition);
    const openNodes = removeNodeObject(state.currentPosition[1], state.currentPosition[0], concatenatedOpenNodes);

    const table = updateNodesToTable(state.table, openNodes);
    const nextTable = updateNodesToTable(table, state.closedNodes);

    return {
        table: nextTable,
        openNodes: openNodes,
        stepInfo: "Calculated FGH for next neighboring cells. Results visible",
        stepState: FGH_COST_LOWEST
    }
};
