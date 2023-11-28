import { removeKeysFromObject } from "./helpers"

export const prepareTableData = (
  data: { [key: string]: any }[],
  keysToExclude: string[],
) => {
  const newCompanies = []
  for (const item of data) {
    const newCompany = removeKeysFromObject(item, keysToExclude)
    newCompanies.push(newCompany)
  }
  return newCompanies
}
