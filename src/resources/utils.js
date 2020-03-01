export function getNextId(entities) {
  let maxId = entities.reduce(
    (acc, entity) => (acc > entity.id ? acc : entity.id),
    0
  );

  return ++maxId;
}
