import { RolesEnum } from 'src/core/enums/roles.enum';

export const adminInitialUser = {
  first_name: 'admin',
  last_name: 'admin',
  nick_name: 'initial_admin',
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  role: RolesEnum.ADMIN,
  position: 'myCompanies admin',
  description: 'initial admin profile from server',
};
