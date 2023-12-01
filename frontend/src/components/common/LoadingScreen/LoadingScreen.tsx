import CircularProgress from "@mui/material/CircularProgress"
import Backdrop, { type BackdropProps } from "@mui/material/Backdrop"

export const LoadingScreen: React.FC<BackdropProps> = ({ ...props }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      {...props}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
