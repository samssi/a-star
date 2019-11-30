import * as R from "ramda";
import * as control from "./control"
import * as direction from "./direction";
import * as stepState from "../redux/stepState";

const X = "x";
const Y = "y";

const transformXMoves = (value) => {
    if (value > 0) {
        return control.moveObject(direction.E, value);
    }
    else if (value < 0) {
        return control.moveObject(direction.W, Math.abs(value));
    }
    else {
        return control.moveObject(direction.NONE, value);
    }
};

const transformYMoves = (value) => {
    if (value > 0) {
        return control.moveObject(direction.S, value);
    }
    else if (value < 0) {
        return control.moveObject(direction.N, Math.abs(value));
    }
    else {
        return control.moveObject(direction.NONE, value);
    }
};

const calculateDistanceBetween = (startPosition, endPosition) => {
    return distanceObject(endPosition[0]- startPosition[0], endPosition[1] - startPosition[1]);
};

const distanceObject = (x, y) => {
    return { x: x, y: y }
};

const movesObject = (x, y, diagonal) => {
    return { x: x, y: y, diagonal: diagonal }
};

const transformIntoMoves = (distance) => {
    const xMove = transformXMoves(distance.x);
    const yMove = transformYMoves(distance.y);
    const moves = transformIntoDiagonalIncludedMoves(xMove, yMove);

    return movesObject(
        moves.x,
        moves.y,
        moves.diagonal
    );
};

const returnLowerValue = (x, y) => {
    if (y < x) return y;
    return x;
};

const resolveDiagonalDirection = (xDirection, yDirection) => {
    return (xDirection === direction.NONE || yDirection === direction.NONE) ?
        direction.NONE :  yDirection + xDirection;
};

const transformIntoDiagonalIncludedMoves = (xMove, yMove) => {
    const diagonalDirection = resolveDiagonalDirection(xMove.direction, yMove.direction);
    const diagonalDistance = returnLowerValue(xMove.distance, yMove.distance);

    const newXMove = control.moveObject(xMove.direction, xMove.distance - diagonalDistance);
    const newYMove = control.moveObject(yMove.direction, yMove.distance - diagonalDistance);
    const diagonalMove = control.moveObject(diagonalDirection, diagonalDistance);

    return movesObject(newXMove, newYMove, diagonalMove)
};

export const hCostObject = (table, totalPathCost) => {
    return {
        table,
        totalPathCost
    };
};

export const hCost = (table, startPosition, endPosition) => {
    const distance = calculateDistanceBetween(startPosition, endPosition);

    const moves = transformIntoMoves(distance);

    const diagonalPath = control.executeMoves(moves.diagonal, startPosition);
    const xPath = control.executeMoves(moves.x, diagonalPath.position);
    const yPath = control.executeMoves(moves.y, xPath.position);

    const totalPathCost = diagonalPath.cost + xPath.cost + yPath.cost;

    const diagonalTable = control.updateMovesToTable(table, diagonalPath.path);
    const xTable = control.updateMovesToTable(diagonalTable, xPath.path);
    const pathIncludedTable = control.updateMovesToTable(xTable, yPath.path);

    return hCostObject(pathIncludedTable, totalPathCost);
};

export const calculateHCost = (state) => {
    const hCostResult = hCost(state.table, state.startPosition, state.endPosition);

    return {
        table: hCostResult.table,
        stepState: stepState.CLEAN_H_COST,
        stepInfo: `Calculated H cost of ${hCostResult.totalPathCost} for position: ${state.currentPosition}`
    }
};
