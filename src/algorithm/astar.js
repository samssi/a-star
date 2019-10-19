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

export const nextStep = (table, position) => {
  if (position[0] < 0 || position[1] < 0) {
    console.log("huu")
    return searchTable(table, START);
  }
  console.log("haa")
  return [1,1]
};