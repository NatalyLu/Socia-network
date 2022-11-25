export const updateObjectInArray = (items, prop, objProp, newObjProps) => {
  return (items.map((item) => {
    if (item[objProp] === prop) {
      return { ...item, ...newObjProps };
    }
    return item;
  }))
};

