import * as R from "ramda";

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

export const findLowestCost = (state) => {
    const lowestCost = search(state.openNodes);
    return {
        ...state,
        currentPosition: lowestCost.cell,
        stepInfo: `Selecting lowest cost position: ${lowestCost.cell}`
    }
};