import { Roles } from 'src/core/enums/enums';

export class UserDto {
  readonly first_name: string;
  readonly last_name: string;
  readonly nick_name: string;
  readonly email: string;
  readonly password: string;
  readonly role: (typeof Roles)[keyof typeof Roles];
  readonly position: string;
  readonly description: string;
}
