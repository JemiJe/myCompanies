import { CompanyByIdRespDto, CompaniesGetAllRespDto } from "../../dto/dto"

type CompaniesInitialType = {
  companies: CompanyByIdRespDto[] | null
  usersCompanies: CompaniesGetAllRespDto | null
}

export const companiesSliceInitialState: CompaniesInitialType = {
  companies: null,
  usersCompanies: null,
}
