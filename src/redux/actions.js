import {SELECT_CELL, EDIT_TYPE, TOGGLE_MODE, NEXT_STEP} from "./actionTypes";
import * as modes from "./modes"

export const plotCell = (x, y) => ({
  type: SELECT_CELL,
  payload: {
    x: x,
    y: y
  }
});

export const editType = (object) => ({
  type: EDIT_TYPE,
  payload: {
    object: object
  }
});

export const toggleMode = (currentMode) => ({
  type: TOGGLE_MODE,
  payload: {
    mode: currentMode
  }
});

export const nextStep = () => ({
  type: NEXT_STEP
});
