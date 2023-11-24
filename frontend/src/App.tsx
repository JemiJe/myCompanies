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

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
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
    </div>
  )
}

export default App
