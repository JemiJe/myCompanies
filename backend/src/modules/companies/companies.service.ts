import { Injectable, Inject } from '@nestjs/common';
import { Company } from './company.entity';
import { CompanyDto } from './dto/company.dto';
import { User } from '../users/user.entity';
import { COMPANY_REPOSITORY } from '../../core/constants';

@Injectable()
export class CompaniesService {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: typeof Company,
  ) {}

  async create(company: CompanyDto, userId: number): Promise<Company> {
    return await this.companyRepository.create<Company>({ ...company, userId });
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.findAll<Company>();
  }

  async findAllByUserId(userId: number): Promise<Company[]> {
    return await this.companyRepository.findAll<Company>({
      where: { userId },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async findOne(id): Promise<Company> {
    return await this.companyRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id, userId, isAdmin: boolean = false) {
    const whereParams = isAdmin ? { id } : { id, userId };
    return await this.companyRepository.destroy({ where: whereParams });
  }

  async update(id, data, userId, isAdmin: boolean = false) {
    const whereParams = isAdmin ? { id } : { id, userId };

    const [numberOfAffectedRows, [updatedCompany]] =
      await this.companyRepository.update(
        { ...data },
        { where: whereParams, returning: true },
      );

    return { numberOfAffectedRows, updatedCompany };
  }
}
