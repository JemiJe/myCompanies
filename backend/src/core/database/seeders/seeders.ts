import { User } from 'src/modules/users/user.entity';
import * as bcrypt from 'bcrypt';
import { RolesEnum } from 'src/core/enums/roles.enum';

const admin = {
  first_name: 'admin',
  last_name: 'admin',
  nick_name: 'initial_admin',
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  role: RolesEnum.ADMIN,
  position: 'myCompanies admin',
  description: 'initial admin profile from server',
};

export default async () => {
  const existingAdmin = await User.findOne({
    // only 1 admin from seeders function is allowed
    // no matter you changed .env admin credentials or not
    where: { description: admin.description },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(
      admin.password,
      Number(process.env.BCRYPT_SALT_ROUNDS),
    );

    await User.create({
      ...admin,
      password: passwordHash,
    });
    console.log('Admin record created successfully');
  }
};
