import { CompanyByIdRespDto } from "./dto"

export type CompanyUpdateReqDto = Partial<Omit<CompanyByIdRespDto, "user">>
