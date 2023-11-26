import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { RoutePaths, ErrorMessages, Roles } from "../../enums/enums"
import { toast } from "react-toastify"
import { getUserFromLocalStorage } from "../../helpers/helpers"

type Properties = {
  isAdminProtected?: boolean
}

export const ProtectedRoute: React.FC<Properties> = ({
  isAdminProtected = false,
}) => {
  const { user } = getUserFromLocalStorage()

  if (user === null) {
    toast.warn(ErrorMessages.notAuthorized)
    return <Navigate to={RoutePaths.signIn} />
  }
  if (isAdminProtected && user && user.role !== Roles.ADMIN) {
    toast.warn(ErrorMessages.onlyAdminAccess)
    return <Navigate to={RoutePaths.companies} />
  }

  return <Outlet />
}
