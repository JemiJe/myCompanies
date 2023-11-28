export type TableDataItem = { [key: string]: string | number }

export type TableDataProperties = {
  tableData: TableDataItem[]
  routePathOnRowClick?: string
  itemIdKeyName?: string
}
