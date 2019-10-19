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

export const searchForStartPosition = (table) => {
  console.log("searching for start position");
  console.log(searchTable(table, START))
  console.log(searchTable(table, OBSTACLE))
};

export const nextStep = (table, position) => {
  console.log('>> next step >>');
  console.log(searchForStartPosition(table))
};

export const selectCell = (state, x, y) => {
  const newTable = [...state.table];
  newTable[y][x] = state.editObjectType;
  return {
    ...state,
    table: newTable
  };
};