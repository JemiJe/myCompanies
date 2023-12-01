type Data = {
  [key: string]: string | number | null | undefined
}

export const hasEmptyKeyValue = (data: Data) => {
  let isEmpty = false
  for (const value of Object.values(data)) {
    if (value === "") isEmpty = true
  }
  return isEmpty
}
