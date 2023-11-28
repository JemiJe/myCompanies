import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import Avatar from "@mui/material/Avatar"
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
import { useUpdateUserByIdMutation } from "../../services/userApi"
import {
  isValidEmail,
  getUserFromLocalStorage,
  getOnlyChangedFields,
  removeEmptyKeyValues,
} from "../../helpers/helpers"
import { toast } from "react-toastify"
import { useAppDispatch } from "../../app/hooks"
import { setUser } from "../../features/authSlice"
import { Messages } from "../../enums/enums"
import style from "./style.module.css"

export const ProfilePage = () => {
  let { user, token } = getUserFromLocalStorage()
  const initialFormValue = { ...user, password: "" }

  const [formValue, setFormValue] = useState(initialFormValue)
  const [changedValues, setChangedValues] = useState({})
  const [updateUserById, { data, isSuccess, isLoading }] =
    useUpdateUserByIdMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const loadingScreen = useMemo(() => isLoading, [isLoading])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    const changedFields = getOnlyChangedFields(
      initialFormValue,
      removeEmptyKeyValues(formValue),
    )

    changedFields === null
      ? setChangedValues({})
      : setChangedValues(changedFields)
  }, [formValue])

  const handleProfileUpdate = () => {
    if (!isValidEmail(formValue.email)) {
      toast.error(Messages.invalidEmail)
    } else if (user && Object.keys(changedValues).length > 0) {
      updateUserById({
        id: user?.id,
        body: { ...changedValues },
      })
    }
  }

  const returnToCompaniesPage = () => navigate(RoutePaths.companies)

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ user: { ...user, ...data }, token }))
      toast.success(Messages.profileUpdateSuccess)
    }
  }, [isSuccess])

  if (user === null) {
    return <Navigate to={RoutePaths.signIn} />
  }

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
        <Avatar className={style.avatar} />
        <Typography component="h1" variant="h5">
          {initialFormValue.first_name + " Profile"}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="first-name"
                name="first_name"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
                onChange={handleChange}
                value={formValue.first_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="last-name"
                onChange={handleChange}
                value={formValue.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="nick_name"
                label="Nickname"
                name="nick_name"
                autoComplete="nick-name"
                onChange={handleChange}
                value={formValue.nick_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="position"
                name="position"
                required
                fullWidth
                id="position"
                label="Position"
                autoFocus
                onChange={handleChange}
                value={formValue.position}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={formValue.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                onChange={handleChange}
                value={formValue.password}
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
                onClick={handleProfileUpdate}
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
