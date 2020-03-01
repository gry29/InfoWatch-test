import { groups } from "./mook";

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
