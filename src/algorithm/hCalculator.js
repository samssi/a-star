import * as R from "ramda";
import * as control from "./control"
import * as direction from "./direction";

const X = "x";
const Y = "y";

const transformXMoves = (value) => {
    if (value > 0) {
      return control.moveObject(direction.E, value);
    }
    else if (value < 0) {
      return control.moveObject(direction.W, Math.abs(value));
    }
    else {
      return control.moveObject(direction.NONE, value);
    }
  }
  
const transformYMoves = (value) => {
    if (value > 0) {
        return control.moveObject(direction.S, value);
    }
    else if (value < 0) {
        return control.moveObject(direction.N, Math.abs(value));
    }
    else {
      return control.moveObject(direction.NONE, value);
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
    
    const xPathCost = control.executeMoves(xMoves, state.startPosition);
    const yPathCost = control.executeMoves(yMoves, xPathCost.position);
    const totalPathCost = xPathCost.cost + yPathCost.cost;
  
    const xTable = control.updateMovesToTable(state.table, xPathCost.path);
    const xyTable = control.updateMovesToTable(xTable, yPathCost.path);
  
    return {
      table: xyTable,
      stepInfo: `Calculated H cost of ${totalPathCost} for position: ${state.currentPosition}`
    }
  }