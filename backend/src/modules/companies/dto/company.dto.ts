import { IsNotEmpty, IsPositive } from 'class-validator';

export class CompanyDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly address: string;

  @IsNotEmpty()
  readonly service_of_activity: string;

  @IsNotEmpty()
  @IsPositive()
  readonly number_of_employees: number;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly type: string;
}
