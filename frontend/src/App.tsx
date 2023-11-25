import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { RoutePaths } from "./enums/enums"
import {
  SignInPage,
  SignUpPage,
  CompaniesPage,
  CompanyDetailPage,
  ProfilePage,
  NotFoundPage,
} from "./pages/pages"
import { Header } from "./components/components"
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
          <Route
            path={RoutePaths.root}
            element={<Navigate to={RoutePaths.signIn} replace />}
          />
          <Route path={RoutePaths.signIn} element={<SignInPage />} />
          <Route path={RoutePaths.signUp} element={<SignUpPage />} />
          <Route path={RoutePaths.companies} element={<CompaniesPage />} />
          <Route
            path={RoutePaths.companyDetail}
            element={<CompanyDetailPage />}
          />
          <Route path={RoutePaths.profile} element={<ProfilePage />} />
          <Route path={RoutePaths.root + "*"} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="colored" />
    </div>
  )
}

export default App
