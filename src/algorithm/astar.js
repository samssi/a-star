import * as R from "ramda";
import * as objectTypes from "../redux/objectTypes"
import {START} from "../redux/objectTypes";

const loopIndexed = R.addIndex(R.map);

const matchObjectType = (n) => n === objectTypes.START.value;

export const searchX = (items, y) => {
  return R.map((val) => {
      x = R.findIndex(R.equals(objectTypes.START.value), item);
      console.log(x)
      return { x: x, y: y } },
      items);

  /*filterIndexed((matchObjectType, x) => {
    console.log(`found: (x:${x}, y:${y})`);
    return { x: x, y: y }
  }, y);*/
};

export const searchTable = (table) => {
  loopIndexed((val, y) => {
    console.log(searchX(val, y));
  }, table);
};

export const searchForStartPosition = (table) => {
  console.log("searching for start position");
  console.log(searchTable(table))
};

export const nextStep = (table, position) => {
  console.log('>> next step >>');
  console.log(position);
  console.log(searchForStartPosition(table))
};