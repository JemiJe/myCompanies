import React, { useState } from "react"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { type TableDataProperties, type SortType } from "../../types/types"
import { DATA_KEYS_TO_HIDE } from "../../constants/constants"
import { prepareTableData } from "../../../../../helpers/helpers"
import styles from "./style.module.css"

// TODO: ability to pass formated head names and with woking sort
export const DataTableHead: React.FC<TableDataProperties> = ({
  tableData,
  sortFunc,
}) => {
  const [sortMode, setSortMode] = useState("asc" as SortType)
  const formatedTableData = () => {
    return prepareTableData(tableData, DATA_KEYS_TO_HIDE)
  }

  const headNames = Object.keys(formatedTableData()[0])

  return (
    <TableHead>
      <TableRow>
        {headNames.map((name, index) => (
          <TableCell
            classes={styles}
            key={name}
            onClick={() => {
              if (sortFunc) {
                setSortMode(sortMode === "asc" ? "desc" : "asc")
                sortFunc(name, sortMode, [...tableData])
              }
            }}
            align="center"
          >
            {name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
