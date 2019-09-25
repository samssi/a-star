import "./main.css"
import * as table from "./table.js"
import * as R from 'ramda'

const FREE = 0;
const OBSTACLE = 1;
const START = 8;
const END = 9;

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

const objectsTester = (objects) => {
    const result = R.map(row => {
        return R.map(  element => {
                    if (element == 0) {
                        return 1;
                    }
                    else if (element == 1) {
                        return 0;
                    }
                    else {
                        return element;
                    }
            }, row);
    }, objects);
    return result;
}

const find = (object) => {
    return [].concat(...objects.map((row, i) => row.map((item, j) => item === object ? [
        [i, j]
      ] : [])
      .filter(coord => coord.length)
     )
    )
}

console.log(find(START))

const update = () => {
    objects = objectsTester(objects);
    main(objects);
}


setInterval(update, 100000)