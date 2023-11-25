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
import { Link } from "react-router-dom"
import { RoutePaths } from "../../enums/RoutePaths"
import { useSignUpUserMutation } from "../../services/authApi"
import { hasEmptyKeyValue } from "../../helpers/hasEmptyKeyValue"
import { toast } from "react-toastify"
import { UserSignUpReqDto } from "../../dto/dto"
import { useAppDispatch } from "../../app/hooks"
import { setUser } from "../../features/authSlice"
import { ErrorMessages } from "../../enums/enums"
import style from "./style.module.css"

const initialState: UserSignUpReqDto = {
  first_name: "",
  last_name: "",
  nick_name: "",
  email: "",
  password: "",
  description: "",
  position: "",
}

export const SignUpPage = () => {
  const [formValue, setFormValue] = useState(initialState)
  const [signUpUser, { data, isSuccess, isLoading, isError, error }] =
    useSignUpUserMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const loadingScreen = useMemo(() => isLoading, [isLoading])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    })
  }

  const handleSignUp = () => {
    if (hasEmptyKeyValue(formValue)) {
      toast.error(ErrorMessages.emptyAuthFields)
    } else {
      signUpUser({ ...formValue })
    }
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data))
      navigate(RoutePaths.companies)
    }
  }, [isSuccess])

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
        <Avatar
          className={style.avatar}
          alt="signup image"
          src="/signup.png"
          variant="square"
        />
        <Typography component="h1" variant="h5">
          Sign up
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to={RoutePaths.signIn}>
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
