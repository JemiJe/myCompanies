import { CompanyByIdRespDto } from "../dto/companyByIdRespDto"
import { removeKeysFromObject } from "./removeKeysFromObject"

export type FormattedCompany = Omit<CompanyByIdRespDto, "user">

export const getCompanyById = (
  id: number,
  companies: CompanyByIdRespDto[] | null,
): { [key: string]: string | number } | FormattedCompany | null => {
  if (companies === null) return null
  const company = companies.find((company) => company.id === id)
  return company ? removeKeysFromObject(company, ["user"]) : null
}
