type MyObject = { [key: string]: any }

export const removeKeysFromObject = (
  obj: MyObject,
  keysToRemove: string[],
): MyObject => {
  const newObj: MyObject = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !keysToRemove.includes(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
