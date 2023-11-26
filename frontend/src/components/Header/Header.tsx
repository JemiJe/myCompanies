import Avatar from "@mui/material/Avatar"
import { ProfileMenu } from "../components"
import { useAppSelector } from "../../app/hooks"
import { selectAuth } from "../../features/authSlice"
import style from "./style.module.css"

export const Header = () => {
  const { user } = useAppSelector(selectAuth)

  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Avatar alt="logo" src="/logo.png" variant="square" />
        <p className={style.logoImg}>myCompanies</p>
      </div>
      {user !== null && <ProfileMenu />}
    </header>
  )
}
