import Avatar from "@mui/material/Avatar"
import { ProfileMenu } from "../components"
import style from "./style.module.css"

export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Avatar alt="logo" src="/logo.png" variant="square" />
        <p className={style.logoImg}>myCompanies</p>
      </div>
      <ProfileMenu />
    </header>
  )
}
