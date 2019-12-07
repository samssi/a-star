import * as R from "ramda";
import {mutateCell} from "./control";
import {CURRENT} from "../redux/objectTypes";
import {FGH_COST_NEXT} from "../redux/stepState";

const positionObject = (cell, objectType) => {
  return {
    cell,
    objectType
  };
};

const lowCostRules = (nillableNode, node2) => {
    if (R.isNil(nillableNode)) {
        return node2;
    }
    return nillableNode.objectType.fCost < node2.objectType.fCost ? nillableNode : node2;
};

const search = (openNodes) => {
    const checkForLowestCostUntilExhausted = (openNodes, lowestCostNode) => {
        if(openNodes.isEmpty()) {
            return lowestCostNode;
        }
        const key = openNodes.keySeq().last();
        const currentNode = positionObject(key, openNodes.get(key));
        const newLowestCostNode = lowCostRules(lowestCostNode, currentNode);
        return checkForLowestCostUntilExhausted(openNodes.remove(key), newLowestCostNode);
    };
    return checkForLowestCostUntilExhausted(openNodes, undefined);
};

const updateCurrentPositionToTable = (table, positionObject) => {
    const newTable = R.clone(table);
    mutateCell(newTable, positionObject.cell[0], positionObject.cell[1], CURRENT(positionObject.objectType.gCost, positionObject.objectType.hCost, positionObject.objectType.fCost));
    return newTable;
};

export const findLowestCost = (state) => {
    const lowestCostObject = search(state.openNodes);
    const currentPosition = lowestCostObject.cell;
    return {
        ...state,
        table: updateCurrentPositionToTable(state.table, lowestCostObject),
        currentPosition: currentPosition,
        stepInfo: `Selecting lowest cost position: ${currentPosition}`,
        stepState: FGH_COST_NEXT
    }
};