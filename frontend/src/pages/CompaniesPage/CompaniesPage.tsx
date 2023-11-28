import { useEffect, useMemo } from "react"
import { useGetUserCompaniesMutation } from "../../services/companiesApi"
import { useAppSelector } from "../../app/hooks"
import { selectCompanies } from "../../features/companiesSlice"
import { useAppDispatch } from "../../app/hooks"
import { setCompanies } from "../../features/companiesSlice"
import { LoadingScreen } from "../../components/components"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { DataTable } from "../../components/common/common"
import { prepareTableData } from "../../helpers/helpers"

export const CompaniesPage = () => {
  const dispatch = useAppDispatch()
  const { companies } = useAppSelector(selectCompanies)
  const [getUserCompanies, { data, isSuccess, isLoading }] =
    useGetUserCompaniesMutation()

  const loadingScreen = useMemo(() => isLoading, [isLoading])

  const addNewCompany = () => {}

  useEffect(() => {
    if (!companies && !data) {
      getUserCompanies({})
    }
    if (isSuccess) {
      dispatch(setCompanies(data))
    }
  }, [isSuccess])

  return (
    <Container component="main">
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

      {companies !== null && (
        <DataTable
          tableData={prepareTableData(companies, ["user", "userId"])}
        />
      )}
    </Container>
  )
}
