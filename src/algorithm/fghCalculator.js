import * as R from "ramda";
import * as control from "./control"
import * as direction from "./direction";
import * as Immutable from "immutable";
import * as stepState from "../redux/stepState";
import {PATH} from "../redux/objectTypes";
import {H_COST} from "../redux/stepState";



export const calculateFghCosts = (state) => {
    console.log(state.currentPosition)
}