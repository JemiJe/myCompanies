import { MinLength, IsEmail, IsOptional } from 'class-validator';
import { USER_PASSWORD_MIN_LENGTH } from 'src/core/constants';

export class UserUpdateDto {
  @IsOptional()
  readonly first_name: string;

  @IsOptional()
  readonly last_name: string;

  @IsOptional()
  readonly nick_name: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: `email is wrong`,
    },
  )
  readonly email: string;

  @IsOptional()
  @MinLength(USER_PASSWORD_MIN_LENGTH, {
    message: `min length of password is ${USER_PASSWORD_MIN_LENGTH}`,
  })
  readonly password: string;

  @IsOptional()
  readonly position: string;

  @IsOptional()
  readonly description: string;
}
