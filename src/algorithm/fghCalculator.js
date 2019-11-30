import * as R from "ramda";
import {mutateCell, surroundingCells} from "./control";
import {SURROUNDING} from "../redux/objectTypes";

const drawToTable = (table, cell) => {
    mutateCell(table, cell[0], cell[1], SURROUNDING);
};

const calculateFgh = (table, cells) => {
    R.forEach(cell => {
      drawToTable(table, cell);
    }, cells);
    return table;
};

export const calculateFghCosts = (state) => {
    const table = R.clone(state.table);
    const cells = surroundingCells(state.currentPosition);

    return {
        table: calculateFgh(table, cells)
    }
};