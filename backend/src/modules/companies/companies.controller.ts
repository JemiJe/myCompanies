import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles/roles.guard';
import { CompaniesService } from './companies.service';
import { Company as CompanyEntity } from './company.entity';
import { CompanyDto } from './dto/company.dto';
import { CompanyUpdateDto } from './dto/companyUpdate.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesEnum } from 'src/core/enums/roles.enum';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companyService: CompaniesService) {}

  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('all')
  async findAll() {
    return await this.companyService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAllByUserId(@Request() req) {
    return await this.companyService.findAllByUserId(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CompanyEntity> {
    const company = await this.companyService.findOne(id);

    if (!company) {
      throw new NotFoundException("This company doesn't exist");
    }

    return company;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() company: CompanyDto,
    @Request() req,
  ): Promise<CompanyEntity> {
    return await this.companyService.create(company, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() company: CompanyUpdateDto,
    @Request() req,
  ): Promise<CompanyEntity> {
    const { numberOfAffectedRows, updatedCompany } =
      await this.companyService.update(id, company, req.user.id);

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This company doesn't exist");
    }

    return updatedCompany;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const deleted = await this.companyService.delete(id, req.user.id);

    if (deleted === 0) {
      throw new NotFoundException("This company doesn't exist");
    }

    return 'Successfully deleted';
  }
}
