import { useState, useEffect, useMemo } from "react"
import { useNavigate, Navigate } from "react-router-dom"
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
import { useLoginUserMutation } from "../../services/authApi"
import {
  getUserFromLocalStorage,
  hasEmptyKeyValue,
} from "../../helpers/helpers"
import { toast } from "react-toastify"
import { UserSignInReqDto } from "../../dto/dto"
import { useAppDispatch } from "../../app/hooks"
import { setUser } from "../../features/authSlice"
import { ErrorMessages } from "../../enums/enums"
import style from "./style.module.css"

const initialState: UserSignInReqDto = {
  email: "",
  password: "",
}

export const SignInPage = () => {
  const { user } = getUserFromLocalStorage()
  const [formValue, setFormValue] = useState(initialState)
  const [loginUser, { data, isSuccess, isLoading }] = useLoginUserMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const loadingScreen = useMemo(() => isLoading, [isLoading])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    })
  }

  const handleSignIn = () => {
    if (hasEmptyKeyValue(formValue)) {
      toast.error(ErrorMessages.emptyAuthFields)
    } else {
      loginUser({ ...formValue })
    }
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data))
      navigate(RoutePaths.companies)
    }
  }, [isSuccess])

  if (user !== null) {
    return <Navigate to={RoutePaths.companies} />
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
        <Avatar
          className={style.avatar}
          alt="signin image"
          src="/signin.png"
          variant="square"
        />

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value={formValue.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={formValue.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleSignIn()}
          >
            Sign In
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to={RoutePaths.signUp}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
