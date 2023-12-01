import { CompanyDto } from 'src/modules/companies/dto/company.dto';

export const adminInitialCompanies: CompanyDto[] = [
  {
    name: 'Alphabet Inc.',
    address: 'USA',
    service_of_activity: 'Information technologies',
    number_of_employees: 182000,
    description:
      'American multinational technology conglomerate holding company',
    type: 'Public',
  },
  {
    name: 'General Motors',
    address: 'Detroit, Michigan, United States',
    service_of_activity: 'Automotive',
    number_of_employees: 167000,
    description:
      'American multinational automotive manufacturing company headquartered',
    type: 'Public',
  },
  {
    name: 'SpaceX',
    address: 'Hawthorne, California, United States',
    service_of_activity: 'Space, Telecommunications',
    number_of_employees: 13000,
    description:
      'American spacecraft manufacturer, launch service provider, defense contractor and satellite communications company',
    type: 'Private',
  },
];
