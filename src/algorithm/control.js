import {START, END, FREE, OBSTACLE, PATH, CLOSED, CURRENT} from "../redux/objectTypes";
import * as R from "ramda";
import * as direction from "./direction";

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
    mutateCell(table, 0, 4, OBSTACLE);
    mutateCell(table, 3,8, END);
    return table;
};

export const findClosedNode = (x, y, closedNodes) => {
    return R.find(R.and(R.propEq('x', x), R.propEq('y', y)), closedNodes);
};

export const appendClosedNode = (closedNodes, object) => {
    return R.append({...object,
            object: CLOSED(object.object.gCost, object.object.hCost, object.object.fCost)},
        closedNodes);
};

export const putClosedNode = (closedNodes, object) => {
    const oldNode = findClosedNode(object.x, object.y, closedNodes);
    return R.isNil(oldNode)
        ? appendClosedNode(closedNodes, object)
        : closedNodes;
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
    const newTable = R.clone(table);
    R.forEach(node => mutateCell(newTable, node.x, node.y, node.object), nodes);
    return newTable;
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

export const surroundingCells = (table, closedNodes, position) => {
    const cells = [
        controlledMove(table, closedNodes, direction.N, position),
        controlledMove(table, closedNodes, direction.NW, position),
        controlledMove(table, closedNodes, direction.NE, position),
        controlledMove(table, closedNodes, direction.W, position),
        controlledMove(table, closedNodes, direction.E, position),
        controlledMove(table, closedNodes, direction.SE, position),
        controlledMove(table, closedNodes, direction.SW, position),
        controlledMove(table, closedNodes, direction.S, position)];
    return R.reject(R.isNil, cells);
};

const outOfBoundsRule = (position) => (position[0] < 0 || position [1] < 0);
const occupyRule = (table, position) => R.includes(table[position[1]][position[0]].value, [OBSTACLE.value, START.value, END.value]);
const closedRule = (closedNodes, position) => {

};

const withPickUpRules = (table, closedNodes, position) => {
    if (outOfBoundsRule(position) || occupyRule(table, position) || closedRule(closedNodes, position)) {
        return undefined;
    }
    return position;
};

export const updateCurrentPositionToTable = (table, nodeObject) => {
    const newTable = R.clone(table);
    mutateCell(newTable, nodeObject.x, nodeObject.y, CURRENT(nodeObject.object.gCost, nodeObject.object.hCost, nodeObject.object.fCost));
    return newTable;
};

export const controlledMove = (table, closedNodes, moveDirection, position) => {
    switch (moveDirection) {
        case direction.N:
            return withPickUpRules(table, closedNodes, N(position));
        case direction.NE:
            return withPickUpRules(table, closedNodes, NE(position));
        case direction.NW:
            return withPickUpRules(table, closedNodes, NW(position));
        case direction.S:
            return withPickUpRules(table, closedNodes, S(position));
        case direction.SW:
            return withPickUpRules(table, closedNodes, SW(position));
        case direction.SE:
            return withPickUpRules(table, closedNodes, SE(position));
        case direction.E:
            return withPickUpRules(table, closedNodes, E(position));
        case direction.W:
            return withPickUpRules(table, closedNodes, W(position));
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
    const path = [];

    const untilMovesExecuted = (cost, position, direction, movesLeft, path) => {
        if (movesLeft <= 0) {
            return pathObject(cost, path, position)
        }
        const newPosition = move(direction, position);
        path.push(newPosition);
        return untilMovesExecuted(addCost(cost, direction), newPosition, direction, movesLeft-1, R.clone(path))
    };
    return untilMovesExecuted(0, startPosition, moves.direction, moves.distance, R.clone(path));
};
