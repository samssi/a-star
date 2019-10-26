import * as R from "ramda";
import {START, END, FREE, OBSTACLE} from "../redux/objectTypes";
import * as stepState from "../redux/stepState"
import * as Immutable from "immutable"

const mapIndexed = R.addIndex(R.map);

export const searchTable = (table, objectType) => {
  return R.pipe(mapIndexed((xItems, y) => R.pipe(
    R.map(R.equals(objectType.value)), 
    mapIndexed((yItems, x) => yItems && [x, y]), 
    R.reject(R.equals(false))
  )(xItems)), R.unnest)(table);
};

const searchStartAndEndPositionsFromTable = (table) => {
    const newStartPosition = { 
      startPosition: searchTable(table, START), 
      endPosition: searchTable(table, END)
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

const moveSouth = (position, path) => {
  const newPosition = R.clone(position);

  newPosition[0][1] = newPosition[0][1] + 1;
  const newPath = path.push(newPosition);
  return { newPosition: newPosition, path: newPath };
}

const translateArrayToXY = (arrayElement) => {
  return { x: arrayElement[0][1], y: arrayElement[0][0]}
}

const updateMovesToTable = (state, path) => {
  const newTable = R.clone(state.table);
  R.forEach((item) => {
    const xy = translateArrayToXY(item)
    const element = newTable[xy.x][xy.y];
    if(element === FREE.value) {
      return newTable[xy.x][xy.y] = 2;
    }
  }, path);
  
  console.log(newTable);
  
  return newTable;
}

const calculateHCost = (state) => {
  const currentPosition = R.clone(state.startPosition);
  const endPosition = R.clone(state.endPosition);
  const path = Immutable.List();
  
  const recurseToEnd = (cost, position, endPosition, path) => {
    if (R.equals(position, endPosition)) {
      return { cost: cost, path: path };
    }
    const move = moveSouth(position, path);
    return recurseToEnd(cost + 10, move.newPosition, endPosition, move.path); 
  }
  
  const move = recurseToEnd(0, currentPosition, endPosition, path);
  const newTable = updateMovesToTable(state, move.path);
  
  return {
    table: newTable,
    stepInfo: `Calculated H cost of ${move.cost} for position: ${state.currentPosition}`
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