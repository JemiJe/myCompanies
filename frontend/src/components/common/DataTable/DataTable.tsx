import React from "react"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import Paper from "@mui/material/Paper"
import { type TableDataProperties } from "./types/types"
import { DataTableHead, DataTableBody } from "./components/components"
// import styles from "./styles.module.css"

export const DataTable: React.FC<TableDataProperties> = ({
  tableData,
  routePathOnRowClick,
  itemIdKeyName,
}) => {
  if (!tableData || tableData.length < 1) {
    tableData = [{ emptyTable: "emptyTable" }]
  }

  return (
    <TableContainer
      component={Paper}
      // classes={styles}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <DataTableHead tableData={tableData} />
        <DataTableBody
          tableData={tableData}
          routePathOnRowClick={routePathOnRowClick}
          itemIdKeyName={itemIdKeyName}
        />
      </Table>
    </TableContainer>
  )
}
