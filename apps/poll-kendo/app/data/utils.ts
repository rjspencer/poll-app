const hasId = (obj: object): obj is { id: string } => {
  return Object.keys(obj).includes("id");
};

export const idToDb = <T extends object>(data: T) => {
  if (hasId(data)) {
    const { id, ...mainData } = data;
    if (id) {
      return { ...mainData, id: parseInt(id) };
    }
    return mainData;
  }
  return {
    ...data,
    id: undefined,
  };
};
