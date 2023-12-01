import { Company } from './company.entity';
import { User } from '../users/user.entity';
import { COMPANY_REPOSITORY, USER_REPOSITORY } from '../../core/constants';

export const companiesProviders = [
  {
    provide: COMPANY_REPOSITORY,
    useValue: Company,
  },
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
