import * as stepState from "../redux/stepState";
import * as hCalculator from "./hCalculator";
import * as posSearcher from "./startEndPositionSearcher";
import * as fghCalculator from "./fghCalculator";
import * as control from "./control";
import * as objectTypes from "../redux/objectTypes";
import {PATH} from "../redux/objectTypes";
import {H_COST} from "../redux/stepState";
import {FGH_COST} from "../redux/stepState";
import {findLowestCost} from "./lowestCost";

export const nextStep = (state) => {
  switch (state.stepState) {
    case stepState.INIT:
      return posSearcher.returnStartEndPositions(state);
    case stepState.H_COST:
      return hCalculator.calculateHCost(state);
    case stepState.CLEAN_H_COST:
      return {
        ...state,
        table: control.freeTypeFromTable(state, PATH),
        stepState: stepState.FGH_COST_NEXT,
        stepInfo: "Cleaning H cost from table. Proceeding to G cost."
      };
    case stepState.FGH_COST_NEXT:
      return fghCalculator.calculateFghCosts(state);
    case stepState.FGH_COST_LOWEST:
      return findLowestCost(state);
  }
};
