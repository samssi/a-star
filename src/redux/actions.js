import { SELECT_CELL, EDIT_TYPE } from "./actionTypes";
import {START, END, OBSTACLE, FREE} from "./objectTypes";

export const plotCell = (x, y, objectType) => ({
  type: SELECT_CELL,
  payload: {
    x: x,
    y: y,
    objectType: objectType
  }
});

export const editType = (objectValue) => ({
  type: EDIT_TYPE,
  payload: {
    objectValue: objectValue
  }
});

