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
  console.log("init start");
    const newStartPosition = { 
      startPosition: searchTable(table, START), 
      endPosition: searchTable(table, END)
    };
    return newStartPosition;
}

export const nextStep = (state) => {
  if (state.stepState === stepState.INIT) {
    const positions = searchStartAndEndPositionsFromTable(state.table)
    return {
      stepInfo: `Found start position: ${positions.startPosition}, end position: ${positions.endPosition}`,
      stepState: stepState.H_COST,
      ...positions
    };
  }

  return { }
};