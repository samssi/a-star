import * as R from "ramda";
import {mutateCell, surroundingCells} from "./control";
import {SURROUNDING} from "../redux/objectTypes";

const calculateFgh = (table, cells) => {
    R.forEach(cell => mutateCell(table, cell[0], cell[1], SURROUNDING), cells);
    return table;
};

export const calculateFghCosts = (state) => {
    const table = R.clone(state.table);
    const cells = surroundingCells(state.currentPosition);

    return {
        table: calculateFgh(table, cells)
    }
};