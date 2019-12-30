import * as R from "ramda";
import {
    findNodeObject,
    mutateCell,
    putClosedNode, putNodeObject,
    updateCurrentPositionToTable,
    updateNodesToTable
} from "./control";
import {FGH_COST_NEXT} from "../redux/stepState";
import {CLOSED} from "../redux/objectTypes";

const descByFCost = R.ascend(R.path(['object', 'fCost']));
const searchForLowestCost = (openNodes) => R.sort(descByFCost, openNodes)[0];

export const findLowestCost = (state) => {
    const lowestCostObject = searchForLowestCost(state.openNodes);
    console.log(lowestCostObject)
    const closedNodes = putNodeObject(state.closedNodes, lowestCostObject);
    const currentPosition = [lowestCostObject.x, lowestCostObject.y];
    console.log('open nodes:')
    console.log(state.openNodes)

    console.log('closed nodes:')
    console.log(closedNodes)

    return {
        ...state,
        table: updateCurrentPositionToTable(state.table, lowestCostObject),
        currentPosition: currentPosition,
        closedNodes: closedNodes,
        stepInfo: `Selecting lowest cost position: ${currentPosition}`,
        stepState: FGH_COST_NEXT
    }
};
