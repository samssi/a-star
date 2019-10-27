import * as R from "ramda";
import {START, END, FREE, OBSTACLE} from "../redux/objectTypes";
import * as stepState from "../redux/stepState";
import * as Immutable from "immutable";
import * as direction from "./direction";

const mapIndexed = R.addIndex(R.map);
const X = "x";
const Y = "y";

export const searchTable = (table, objectType) => {
  return R.pipe(mapIndexed((xItems, y) => R.pipe(
    R.map(R.equals(objectType.value)), 
    mapIndexed((yItems, x) => yItems && [x, y]), 
    R.reject(R.equals(false))
  )(xItems)), R.unnest)(table);
};

const searchStartAndEndPositionsFromTable = (table) => {
    const newStartPosition = { 
      startPosition: searchTable(table, START)[0], 
      endPosition: searchTable(table, END)[0]
    };
    return newStartPosition;
}

const returnStartEndPositions = (state) => {
  const positions = searchStartAndEndPositionsFromTable(state.table)
  return {
    stepInfo: `Found start position: ${positions.startPosition}, end position: ${positions.endPosition}`,
    stepState: stepState.H_COST,
    currentPosition: positions.startPosition,
    ...positions
  };
}

const translateArrayToXY = (arrayElement) => {
  return { x: arrayElement[1], y: arrayElement[0]}
}

const updateMovesToTable = (table, path) => {
  const newTable = R.clone(table);
  R.forEach((item) => {
    const xy = translateArrayToXY(item)
    const element = newTable[xy.x][xy.y];
    if(element === FREE.value) {
      return newTable[xy.x][xy.y] = 2;
    }
  }, path);
  
  return newTable;
}

const calculateDistanceBetween = (startPosition, endPosition) => {
  return {x: endPosition[0]- startPosition[0], y: endPosition[1] - startPosition[1]};
}

const transformXMoves = (value) => {
  if (value > 0) {
    return {
      direction: direction.E,
      distance: value
    }
  }
  else if (value < 0) {
    return {
      direction: direction.W,
      distance: Math.abs(value)
    }
  }
  else {
    return {
      direction: direction.NONE,
      distance: value
    }
  }
}

const transformYMoves = (value) => {
  if (value > 0) {
    return {
      direction: direction.S,
      distance: value
    }
  }
  else if (value < 0) {
    return {
      direction: direction.N,
      distance: Math.abs(value)
    }
  }
  else {
    return {
      direction: direction.NONE,
      distance: value
    }
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

const move = (moveDirection, position) => {
  const newPosition = R.clone(position);

  switch (moveDirection) {
    case direction.S:
      newPosition[1] = newPosition[1] + 1;
      return newPosition;
    case direction.N:
      newPosition[1] = newPosition[1] - 1;
      return newPosition;
    case direction.W:
      newPosition[0] = newPosition[0] - 1;
      return newPosition;
    case direction.E:
      newPosition[0] = newPosition[0] + 1;
      return newPosition;
    default:
      return newPosition;
  }
}

const executeMoves = (moves, position) => {
  const startPosition = R.clone(position);
  const path = Immutable.List();
  
  const untilMovesExecuted = (cost, position, direction, movesLeft, path) => {
    if (movesLeft <= 0) {
      return { cost: cost, path: path, position: position }
    }
    const newPosition = move(direction, position);
    const newPath = path.push(newPosition);
    return untilMovesExecuted(cost + 10, newPosition, direction, movesLeft-1, newPath)
  }
  const pathCost = untilMovesExecuted(0, startPosition, moves.direction, moves.distance, path);
  
  return pathCost;
}

const calculateHCost = (state) => {
  const startPosition = R.clone(state.startPosition);
  const endPosition = R.clone(state.endPosition);
  const distance = calculateDistanceBetween(startPosition, endPosition);
  console.log(distance)
  
  const xMoves = transformIntoMoves(distance.x, X);
  const yMoves = transformIntoMoves(distance.y, Y);
  
  const xPathCost = executeMoves(xMoves, state.startPosition);
  const yPathCost = executeMoves(yMoves, xPathCost.position);

  const xTable = updateMovesToTable(state.table, xPathCost.path);
  const xyTable = updateMovesToTable(xTable, yPathCost.path);

  return {
    table: xyTable,
    stepInfo: `Calculated H cost of ${xPathCost.cost} for position: ${state.currentPosition}`
  }
}

export const nextStep = (state) => {
  switch (state.stepState) {
    case stepState.INIT:
      return returnStartEndPositions(state);
    case stepState.H_COST:
      return calculateHCost(state)
  }  
};