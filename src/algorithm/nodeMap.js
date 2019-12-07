import {Map} from "immutable";

export const node = (fPathCost, gPathCost, hPathCost) => { return  { fPathCost, gPathCost, hPathCost}};

export const emptyNodes = () => Map();

export const addNode = (map, key, node) => {
  return map.set(key, node);
};