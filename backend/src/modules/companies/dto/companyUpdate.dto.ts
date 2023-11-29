import { IsOptional } from 'class-validator';

export class CompanyUpdateDto {
  @IsOptional()
  readonly name: string;

  @IsOptional()
  readonly address: string;

  @IsOptional()
  readonly service_of_activity: string;

  @IsOptional()
  readonly number_of_employees: number;

  @IsOptional()
  readonly description: string;

  @IsOptional()
  readonly type: string;
}
