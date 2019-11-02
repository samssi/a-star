import {START, END, FREE, OBSTACLE, PATH} from "../redux/objectTypes";
import * as R from "ramda";
import * as Immutable from "immutable";
import * as direction from "./direction";

const mapIndexed = R.addIndex(R.map);

export const moveObject = (direction, distance) => {
    return {
      direction: direction,
      distance: distance
    };
}

export const searchTable = (table, objectType) => {
  return R.pipe(mapIndexed((xItems, y) => R.pipe(
    R.map(R.equals(objectType.value)), 
    mapIndexed((yItems, x) => yItems && [x, y]), 
    R.reject(R.equals(false))
  )(xItems)), R.unnest)(table);
};

export const translateArrayToXY = (arrayElement) => {
  return { x: arrayElement[1], y: arrayElement[0] }
}

export const updateMovesToTable = (table, path) => {
  const newTable = R.clone(table);
  R.forEach((item) => {
    const xy = translateArrayToXY(item)
    const element = newTable[xy.x][xy.y];
    if(element === FREE.value) {
      return newTable[xy.x][xy.y] = PATH.value;
    }
  }, path);
  
  return newTable;
}

const NE = (position) => {
    const nAddedPosition = N(position);
    return E(nAddedPosition);
}

const NW = (position) => {
    const nAddedPosition = N(position);
    return W(nAddedPosition);
}

const SE = (position) => {
    const sAddedPosition = S(position);
    return E(sAddedPosition);
}

const SW = (position) => {
    const sAddedPosition = S(position);
    return W(sAddedPosition);
}

const N = (position) => {
    const newPosition = R.clone(position);
    newPosition[1] = newPosition[1] - 1;
    return newPosition;
}

const S = (position) => {
    const newPosition = R.clone(position);
    newPosition[1] = newPosition[1] + 1;
    return newPosition;
}

const E = (position) => {
    const newPosition = R.clone(position);
    newPosition[0] = newPosition[0] + 1;
    return newPosition;
} 

const W = (position) => {
    const newPosition = R.clone(position);
    newPosition[0] = newPosition[0] - 1;
    return newPosition;
} 

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
        return W(position)
    default:
      return position;
  }
}

export const pathObject = (cost, path, position) => {
    return { cost: cost, path: path, position: position }
}

export const executeMoves = (moves, position) => {
  const startPosition = R.clone(position);
  const path = Immutable.List();
  
  const untilMovesExecuted = (cost, position, direction, movesLeft, path) => {
    if (movesLeft <= 0) {
      return pathObject(cost, path, position)
    }
    const newPosition = move(direction, position);
    const newPath = path.push(newPosition);
    // TODO: cost increment should be 15 if direction is SW, NE, NW or SE
    return untilMovesExecuted(cost + 10, newPosition, direction, movesLeft-1, newPath)
  }
  const pathCost = untilMovesExecuted(0, startPosition, moves.direction, moves.distance, path);
  
  return pathCost;
}