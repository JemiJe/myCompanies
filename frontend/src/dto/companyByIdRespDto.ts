import { UserRespDto } from "./dto"

export type CompanyByIdRespDto = {
  id: number
  name: string
  address: string
  service_of_activity: string
  number_of_employees: number
  description: string
  type: string
  userId: number
  createdAt: string
  updatedAt: string
  user: User | UserRespDto
}

type User = {
  id: number
  first_name: string
  last_name: string
  nick_name: string
  email: string
  role: string
  position: string
  description: string
  createdAt: string
  updatedAt: string
}
