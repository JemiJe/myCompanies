import React from "react"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { type TableDataItem, type TableDataProperties } from "../../types/types"
import { DATA_KEYS_TO_HIDE } from "../../constants/constants"
import { prepareTableData } from "../../../../../helpers/helpers"

export const DataTableBody: React.FC<TableDataProperties> = ({ tableData }) => {
  const getItemFirstKey = (item: TableDataItem) => {
    return Object.keys(item)[0]
  }

  const formatedTableData = () => {
    return prepareTableData(tableData, DATA_KEYS_TO_HIDE)
  }

  return (
    <TableBody>
      {formatedTableData().map((row, index) => (
        <TableRow
          key={getItemFirstKey(row) + "" + index}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          {Object.values(row).map((value, index) => (
            <TableCell key={value + "" + index} align="center">
              {value}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}
