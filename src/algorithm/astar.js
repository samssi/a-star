import * as stepState from "../redux/stepState";
import * as hCalculator from "./hCalculator";
import * as posSearcher from "./startEndPositionSearcher";

export const nextStep = (state) => {
  switch (state.stepState) {
    case stepState.INIT:
      return posSearcher.returnStartEndPositions(state);
    case stepState.H_COST:
      return hCalculator.calculateHCost(state)
  }  
};