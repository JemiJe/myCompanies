import { UsersAllRespDto } from "../../dto/dto"

type UsersInitialType = {
  usersAll: UsersAllRespDto | null
}

export const usersInitialState: UsersInitialType = {
  usersAll: null,
}
