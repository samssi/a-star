import * as R from 'ramda';

export const FREE = { value: 0, description: "Free", color: "#F8F8F8"};
export const OBSTACLE = { value: 1, description: "Obstacle", color: "grey" };
export const START = { value: 8, description: "Start", color: "lightgreen" };
export const END = { value: 9, description: "End", color: "lightblue" };

export const allTypes = [FREE, OBSTACLE, START, END]

export const findByValue = (value) => {
    return R.find(R.propEq('value', value))(allTypes)
}