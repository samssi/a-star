import * as table from "./table.js";
import * as R from 'ramda';

export const FREE = 0;
export const OBSTACLE = 1;
export const START = 8;
export const END = 9;

let objects = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 8, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 9, 0],
    [0, 0, 0, 0, 0, 0]
];

const rootElement = document.getElementById("root");
let tableElement = table.renderTable(objects, rootElement);

const main = (objects) => {
    rootElement.removeChild(tableElement);
    tableElement = table.renderTable(objects, rootElement);
}

export const find = (object) => {
    return [].concat(...objects.map((row, i) => row.map((item, j) => item === object ? [
        [i, j]
      ] : [])
      .filter(coord => coord.length)
     )
    )
}

export const update = (func) => {
    objects = func(objects);
    main(objects);
}