import { PLOT_CELL, OBJECT_TABLE } from "./actionTypes";
import {START, END, OBSTACLE, FREE} from "./objectTypes";

export const plotCell = (x, y, objectType) => ({
  type: PLOT_CELL,
  payload: {
    x: x,
    y: y,
    objectType: objectType
  }
});

export const objectTable = (table) => ({
    type: OBJECT_TABLE,
    payload: {
        table: table
    }
});

