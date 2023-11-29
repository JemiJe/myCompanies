import { User } from 'src/modules/users/user.entity';
import { Company } from 'src/modules/companies/company.entity';
import * as bcrypt from 'bcrypt';
import { adminInitialCompanies } from './constants/adminInitialCompanies';
import { adminInitialUser } from './constants/adminInitialUser';

export default async () => {
  const existingAdmin = await User.findOne({
    // only 1 admin from seeders function is allowed
    // no matter you changed .env admin credentials or not
    where: { description: adminInitialUser.description },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(
      adminInitialUser.password,
      Number(process.env.BCRYPT_SALT_ROUNDS),
    );

    const adminUser = await User.create({
      ...adminInitialUser,
      password: passwordHash,
    });

    const adminCompaniesWithId = adminInitialCompanies.map((company) => {
      company['userId'] = adminUser.id;
      return company;
    });

    await Company.bulkCreate<Company>(adminCompaniesWithId);

    console.log('Admin record created successfully');
  }
};
