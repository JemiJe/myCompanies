export type TableDataItem = { [key: string]: string | number | null }

export type TableDataProperties = {
  tableData: TableDataItem[]
  routePathOnRowClick?: string
  itemIdKeyName?: string
}
