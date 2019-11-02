import {START, END, FREE, OBSTACLE} from "../redux/objectTypes";
import * as stepState from "../redux/stepState";
import * as Immutable from "immutable";
import * as direction from "./direction";
import * as hCalculator from "./hCalculator";
import * as R from "ramda";

const mapIndexed = R.addIndex(R.map);

export const moveObject = (direction, distance) => {
    return {
      direction: direction,
      distance: distance
    };
}

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

export const updateMovesToTable = (table, path) => {
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

export const executeMoves = (moves, position) => {
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

export const nextStep = (state) => {
  switch (state.stepState) {
    case stepState.INIT:
      return returnStartEndPositions(state);
    case stepState.H_COST:
      return hCalculator.calculateHCost(state)
  }  
};