import {START, END, FREE, OBSTACLE, PATH} from "../redux/objectTypes";
import * as R from "ramda";
import * as Immutable from "immutable";
import * as direction from "./direction";

const mapIndexed = R.addIndex(R.map);

export const emptyTable = (width, height) => R.times(() => R.repeat(FREE, width), height);

export const moveObject = (direction, distance) => {
    return {
        direction: direction,
        distance: distance
    };
};

export const searchTable = (table, objectType) => {
    return R.pipe(mapIndexed((xItems, y) => R.pipe(
        R.map(R.equals(objectType)),
        mapIndexed((yItems, x) => yItems && [x, y]),
        R.reject(R.equals(false))
    )(xItems)), R.unnest)(table);
};

export const translateArrayToXY = (arrayElement) => {
    return { x: arrayElement[1], y: arrayElement[0] }
};

export const updateMovesToTable = (table, path) => {
    const newTable = R.clone(table);
    R.forEach((item) => {
        const xy = translateArrayToXY(item);
        const element = newTable[xy.x][xy.y];
        if(element.value === FREE.value) {
            return newTable[xy.x][xy.y] = PATH;
        }
    }, path);

    return newTable;
};

const NE = (position) => {
    const nAddedPosition = N(position);
    return E(nAddedPosition);
};

const NW = (position) => {
    const nAddedPosition = N(position);
    return W(nAddedPosition);
};

const SE = (position) => {
    const sAddedPosition = S(position);
    return E(sAddedPosition);
};

const SW = (position) => {
    const sAddedPosition = S(position);
    return W(sAddedPosition);
};

const N = (position) => {
    const newPosition = R.clone(position);
    newPosition[1] = newPosition[1] - 1;
    return newPosition;
};

const S = (position) => {
    const newPosition = R.clone(position);
    newPosition[1] = newPosition[1] + 1;
    return newPosition;
};

const E = (position) => {
    const newPosition = R.clone(position);
    newPosition[0] = newPosition[0] + 1;
    return newPosition;
};

const W = (position) => {
    const newPosition = R.clone(position);
    newPosition[0] = newPosition[0] - 1;
    return newPosition;
};

export const surroundingCells = (position) => {
    const cells = [
        move(direction.N, position),
        move(direction.NW, position),
        move(direction.NE, position),
        move(direction.W, position),
        move(direction.E, position),
        move(direction.SE, position),
        move(direction.SW, position),
        move(direction.S, position)
    ];
    return R.reject(R.isNil, cells);
};

export const withPickUpRules = (position) => {
    return (position[0] < 0 || position [1] < 0) ? undefined : position;
};

export const move = (moveDirection, position) => {
    switch (moveDirection) {
        case direction.N:
            return withPickUpRules(N(position));
        case direction.NE:
            return withPickUpRules(NE(position));
        case direction.NW:
            return withPickUpRules(NW(position));
        case direction.S:
            return withPickUpRules(S(position));
        case direction.SW:
            return withPickUpRules(SW(position));
        case direction.SE:
            return withPickUpRules(SE(position));
        case direction.E:
            return withPickUpRules(E(position));
        case direction.W:
            return withPickUpRules(W(position));
        default:
            return undefined;
    }
};

export const pathObject = (cost, path, position) => {
    return { cost: cost, path: path, position: position }
};

export const addCost = (previousCost, currentDirection) => {
    if (direction.DIAGONAL_DIRECTIONS.includes(currentDirection)) return previousCost + 15;
    return previousCost + 10;
};

export const mutateCell = (table, x, y, object) => {
    table[y][x] = object;
    return table;
};

export const freeTypeFromTable = (state, objectTypeToRemove) => {
    const newTable = R.clone(state.table);
    const objectLocations = searchTable(newTable, objectTypeToRemove);
    objectLocations.forEach(element => mutateCell(newTable, element[0], element[1], FREE));
    return newTable;
};

export const executeMoves = (moves, position) => {
    const startPosition = R.clone(position);
    const path = Immutable.List();

    const untilMovesExecuted = (cost, position, direction, movesLeft, path) => {
        if (movesLeft <= 0) {
            return pathObject(cost, path, position)
        }
        const newPosition = move(direction, position);
        const newPath = path.push(newPosition);
        return untilMovesExecuted(addCost(cost, direction), newPosition, direction, movesLeft-1, newPath)
    };
    return untilMovesExecuted(0, startPosition, moves.direction, moves.distance, path);
};
