import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { RolesEnum as Roles } from 'src/core/enums/enums';
import { USER_PASSWORD_MIN_LENGTH } from 'src/core/constants';

export class UserDto {
  @IsNotEmpty()
  readonly first_name: string;

  @IsNotEmpty()
  readonly last_name: string;

  @IsNotEmpty()
  readonly nick_name: string;

  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: `email is wrong`,
    },
  )
  readonly email: string;

  @IsNotEmpty()
  @MinLength(USER_PASSWORD_MIN_LENGTH, {
    message: `min length of password is ${USER_PASSWORD_MIN_LENGTH}`,
  })
  readonly password: string;

  readonly role: (typeof Roles)[keyof typeof Roles];

  @IsNotEmpty()
  readonly position: string;

  @IsNotEmpty()
  readonly description: string;
}
