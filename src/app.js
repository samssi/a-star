import "./main.css";
import * as renderer from './renderer.js';
import * as R from 'ramda';

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

console.log(renderer.find(renderer.START))

setInterval(() => renderer.update(objectsTester), 1000)