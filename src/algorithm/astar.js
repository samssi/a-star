import * as R from "ramda";
import * as objectTypes from "../redux/objectTypes"
import {START} from "../redux/objectTypes";

const loopIndexed = R.addIndex(R.map);

export const searchX = (items, y) => {
  return R.findIndex(R.equals(8))(items);
};

export const searchTable = (table) => {
  return R.pipe(loopIndexed((xs, i) => R.pipe(
    R.map(R.equals(START.value)), 
    loopIndexed((x, j) => x && [j, i]), 
    R.reject(R.equals(false))
  )(xs)), R.unnest)(table);
};

export const searchForStartPosition = (table) => {
  console.log("searching for start position");
  console.log(searchTable(table))
};

export const nextStep = (table, position) => {
  console.log('>> next step >>');
  //console.log(position);
  console.log(searchForStartPosition(table))
};