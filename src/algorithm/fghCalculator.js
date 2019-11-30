import * as R from "ramda";
import * as control from "./control"
import * as direction from "./direction";
import * as Immutable from "immutable";
import * as stepState from "../redux/stepState";
import {PATH} from "../redux/objectTypes";
import {H_COST} from "../redux/stepState";



export const calculateFghCosts = (state) => {
    return {
        ...state,
        table: control.freeTypeFromTable(state, PATH),
        stepState: H_COST,
        stepInfo: "Cleaning H cost from table. Proceeding to G cost. (not implemented)"
      };
}