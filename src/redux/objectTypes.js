import * as R from 'ramda';

export const FREE = { value: 0, description: "Free", color: "#F0F0F0"};
export const OBSTACLE = { value: 1, description: "Obstacle", color: "grey" };
export const PATH = { value: 2, description: "Path", color: "orange" };
export const RESET = { value: 3, description: "Reset" };
export const START = { value: 8, description: "Start", color: "lightgreen" };
export const END = { value: 9, description: "End", color: "lightblue" };

export const OPEN = (gCost = -1, hCost = -1, fCost = -1) => { return { value: 7, description: "Open", color: "#E69383", gCost: gCost, hCost: hCost, fCost: fCost }};
export const CLOSED = (gCost = -1, hCost = -1, fCost = -1) => { return { value: 6, description: "Closed", color: "#DA93E6", gCost: gCost, hCost: hCost, fCost: fCost }};

export const allTypes = [FREE, OBSTACLE, START, END, PATH, RESET];
