export const hasEmptyKeyValue = (data: { [key: string]: string }) => {
  let isEmpty = false
  for (const value of Object.values(data)) {
    if (value === "") isEmpty = true
  }
  return isEmpty
}
