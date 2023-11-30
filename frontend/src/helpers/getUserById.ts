import { UsersAllRespDto, UserFromGetAllDto } from "../dto/dto"

export const getUserById = (
  id: number | string | undefined,
  users: UsersAllRespDto | null,
): UserFromGetAllDto | null => {
  if (users === null) return null
  const user = users.find((user) => user.id === Number(id))
  return user ? user : null
}
