import * as stepState from "../redux/stepState";
import * as hCalculator from "./hCalculator";
import * as posSearcher from "./startEndPositionSearcher";
import * as fghCalculator from "./fghCalculator";
import * as control from "./control";
import {PATH} from "../redux/objectTypes";
import {NodeObject, CLOSED} from "../redux/objectTypes";
import {findLowestCost} from "./lowestCost";

export const nextStep = (state) => {
  switch (state.stepState) {
    case stepState.INIT:
      return posSearcher.returnStartEndPositions(state);
    case stepState.H_COST:
      return hCalculator.calculateHCost(state);
    case stepState.CLEAN_H_COST:
      const startNode = NodeObject(state.startPosition[0], state.startPosition[1], CLOSED(0, 0, 0));
      return {
        ...state,
        table: control.freeTypeFromTable(state, PATH),
        openNodes: [],
        closedNodes: [startNode],
        stepState: stepState.FGH_COST_NEXT,
        stepInfo: "Cleaning H cost from table. Proceeding to FGH cost calculation."
      };
    case stepState.FGH_COST_NEXT:
      return fghCalculator.calculateFghCosts(state);
    case stepState.FGH_COST_LOWEST:
      return findLowestCost(state);
    case stepState.COMPLETE:
      return { ...state, stepInfo: "Complete!" };
    case stepState.NO_PATH:
      return { ...state, stepInfo: "No path found!" };
  }
};
