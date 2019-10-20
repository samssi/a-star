import * as R from "ramda";
import {START, END, FREE, OBSTACLE} from "../redux/objectTypes";
import * as stepState from "../redux/stepState"

const loopIndexed = R.addIndex(R.map);

export const searchTable = (table, objectType) => {
  return R.pipe(loopIndexed((xItems, y) => R.pipe(
    R.map(R.equals(objectType.value)), 
    loopIndexed((yItems, x) => yItems && [x, y]), 
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

const moveSouth = (position) => {
  const newPosition = R.clone(position);
  newPosition[0][1] = newPosition[0][1] + 1;
  return newPosition;
}

const calculateHCost = (state) => {
  const currentPosition = R.clone(state.startPosition);
  const endPosition = R.clone(state.endPosition);

  console.log(endPosition);
  
  const recurseToEnd = (cost, position, endPosition) => {
    if (R.equals(position, endPosition)) return cost;
    return recurseToEnd(cost + 10, moveSouth(position), endPosition); 
  }
  
  const cost = recurseToEnd(0, currentPosition, endPosition);
  
  return {
    stepInfo: `Calculated H cost of ${cost} for position: ${state.currentPosition}` 
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