import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { selectAuth } from "../../features/authSlice"
import { RoutePaths, Roles } from "../../enums/enums"
import style from "./style.module.css"

export const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useAppSelector(selectAuth)
  const borderStyle = { borderLeft: 1, color: "#1976d242" }

  if (!user) return <></>

  return (
    <div className={style.navbar}>
      <Button
        type="button"
        variant="text"
        onClick={() => navigate(RoutePaths.companies)}
      >
        My companies
      </Button>
      {user?.role === Roles.ADMIN && (
        <>
          <Box sx={borderStyle}>
            <Button
              type="button"
              variant="text"
              onClick={() => navigate(RoutePaths.companyList)}
            >
              Users companies
            </Button>
          </Box>

          <Box sx={borderStyle}>
            <Button
              type="button"
              variant="text"
              onClick={() => navigate(RoutePaths.userList)}
            >
              Users
            </Button>
          </Box>
        </>
      )}
    </div>
  )
}
