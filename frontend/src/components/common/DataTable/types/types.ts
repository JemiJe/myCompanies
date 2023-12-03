export type TableDataItem = { [key: string]: string | number | null }

export type IdToHighlight = {
  id: number | null | undefined
  idKeyName: string
  styleClassName: string
}

export type SortFunc = (
  columnName: string,
  type: SortType,
  passedTableData: TableDataItem[],
) => void

export type TableDataProperties = {
  tableData: TableDataItem[]
  routePathOnRowClick?: string
  itemIdKeyName?: string
  sortFunc?: SortFunc
  idsToHighlight?: IdToHighlight[]
}

export type SortType = "asc" | "desc"

export type SortMode = {
  columnName: string
  sortType: SortType
}
