import { rights, groups } from "./mook";
import { getNextId } from "./utils";

export function getRights() {
  return new Promise(resolve => {
    setTimeout(() => resolve([...rights]), 200);
  });
}

export function putRight(right) {
  return new Promise(resolve => {
    setTimeout(() => {
      right.id = getNextId(rights);
      rights.push(right);
      resolve(right);
    }, 200);
  });
}

export function deleteRight(rightId) {
  return new Promise(resolve => {
    setTimeout(() => {
      let foundIndex = rights.findIndex(r => r.id === rightId);
      if (foundIndex > -1) {
        rights.splice(foundIndex, 1);
        for (const group of groups) {
          group.rights = group.rights.filter(id => id !== rightId);
        }
      }
      resolve();
    }, 200);
  });
}
