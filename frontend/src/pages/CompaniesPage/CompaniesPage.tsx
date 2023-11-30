import { useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useGetUserCompaniesMutation } from "../../services/companiesApi"
import { useAppSelector } from "../../app/hooks"
import { selectCompanies } from "../../features/companiesSlice"
import { useAppDispatch } from "../../app/hooks"
import { setCompanies } from "../../features/companiesSlice"
import { LoadingScreen } from "../../components/components"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { DataTable } from "../../components/common/common"
import { prepareTableData } from "../../helpers/helpers"
import { RoutePaths } from "../../enums/enums"
import style from "./style.module.css"

export const CompaniesPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { companies } = useAppSelector(selectCompanies)
  const [getUserCompanies, { data, isSuccess, isLoading }] =
    useGetUserCompaniesMutation()

  const loadingScreen = useMemo(() => isLoading, [isLoading])

  const addNewCompany = () => navigate(RoutePaths.companyCreate)

  useEffect(() => {
    if (!companies && !data) {
      getUserCompanies({})
    }
    if (isSuccess) {
      dispatch(setCompanies(data))
    }
  }, [isSuccess])

  return (
    <Container component="main" className={style.main}>
      <LoadingScreen open={loadingScreen} />
      <CssBaseline />
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography component="h1" variant="h5" sx={{ margin: "0.5em 0" }}>
            Your companies list
          </Typography>
        </Grid>
        <Grid item>
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={addNewCompany}
          >
            Add new company
          </Button>
        </Grid>
      </Grid>

      {companies !== null ? (
        <DataTable
          tableData={prepareTableData(companies, ["user", "userId"])}
          routePathOnRowClick={RoutePaths.companyDetail}
          itemIdKeyName="id"
        />
      ) : (
        <Typography component="p" variant="body1" sx={{ margin: "0.5em 0" }}>
          You dont have companies yet.
        </Typography>
      )}
    </Container>
  )
}
