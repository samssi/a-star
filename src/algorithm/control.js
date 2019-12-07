import {START, END, FREE, OBSTACLE, PATH} from "../redux/objectTypes";
import * as R from "ramda";
import * as Immutable from "immutable";
import * as direction from "./direction";
import {List} from "immutable";

const mapIndexed = R.addIndex(R.map);

export const emptyTable = (width, height) => R.times(() => R.repeat(FREE, width), height);

export const mutateCell = (table, x, y, object) => {
    table[y][x] = object;
    return table;
};

export const startUpTable = () => {
    const table = emptyTable(12, 9);
    mutateCell(table, 0,3, START);
    mutateCell(table, 1, 3, OBSTACLE);
    mutateCell(table, 1, 4, OBSTACLE);
    mutateCell(table, 0, 4, OBSTACLE);
    mutateCell(table, 3,8, END);
    return table;
};

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

export const updateNodesToTable = (table, nodes) => {
    const updateTableUntilOpenNodesExhausted = (table, nodes) => {
        if(nodes.isEmpty()) {
            return table;
        }
        const key = nodes.keySeq().last();
        mutateCell(table, key[0], key[1], nodes.get(key));
        return updateTableUntilOpenNodesExhausted(R.clone(table), nodes.remove(key));
    };
    return updateTableUntilOpenNodesExhausted(R.clone(table), nodes);
};

export const updateMovesToTable = (table, path) => {
    const newTable = R.clone(table);
    R.forEach((item) => {
        const element = newTable[item[1]][item[0]];
        if(element.value === FREE.value) {
            return newTable[item[1]][item[0]] = PATH;
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

// TODO: make functional
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

export const surroundingCells = (table, position) => {
    const cells = List([
        controlledMove(table, direction.N, position),
        controlledMove(table, direction.NW, position),
        controlledMove(table, direction.NE, position),
        controlledMove(table, direction.W, position),
        controlledMove(table, direction.E, position),
        controlledMove(table, direction.SE, position),
        controlledMove(table, direction.SW, position),
        controlledMove(table, direction.S, position)]
    );
    return R.reject(R.isNil, cells);
};

const outOfBoundsRule = (position) => (position[0] < 0 || position [1] < 0) ? undefined : position;

const obstacleRule = (table, position) => R.equals(table[position[1]][position[0]], OBSTACLE) ? undefined : position;

const withPickUpRules = (table, position) => {
    const outOfBoundFilterPosition = outOfBoundsRule(position);
    if (R.not(R.isNil(outOfBoundFilterPosition))) {
        return obstacleRule(table, outOfBoundFilterPosition);
    }
    return outOfBoundFilterPosition;
};

export const controlledMove = (table, moveDirection, position) => {
    switch (moveDirection) {
        case direction.N:
            return withPickUpRules(table, N(position));
        case direction.NE:
            return withPickUpRules(table, NE(position));
        case direction.NW:
            return withPickUpRules(table, NW(position));
        case direction.S:
            return withPickUpRules(table, S(position));
        case direction.SW:
            return withPickUpRules(table, SW(position));
        case direction.SE:
            return withPickUpRules(table, SE(position));
        case direction.E:
            return withPickUpRules(table, E(position));
        case direction.W:
            return withPickUpRules(table, W(position));
        default:
            return undefined;
    }
};

export const move = (moveDirection, position) => {
    switch (moveDirection) {
        case direction.N:
            return N(position);
        case direction.NE:
            return NE(position);
        case direction.NW:
            return NW(position);
        case direction.S:
            return S(position);
        case direction.SW:
            return SW(position);
        case direction.SE:
            return SE(position);
        case direction.E:
            return E(position);
        case direction.W:
            return W(position);
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

export const freeTypeFromTable = (state, objectTypeToRemove) => {
    const newTable = R.clone(state.table);
    const objectLocations = searchTable(newTable, objectTypeToRemove);
    objectLocations.forEach(element => mutateCell(newTable, element[0], element[1], FREE));
    return newTable;
};

export const executeMoves = (moves, position) => {
    const startPosition = R.clone(position);
    const path = List();

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
