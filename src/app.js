import "./main.css"
import * as table from "./table.js"
import * as R from 'ramda'

// 0 free slot
// 1 obstacle
// 8 start
// 9 end
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

const update = () => {
    objects = objectsTester(objects);
    main(objects);
}


setInterval(update, 1000)