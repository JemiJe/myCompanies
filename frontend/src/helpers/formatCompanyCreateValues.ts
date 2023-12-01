import { CompanyCreateReqDto, CompanyUpdateReqDto } from "../dto/dto"

export const formatCompanyCreateValues = (
  values: CompanyCreateReqDto | CompanyUpdateReqDto,
): CompanyCreateReqDto | CompanyUpdateReqDto => {
  if (values?.number_of_employees) {
    const newValues = { ...values }
    const fixedValue = Number(values.number_of_employees)
    newValues.number_of_employees = fixedValue
    return newValues
  }
  return values
}
