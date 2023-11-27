import { CompanyByIdRespDto } from "../../dto/dto"

type CompaniesInitialType = {
  companies: CompanyByIdRespDto[] | null
}

export const companiesSliceInitialState: CompaniesInitialType = {
  companies: null,
}
