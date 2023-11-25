import React from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Avatar from "@mui/material/Avatar"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout } from "../../features/authSlice"
import { RoutePaths } from "../../enums/RoutePaths"
import { selectAuth } from "../../features/authSlice"

export const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(selectAuth)

  const handleLogout = () => {
    handleClose()
    dispatch(logout())
    navigate(RoutePaths.signIn)
  }

  const handleProfilePath = () => {
    handleClose()
    navigate(RoutePaths.profile)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (user !== null) setAnchorEl(event.currentTarget)
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
        <Avatar></Avatar>
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
