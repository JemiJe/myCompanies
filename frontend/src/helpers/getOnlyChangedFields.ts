type ObjectValues = string | null | number | undefined

export const getOnlyChangedFields = (
  initial: Record<string, ObjectValues> | null,
  changed: Record<string, ObjectValues> | null,
): Record<string, ObjectValues> | null => {
  if (initial === null) return null
  const diffObject: Record<string, ObjectValues> = {}

  for (const key in initial) {
    if (
      initial !== null &&
      changed !== null &&
      initial.hasOwnProperty(key) &&
      changed.hasOwnProperty(key)
    ) {
      if (initial[key] !== changed[key]) {
        diffObject[key] = changed[key]
      }
    }
  }

  if (Object.keys(diffObject).length < 1) return null
  return diffObject
}
