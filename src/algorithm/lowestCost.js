import * as R from "ramda";
import {mutateCell, updateCurrentPositionToTable, updateNodesToTable} from "./control";
import {FGH_COST_NEXT} from "../redux/stepState";
import {CLOSED} from "../redux/objectTypes";

const descByFCost = R.ascend(R.path(['object', 'fCost']));
const searchForLowestCost = (openNodes) => R.sort(descByFCost, openNodes)[0];

export const findLowestCost = (state) => {
    console.log(state.openNodes);
    const lowestCostObject = searchForLowestCost(state.openNodes);
    const closedNodes = R.append({...lowestCostObject,
        object: CLOSED(lowestCostObject.object.gCost, lowestCostObject.object.hCost, lowestCostObject.object.fCost)}
        , state.closedNodes);
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