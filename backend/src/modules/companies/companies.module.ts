import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { UsersService } from '../users/users.service';
import { CompaniesController } from './companies.controller';
import { companiesProviders } from './companies.providers';

@Module({
  providers: [CompaniesService, UsersService, ...companiesProviders],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
