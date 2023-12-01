import React, { useState } from "react"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import Paper from "@mui/material/Paper"
import {
  type TableDataProperties,
  type SortType,
  type TableDataItem,
} from "./types/types"
import { DataTableHead, DataTableBody } from "./components/components"

// table only for number | string values
export const DataTable: React.FC<TableDataProperties> = ({
  tableData,
  routePathOnRowClick,
  itemIdKeyName,
}) => {
  if (!tableData || tableData.length < 1) {
    tableData = [{ emptyTable: "emptyTable" }]
  }

  const [sortedTableData, setSortedTableData] = useState(tableData)

  const sortTable = (
    columnName: string,
    type: SortType | undefined,
    passedTableData: TableDataItem[],
  ): void => {
    const isValueTypeNumber = typeof passedTableData[0][columnName] === "number"
    const sortedTable = passedTableData.sort((tableItemA, tableItemB) => {
      const itemValueA = tableItemA[columnName]
      const itemValueB = tableItemB[columnName]
      if (isValueTypeNumber) {
        return type === "asc"
          ? Number(itemValueA) - Number(itemValueB)
          : Number(itemValueB) - Number(itemValueA)
      } else {
        return type === "asc"
          ? (itemValueA + "").charCodeAt(0) - (itemValueB + "").charCodeAt(0)
          : (itemValueB + "").charCodeAt(0) - (itemValueA + "").charCodeAt(0)
      }
    })

    setSortedTableData(sortedTable)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <DataTableHead tableData={tableData} sortFunc={sortTable} />

        <DataTableBody
          tableData={sortedTableData}
          routePathOnRowClick={routePathOnRowClick}
          itemIdKeyName={itemIdKeyName}
        />
      </Table>
    </TableContainer>
  )
}
