import * as R from "ramda";
import {START, END, FREE, OBSTACLE} from "../redux/objectTypes";

const loopIndexed = R.addIndex(R.map);

export const searchTable = (table, objectType) => {
  return R.pipe(loopIndexed((xItems, y) => R.pipe(
    R.map(R.equals(objectType.value)), 
    loopIndexed((yItems, x) => yItems && [x, y]), 
    R.reject(R.equals(false))
  )(xItems)), R.unnest)(table);
};

const isPositionEmpty = (position) => position[0] < 0 && position [1] < 0;

const searchStartAndEndPositionsFromTable = (table) => {
  console.log("init start");
    const newStartPosition = { 
      startPosition: searchTable(table, START), 
      endPosition: searchTable(table, END)
    };
    return newStartPosition;
}

export const nextStep = (table, startPosition, endPosition) => {
  if (isPositionEmpty(startPosition) && isPositionEmpty(endPosition)) {
    const positions = searchStartAndEndPositionsFromTable(table)
    return {
      stepInfo: `Found start position: ${positions.startPosition}, end position: ${positions.endPosition}`,
      ...positions
    };
  }

  return { }
};