import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { LoadingScreen } from "../../components/components"
import { RoutePaths } from "../../enums/RoutePaths"
import {
  useGetUserCompaniesMutation,
  useCreateCompanyMutation,
} from "../../services/companiesApi"
import { hasEmptyKeyValue } from "../../helpers/helpers"
import { toast } from "react-toastify"
import { useAppDispatch } from "../../app/hooks"
import { Messages } from "../../enums/enums"
import { setCompanies } from "../../features/companiesSlice"
import { CompanyCreateReqDto } from "../../dto/dto"

const initialFormValue: CompanyCreateReqDto = {
  name: "",
  address: "",
  service_of_activity: "",
  number_of_employees: "",
  description: "",
  type: "",
}

export const CompanyCreatePage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [formValue, setFormValue] = useState(initialFormValue)

  const [createCompany, { isSuccess: createdCompaniesSuccess, isLoading }] =
    useCreateCompanyMutation()
  const [
    getUserCompanies,
    { data: updatedCompaniesData, isSuccess: updatedCompaniesSuccess },
  ] = useGetUserCompaniesMutation()

  const loadingScreen = useMemo(() => isLoading, [isLoading])
  const submitIsDisabled = useMemo(
    () => hasEmptyKeyValue(formValue),
    [formValue],
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    })
  }

  const handleCompanyCreate = () => {
    if (!hasEmptyKeyValue(formValue)) {
      createCompany(formValue)
    }
  }

  const returnToCompaniesPage = () => navigate(RoutePaths.companies)

  useEffect(() => {
    if (createdCompaniesSuccess) {
      toast.success(Messages.companyCreatedSuccess)
      getUserCompanies({})
    }
  }, [createdCompaniesSuccess])

  useEffect(() => {
    if (updatedCompaniesSuccess) {
      dispatch(setCompanies(updatedCompaniesData))
    }
    if (updatedCompaniesSuccess && createdCompaniesSuccess) {
      returnToCompaniesPage()
    }
  }, [updatedCompaniesSuccess])

  return (
    <Container component="main" maxWidth="xs">
      <LoadingScreen open={loadingScreen} />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add new company
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                autoFocus
                id="name"
                label="Name"
                onChange={handleChange}
                value={formValue.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="address"
                name="address"
                required
                fullWidth
                id="address"
                label="address"
                onChange={handleChange}
                value={formValue.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="service_of_activity"
                name="service_of_activity"
                required
                fullWidth
                id="service_of_activity"
                label="Service of activity"
                onChange={handleChange}
                value={formValue.service_of_activity}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                autoComplete="number_of_employees"
                name="number_of_employees"
                required
                fullWidth
                id="number_of_employees"
                label="Number of employees"
                onChange={handleChange}
                value={formValue.number_of_employees}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={2}
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                onChange={handleChange}
                value={formValue.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="type"
                label="Type"
                name="type"
                autoComplete="type"
                onChange={handleChange}
                value={formValue.type}
              />
            </Grid>
            <Grid item>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                onClick={returnToCompaniesPage}
              >
                Back to companies
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleCompanyCreate}
                disabled={submitIsDisabled}
              >
                Add new company
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
