import { useState, useEffect, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { LoadingScreen } from "../../components/components"
import { Navigate } from "react-router-dom"
import { RoutePaths } from "../../enums/RoutePaths"
import {
  useUpdateCompanyByIdMutation,
  useGetUserCompaniesMutation,
  useDeleteCompanyByIdMutation,
  useGetAllCompaniesMutation,
} from "../../services/companiesApi"
import {
  getOnlyChangedFields,
  removeEmptyKeyValues,
  getCompanyById,
  formatCompanyCreateValues,
} from "../../helpers/helpers"
import { toast } from "react-toastify"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Messages } from "../../enums/enums"
import {
  selectCompanies,
  setCompanies,
  setUsersCompanies,
} from "../../features/companiesSlice"
import { FormattedCompany } from "../../helpers/getCompanyById"
import style from "./style.module.css"

export const CompanyDetailPage = () => {
  const { companies, usersCompanies } = useAppSelector(selectCompanies)
  const { id: companyId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const getCompany = () => {
    const fromUserCompanies = getCompanyById(
      Number(companyId),
      companies,
    ) as FormattedCompany
    const fromUsersAllCompanies = getCompanyById(
      Number(companyId),
      usersCompanies,
    ) as FormattedCompany
    return fromUserCompanies ?? fromUsersAllCompanies
  }

  const isAnyCompaniesData = getCompany()

  const [initialFormValue, seIinitialFormValue] = useState({ ...getCompany() })
  const [formValue, setFormValue] = useState(initialFormValue)
  const [changedValues, setChangedValues] = useState({})

  const [updateCompanyById, { data, isSuccess, isLoading }] =
    useUpdateCompanyByIdMutation()
  const [
    getUserCompanies,
    { data: updatedCompaniesData, isSuccess: updatedCompaniesSuccess },
  ] = useGetUserCompaniesMutation()
  const [
    getAllCompanies,
    {
      data: updatedUsersCompaniesData,
      isSuccess: updatedUsersCompaniesSuccess,
    },
  ] = useGetAllCompaniesMutation()
  const [deleteCompanyById, { isSuccess: deletedCompanySuccess }] =
    useDeleteCompanyByIdMutation()

  const loadingScreen = useMemo(() => isLoading, [isLoading])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    })
  }

  // TODO: disable save button after update
  useEffect(() => {
    const changedFields = getOnlyChangedFields(
      initialFormValue,
      removeEmptyKeyValues(formValue),
    )

    changedFields === null
      ? setChangedValues({})
      : setChangedValues(changedFields)
  }, [formValue, initialFormValue])

  const handleCompanyUpdate = () => {
    if (
      (companies || usersCompanies) &&
      Object.keys(changedValues).length > 0
    ) {
      updateCompanyById({
        id: companyId,
        body: { ...formatCompanyCreateValues(changedValues) },
      })
    }
  }

  const handleCompanyDelete = () => {
    deleteCompanyById(companyId)
  }

  const returnToPrevPage = () => navigate(-1)

  useEffect(() => {
    if (isSuccess) {
      toast.success(Messages.companyUpdateSuccess)
      seIinitialFormValue(data)
      getUserCompanies({})
      if (usersCompanies) getAllCompanies({})
    }
  }, [isSuccess])

  useEffect(() => {
    if (deletedCompanySuccess) {
      toast.success(Messages.companyDeleteSuccess)
      // TODO: need to be optimize, check user id with company userId
      if (usersCompanies) {
        getAllCompanies({})
        getUserCompanies({})
      } else {
        getUserCompanies({})
      }
    }
  }, [deletedCompanySuccess])

  // update when user redacted company
  useEffect(() => {
    if (updatedCompaniesSuccess) {
      dispatch(setCompanies(updatedCompaniesData))
    }
    if (updatedCompaniesSuccess && deletedCompanySuccess) {
      returnToPrevPage()
    }
  }, [updatedCompaniesSuccess])

  // update when admin redacted company
  useEffect(() => {
    if (updatedUsersCompaniesSuccess) {
      dispatch(setUsersCompanies(updatedUsersCompaniesData))
    }
    if (updatedUsersCompaniesSuccess && deletedCompanySuccess) {
      returnToPrevPage()
    }
  }, [updatedUsersCompaniesSuccess])

  if (isAnyCompaniesData === null) {
    return <Navigate to={RoutePaths.companies} />
  }

  return (
    <Container component="main" maxWidth="xs" className={style.main}>
      <LoadingScreen open={loadingScreen} />
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          <span className={style.highlight}>{initialFormValue.name}</span>
          {" company details"}
        </Typography>
        <Typography component="span" variant="caption">
          {"updated: " + new Date(initialFormValue.updatedAt).toLocaleString()}
        </Typography>
        {usersCompanies && (
          <Typography component="span" variant="caption">
            {"user id: " + initialFormValue.userId}
          </Typography>
        )}

        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
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
                onClick={returnToPrevPage}
              >
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                onClick={handleCompanyDelete}
              >
                Delete
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleCompanyUpdate}
                disabled={Object.keys(changedValues).length < 1}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
