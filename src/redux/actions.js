import { PLOT, OBJECT_TABLE } from "./actionTypes";
import {START, END, OBSTACLE, FREE} from "./objectTypes";

export const plotStart = (x, y, objectType) => ({
  type: PLOT,
  payload: {
    x: x,
    y: y,
    type: objectType
  }
});

export const objectTable = (table) => ({
    type: OBJECT_TABLE,
    payload: {
        table: table
    }
});

