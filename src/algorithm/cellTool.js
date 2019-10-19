import {END, START} from "../redux/objectTypes";
import {searchForStartPosition} from "./astar";

const selection = (table, objectType) => {
  switch (objectType) {
    case START.value:
      console.log("start");
      console.log(searchForStartPosition(table))
      return;
    case END.value:
      console.log("end");
      return;
    default:
      console.log("default");
      return;
  }
};

export const selectCell = (state, x, y) => {
  const newTable = [...state.table];
  newTable[y][x] = state.editObjectType;
  selection(newTable, state.editObjectType);
  return {
    ...state,
    table: newTable
  };
};