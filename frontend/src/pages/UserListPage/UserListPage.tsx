import { useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useGetAllUsersMutation } from "../../services/userApi"
import { useAppSelector } from "../../app/hooks"
import { selectUsers } from "../../features/usersSlice"
import { useAppDispatch } from "../../app/hooks"
import { setAllUsers } from "../../features/usersSlice"
import { LoadingScreen } from "../../components/components"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { DataTable } from "../../components/common/common"
import { RoutePaths } from "../../enums/enums"
import style from "./style.module.css"

export const UserListPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { usersAll } = useAppSelector(selectUsers)
  const [getAllUsers, { data, isSuccess, isLoading }] = useGetAllUsersMutation()

  const loadingScreen = useMemo(() => isLoading, [isLoading])

  useEffect(() => {
    if (!usersAll && !data) {
      getAllUsers({})
    }
    if (isSuccess) {
      dispatch(setAllUsers(data))
    }
  }, [isSuccess])

  return (
    <Container component="main" className={style.main}>
      <LoadingScreen open={loadingScreen} />
      <CssBaseline />
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography component="h1" variant="h5" sx={{ margin: "0.5em 0" }}>
            Users list
          </Typography>
        </Grid>
      </Grid>

      {usersAll !== null ? (
        <DataTable
          tableData={usersAll}
          routePathOnRowClick={RoutePaths.userDetail}
          itemIdKeyName="id"
        />
      ) : (
        <Typography component="p" variant="body1" sx={{ margin: "0.5em 0" }}>
          There are no users yet.
        </Typography>
      )}
    </Container>
  )
}
