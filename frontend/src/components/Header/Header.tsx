import { ProfileMenu } from "../components"
import style from "./style.module.css"

export const Header = () => {
  return (
    <header className={style.header}>
      <p className={style.logo}>myCompanies</p>
      <ProfileMenu />
    </header>
  )
}
