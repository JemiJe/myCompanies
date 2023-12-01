// dublicated in case if users/all data
// will be changed regardless of userRespDto
export type UserFromGetAllDto = {
  id: number | string | null
  first_name: string | null
  last_name: string | null
  nick_name: string | null
  email: string | null
  role: string | null
  position: string | null
  description: string | null
  createdAt: string | null
  updatedAt: string | null
}

export type UsersAllRespDto = UserFromGetAllDto[]
