import * as R from "ramda";
import {mutateCell, surroundingCells} from "./control";
import {SURROUNDING} from "../redux/objectTypes";
import {hPath} from "./hCalculator";
import {FGH_COST_LOWEST} from "../redux/stepState";

const drawToTable = (table, cell, endPosition) => {
    const hPathCost = hPath(table, cell, endPosition).totalPathCost;
    mutateCell(table, cell[0], cell[1], SURROUNDING(-1, hPathCost, -1));
};

const calculateFgh = (table, cells, endPosition) => {
    R.forEach(cell => {
      drawToTable(table, cell, endPosition);
    }, cells);
    return table;
};

export const calculateFghCosts = (state) => {
    const table = R.clone(state.table);
    const cells = surroundingCells(state.currentPosition);

    return {
        table: calculateFgh(table, cells, state.endPosition),
        stepInfo: "Calculated FGH for next neighboring cells. Results visible",
        stepState: FGH_COST_LOWEST
    }
};