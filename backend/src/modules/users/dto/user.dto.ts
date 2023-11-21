import { IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator';
import { RolesEnum as Roles } from 'src/core/enums/enums';
import {
  USER_PASSWORD_MIN_LENGTH,
  USER_CREDENTIALS_MAX_LENGTH,
  USER_DESCRIPTION_MAX_LENGTH,
  USER_POSITION_MAX_LENGTH,
} from 'src/core/constants';

export class UserDto {
  @IsNotEmpty()
  @MaxLength(USER_CREDENTIALS_MAX_LENGTH, {
    message: `max length of first name is ${USER_CREDENTIALS_MAX_LENGTH}`,
  })
  readonly first_name: string;

  @IsNotEmpty()
  @MaxLength(USER_CREDENTIALS_MAX_LENGTH, {
    message: `max length of last name is ${USER_CREDENTIALS_MAX_LENGTH}`,
  })
  readonly last_name: string;

  @IsNotEmpty()
  @MaxLength(USER_CREDENTIALS_MAX_LENGTH, {
    message: `max length of nickname is ${USER_CREDENTIALS_MAX_LENGTH}`,
  })
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
  @MaxLength(USER_POSITION_MAX_LENGTH, {
    message: `max length of position is ${USER_POSITION_MAX_LENGTH}`,
  })
  readonly position: string;

  @IsNotEmpty()
  @MaxLength(USER_DESCRIPTION_MAX_LENGTH, {
    message: `max length of description is ${USER_DESCRIPTION_MAX_LENGTH}`,
  })
  readonly description: string;
}
