import React from "react"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import { type TableDataItem, type TableDataProperties } from "../../types/types"
import { DATA_KEYS_TO_HIDE } from "../../constants/constants"
import { prepareTableData } from "../../../../../helpers/helpers"
import { useNavigate } from "react-router-dom"
import styles from "./styles.module.css"

export const DataTableBody: React.FC<TableDataProperties> = ({
  tableData,
  routePathOnRowClick,
  itemIdKeyName,
}) => {
  const navigate = useNavigate()
  const getItemFirstKey = (item: TableDataItem) => {
    return Object.keys(item)[0]
  }

  const formatedTableData = () => {
    return prepareTableData(tableData, DATA_KEYS_TO_HIDE)
  }

  const getItemIndex = (tableDataItemIndex: number | undefined) => {
    if (itemIdKeyName && tableDataItemIndex !== undefined)
      return tableData[tableDataItemIndex][itemIdKeyName]
  }

  const handleClick = (id: any) => {
    if (routePathOnRowClick) navigate(routePathOnRowClick + `/${id}`)
  }

  return (
    <TableBody>
      {formatedTableData().map((row, tableDataIndex) => (
        <TableRow
          className={styles.row}
          key={getItemFirstKey(row) + "" + tableDataIndex}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          {Object.values(row).map((value, index) => (
            <TableCell
              key={value + "" + index}
              align="center"
              onClick={
                routePathOnRowClick && itemIdKeyName
                  ? () => handleClick(getItemIndex(tableDataIndex))
                  : () => {}
              }
            >
              {value}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}
