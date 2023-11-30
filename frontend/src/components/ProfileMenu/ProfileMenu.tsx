import React from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Avatar from "@mui/material/Avatar"
import Badge from "@mui/material/Badge"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout } from "../../features/authSlice"
import { clearCompanies } from "../../features/companiesSlice"
import { clearUsers } from "../../features/usersSlice"
import { RoutePaths, Roles } from "../../enums/enums"
import { selectAuth } from "../../features/authSlice"
import style from "./style.module.css"

export const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(selectAuth)

  const handleLogout = () => {
    handleClose()
    dispatch(logout())
    dispatch(clearCompanies())
    dispatch(clearUsers())
    navigate(RoutePaths.signIn)
  }

  const handleProfilePath = () => {
    handleClose()
    navigate(RoutePaths.profile)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {user?.role === Roles.ADMIN ? (
          <Badge
            badgeContent={Roles.ADMIN}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            color="primary"
            overlap="circular"
            classes={style}
          >
            <Avatar></Avatar>
          </Badge>
        ) : (
          <Avatar></Avatar>
        )}
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleProfilePath}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}
