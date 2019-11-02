import * as R from "ramda";
import * as aStar from "./astar"
import * as direction from "./direction";

const X = "x";
const Y = "y";

const transformXMoves = (value) => {
    if (value > 0) {
      return aStar.moveObject(direction.E, value);
    }
    else if (value < 0) {
      return aStar.moveObject(direction.W, Math.abs(value));
    }
    else {
      return aStar.moveObject(direction.NONE, value);
    }
  }
  
const transformYMoves = (value) => {
    if (value > 0) {
        return aStar.moveObject(direction.S, value);
    }
    else if (value < 0) {
        return aStar.moveObject(direction.N, Math.abs(value));
    }
    else {
      return aStar.moveObject(direction.NONE, value);
    }
}
  
const transformIntoMoves = (value, axis) => {
    switch(axis) {
        case X:
          return transformXMoves(value);
        case Y:
            return transformYMoves(value);
    }
}

const calculateDistanceBetween = (startPosition, endPosition) => {
    return {x: endPosition[0]- startPosition[0], y: endPosition[1] - startPosition[1]};
  }

export const calculateHCost = (state) => {
    const startPosition = R.clone(state.startPosition);
    const endPosition = R.clone(state.endPosition);
    const distance = calculateDistanceBetween(startPosition, endPosition);
    
    const xMoves = transformIntoMoves(distance.x, X);
    const yMoves = transformIntoMoves(distance.y, Y);
    
    const xPathCost = aStar.executeMoves(xMoves, state.startPosition);
    const yPathCost = aStar.executeMoves(yMoves, xPathCost.position);
    const totalPathCost = xPathCost.cost + yPathCost.cost;
  
    const xTable = aStar.updateMovesToTable(state.table, xPathCost.path);
    const xyTable = aStar.updateMovesToTable(xTable, yPathCost.path);
  
    return {
      table: xyTable,
      stepInfo: `Calculated H cost of ${totalPathCost} for position: ${state.currentPosition}`
    }
  }