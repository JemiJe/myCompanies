import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { RoutePaths } from "./enums/enums"
import {
  SignInPage,
  SignUpPage,
  CompaniesPage,
  CompanyDetailPage,
  ProfilePage,
  NotFoundPage,
  UserListPage,
  CompanyListPage,
} from "./pages/pages"
import { Header, ProtectedRoute } from "./components/components"
import { ToastContainer } from "react-toastify"
import { useAppDispatch } from "./app/hooks"
import { getUserFromLocalStorage } from "./helpers/getUserFromLocalStorage"
import { useEffect } from "react"
import { setUser } from "./features/authSlice"

function App() {
  const dispatch = useAppDispatch()
  const user = getUserFromLocalStorage()

  useEffect(() => {
    dispatch(setUser(user))
  }, [])
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Public */}
          <Route
            path={RoutePaths.root}
            element={<Navigate to={RoutePaths.signIn} replace />}
          />
          <Route path={RoutePaths.signIn} element={<SignInPage />} />
          <Route path={RoutePaths.signUp} element={<SignUpPage />} />

          {/* User protected */}
          <Route element={<ProtectedRoute />}>
            <Route path={RoutePaths.companies} element={<CompaniesPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route
              path={RoutePaths.companyDetail}
              element={<CompanyDetailPage />}
            />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route
              path={RoutePaths.profile}
              element={<ProfilePage userProp={user.user} />}
            />
          </Route>

          {/* Admin protected */}
          <Route element={<ProtectedRoute isAdminProtected={true} />}>
            <Route path={RoutePaths.userList} element={<UserListPage />} />
          </Route>
          <Route element={<ProtectedRoute isAdminProtected={true} />}>
            <Route
              path={RoutePaths.companyList}
              element={<CompanyListPage />}
            />
          </Route>

          {/* Other */}
          <Route path={RoutePaths.root + "*"} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="colored" />
    </div>
  )
}

export default App
