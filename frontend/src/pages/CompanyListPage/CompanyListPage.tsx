import { useEffect, useMemo } from "react"
import { useGetAllCompaniesMutation } from "../../services/companiesApi"
import { useAppSelector } from "../../app/hooks"
import { selectCompanies } from "../../features/companiesSlice"
import { useAppDispatch } from "../../app/hooks"
import { setUsersCompanies } from "../../features/companiesSlice"
import { LoadingScreen } from "../../components/components"
import RefreshIcon from "@mui/icons-material/Refresh"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { DataTable } from "../../components/common/common"
import { RoutePaths } from "../../enums/enums"
import style from "./style.module.css"

export const CompanyListPage = () => {
  const dispatch = useAppDispatch()
  let { usersCompanies } = useAppSelector(selectCompanies)
  const [getAllCompanies, { data, isSuccess, isLoading }] =
    useGetAllCompaniesMutation()

  const loadingScreen = useMemo(() => isLoading, [isLoading])

  const updateCompaniesList = () => {
    getAllCompanies({})
  }

  useEffect(() => {
    if (!usersCompanies && !data) {
      getAllCompanies({})
    }
    if (isSuccess) {
      dispatch(setUsersCompanies(data))
    }
  }, [isSuccess])

  return (
    <Container component="main" className={style.main}>
      <LoadingScreen open={loadingScreen} />
      <CssBaseline />
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item display="flex" alignItems="center" gap={1}>
          <Typography component="h1" variant="h5" sx={{ margin: "0.5em 0" }}>
            Users companies list
          </Typography>
          <Button type="button" variant="text" onClick={updateCompaniesList}>
            <RefreshIcon />
          </Button>
        </Grid>
      </Grid>

      {usersCompanies !== null ? (
        <DataTable
          tableData={usersCompanies}
          routePathOnRowClick={RoutePaths.companyDetail}
          itemIdKeyName="id"
        />
      ) : (
        <Typography component="p" variant="body1" sx={{ margin: "0.5em 0" }}>
          There are no users companies yet.
        </Typography>
      )}
    </Container>
  )
}
