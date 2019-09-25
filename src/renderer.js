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

export const westCell = (fromObject) => {
    const firstObject = find(fromObject)[0]
    const x = firstObject[0] - 1;
    const y = firstObject[1];
    return [x, y];
}

export const find = (searchedObject) => {
    return objects.reduce((acc, row, i) => [ 
        ...acc, 
        ...row.reduce((acc, item, j) => 
          item === searchedObject ? [...acc, [j, i]] : acc, [])]
      , []);
}

export const update = (func) => {
    objects = func(objects);
    main(objects);
}