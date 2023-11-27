import { CompanyByIdRespDto } from "../../dto/dto"

type CompaniesStoreObject = {
  companies: CompanyByIdRespDto[] | null
}

export const companiesSliceInitialState: CompaniesStoreObject = {
  companies: null,
}
