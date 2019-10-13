import * as R from "ramda";
import * as objectTypes from "../redux/objectTypes"

const loopIndexed = R.addIndex(R.forEach);

const searchForStartPosition = (table) => {
  console.log("searching for start position");
  loopIndexed((val, y) => {
    loopIndexed((val, x) => {
      if(val === objectTypes.START.value) {
        console.log(`found: (x:${x}, y:${y})`);
      }
    }, val);
  }, table);
};

export const nextStep = (table, position) => {
  console.log('>> next step >>');
  console.log(position);
  if (position.x < 0 && position.y < 0) {
    searchForStartPosition(table)
  }
};