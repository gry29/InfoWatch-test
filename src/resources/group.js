import { groups } from "./mook";
import { getNextId } from "./utils";

export function getGroups() {
  return new Promise(resolve => {
    setTimeout(() => resolve([...groups]), 300);
  });
}

export function getGroup(groupId) {
  return new Promise(resolve => {
    const group = groups.find(group => group.id === groupId);
    setTimeout(() => resolve(group), 300);
  });
}

export function updateGroup(group) {
  return new Promise(resolve => {
    let index = groups.findIndex(gr => gr.id === group.id);
    if (index > -1) {
      groups[index] = group;
    } else {
      groups.push(group); // если добавить новую группу
    }
    setTimeout(() => resolve(), 300);
  });
}

export function putGroup(group) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (group.id === undefined) {
        group.id = getNextId(groups);
      }
      groups.push(group);
      resolve(group);
    }, 200);
  });
}

export function deleteGroup(groupId) {
  return new Promise(resolve => {
    let foundIndex = groups.findIndex(g => g.id === groupId);
    if (foundIndex > -1) {
      groups.splice(foundIndex, 1);
    }
    setTimeout(() => resolve(), 300);
  });
}
