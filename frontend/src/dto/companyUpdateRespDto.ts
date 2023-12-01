import { CompanyByIdRespDto } from "./dto"

export type CompanyUpdateRespDto = Omit<CompanyByIdRespDto, "user">
