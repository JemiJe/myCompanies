import { useEffect, useMemo } from "react"
import { useGetUserCompaniesMutation } from "../../services/companiesApi"
import { useAppSelector } from "../../app/hooks"
import { selectCompanies } from "../../features/companiesSlice"
import { useAppDispatch } from "../../app/hooks"
import { setCompanies } from "../../features/companiesSlice"
import { LoadingScreen } from "../../components/components"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { DataTable } from "../../components/common/common"

export const CompaniesPage = () => {
  const dispatch = useAppDispatch()
  const { companies } = useAppSelector(selectCompanies)
  const [getUserCompanies, { data, isSuccess, isLoading }] =
    useGetUserCompaniesMutation()

  const loadingScreen = useMemo(() => isLoading, [isLoading])

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
      <Typography component="h1" variant="h5" sx={{ marginTop: "1em" }}>
        Your companies list
      </Typography>
      <DataTable data={["1"]} />
    </Container>
  )
}
