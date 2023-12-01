import { CompanyCreateReqDto } from "../dto/companyCreateReqDto"
export const formatCompanyCreateValues = (
  values: CompanyCreateReqDto,
): CompanyCreateReqDto => {
  const newValues = { ...values }
  newValues.number_of_employees = Number(values.number_of_employees)
  return newValues
}
