import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { companiesProviders } from './companies.providers';

@Module({
  providers: [CompaniesService, ...companiesProviders],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
