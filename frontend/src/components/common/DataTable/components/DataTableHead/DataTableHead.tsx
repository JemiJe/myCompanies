import React from "react"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { type TableDataProperties } from "../../types/types"
import { DATA_KEYS_TO_HIDE } from "../../constants/constants"
import { prepareTableData } from "../../../../../helpers/helpers"
import styles from "./style.module.css"

export const DataTableHead: React.FC<TableDataProperties> = ({ tableData }) => {
  const formatedTableData = () => {
    return prepareTableData(tableData, DATA_KEYS_TO_HIDE)
  }

  const headNames = Object.keys(formatedTableData()[0])

  return (
    <TableHead>
      <TableRow>
        {headNames.map((name, index) => (
          <TableCell classes={styles} key={name} align="center">
            {name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
