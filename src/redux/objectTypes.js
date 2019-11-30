import * as R from 'ramda';

export const FREE = { value: 0, description: "Free", color: "#F0F0F0"};
export const OBSTACLE = { value: 1, description: "Obstacle", color: "grey" };
export const PATH = { value: 2, description: "Path", color: "orange" };
export const RESET = { value: 3, description: "Reset" };
export const SURROUNDING = { value: 7, description: "Surrounding", color: "#E69383" };
export const START = { value: 8, description: "Start", color: "lightgreen" };
export const END = { value: 9, description: "End", color: "lightblue" };


export const allTypes = [FREE, OBSTACLE, SURROUNDING, START, END, PATH, RESET];

export const findByValue = (value) => {
    return R.find(R.propEq('value', value))(allTypes)
};
