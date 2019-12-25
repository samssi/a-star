import * as R from "ramda";
import {
    mutateCell,
    putClosedNode,
    updateCurrentPositionToTable,
    updateNodesToTable
} from "./control";
import {FGH_COST_NEXT} from "../redux/stepState";
import {CLOSED} from "../redux/objectTypes";

const descByFCost = R.ascend(R.path(['object', 'fCost']));
const searchForLowestCost = (openNodes) => R.sort(descByFCost, openNodes)[0];

export const findLowestCost = (state) => {
    const lowestCostObject = searchForLowestCost(state.openNodes);
    console.log('lcost:' + JSON.stringify(lowestCostObject));
    const closedNodes = putClosedNode(state.closedNodes, lowestCostObject);
    console.log(closedNodes);
    const currentPosition = [lowestCostObject.x, lowestCostObject.y];

    return {
        ...state,
        table: updateCurrentPositionToTable(state.table, lowestCostObject),
        currentPosition: currentPosition,
        closedNodes: closedNodes,
        stepInfo: `Selecting lowest cost position: ${currentPosition}`,
        stepState: FGH_COST_NEXT
    }
};
