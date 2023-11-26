type Data = {
  [key: string]: string | number | null | undefined
}

export const removeEmptyKeyValues = (data: Data): Data => {
  let onlyFilledData: Data = {}
  for (const key in data) {
    if (data[key] && data[key] !== "") onlyFilledData[key] = data[key]
  }
  return onlyFilledData
}
