export const findById = (resources, id) => {
  return resources.find((r) => r.id === id);
};
