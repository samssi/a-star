import * as stepState from "../redux/stepState";
import * as hCalculator from "./hCalculator";
import * as posSearcher from "./startEndPositionSearcher";
import * as fghCalculator from "./fghCalculator";
import * as control from "./control";
import * as objectTypes from "../redux/objectTypes";

export const nextStep = (state) => {
  switch (state.stepState) {
    case stepState.INIT:
      return posSearcher.returnStartEndPositions(state);
    case stepState.H_COST:
      return hCalculator.calculateHCost(state);
    case stepState.CLEAN_H_COST:
      return fghCalculator.calculateFghCosts(state);
  }  
};
