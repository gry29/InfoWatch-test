import { users, groups } from "./mook";
import { getNextId } from "./utils";

export function getUsers() {
  return new Promise(resolve => {
    setTimeout(() => resolve([...users]), 200);
  });
}

export function putUser(user) {
  return new Promise(resolve => {
    setTimeout(() => {
      user.id = getNextId(users);
      users.push(user);
      resolve(user);
    }, 200);
  });
}

export function deleteUser(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      let foundIndex = users.findIndex(u => u.id === userId);
      if (foundIndex > -1) {
        users.splice(foundIndex, 1);
        for (const group of groups) {
          group.users = group.users.filter(id => id !== userId);
        }
      }
      resolve();
    }, 200);
  });
}
