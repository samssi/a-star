import { SELECT_CELL, EDIT_TYPE, TOGGLE_MODE } from "./actionTypes";
import * as modes from "./modes"

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

export const toggleMode = (currentMode) => ({
  type: TOGGLE_MODE,
  payload: {
    mode: currentMode === modes.EDIT ? modes.STEP : modes.EDIT
  }
});

