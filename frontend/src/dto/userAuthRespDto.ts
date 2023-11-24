import { UserRespDto } from "./userRespDto"
export type UserAuthRespDto = {
  user: UserRespDto | null
  token: string | null
}
