import * as R from "ramda";
import {mutateCell, surroundingCells} from "./control";
import {SURROUNDING} from "../redux/objectTypes";
import {hPath} from "./hCalculator";
import {FGH_COST_LOWEST} from "../redux/stepState";

const drawToTable = (table, cell, startPosition, endPosition) => {
    const hPathCost = hPath(table, cell, endPosition).totalPathCost;
    // TODO: using heuristic calculation is temp. Heuristics doesn't calculate around objects but direct path through them!
    const gPathCost = hPath(table, cell, startPosition).totalPathCost;
    mutateCell(table, cell[0], cell[1], SURROUNDING(gPathCost, hPathCost, -1));
};

const calculateFgh = (table, cells, startPosition, endPosition) => {
    R.forEach(cell => {
      drawToTable(table, cell, startPosition, endPosition);
    }, cells);
    return table;
};

export const calculateFghCosts = (state) => {
    const table = R.clone(state.table);
    const cells = surroundingCells(table, state.currentPosition);
    console.log(cells);

    return {
        table: calculateFgh(table, cells, state.startPosition, state.endPosition),
        stepInfo: "Calculated FGH for next neighboring cells. Results visible",
        stepState: FGH_COST_LOWEST
    }
};