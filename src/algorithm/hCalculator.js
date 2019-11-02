import * as R from "ramda";
import * as control from "./control"
import * as direction from "./direction";
import * as Immutable from "immutable";

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

const movesObject = (x, y, diagonal) => {
    return { x: x, y: y, diagonal: diagonal }
}
  
const transformIntoMoves = (distance) => {
    return movesObject(
        transformXMoves(distance.x),
        transformYMoves(distance.y),
        transformYMoves(distance.y)
    );
}

const calculateDistanceBetween = (startPosition, endPosition) => {
    return distanceObject(endPosition[0]- startPosition[0], endPosition[1] - startPosition[1]);
}

const distanceObject = (x, y) => {
    return {x: x, y: y}
}

const transformIntoDiagonalMoves = (xPath, yPath) => {
    
}

export const calculateHCost = (state) => {
    const startPosition = R.clone(state.startPosition);
    const endPosition = R.clone(state.endPosition);
    const distance = calculateDistanceBetween(startPosition, endPosition);
    
    const moves = transformIntoMoves(distance);
    
    const xPath = control.executeMoves(moves.x, state.startPosition);
    const yPath = control.executeMoves(moves.y, xPath.position);

    const totalPathCost = xPath.cost + yPath.cost;
  
    const xTable = control.updateMovesToTable(state.table, xPath.path);
    const xyTable = control.updateMovesToTable(xTable, yPath.path);
  
    return {
      table: xyTable,
      stepInfo: `Calculated H cost of ${totalPathCost} for position: ${state.currentPosition}`
    }
  }