import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { RolesEnum } from 'src/core/enums/roles.enum';
import { Company } from '../companies/company.entity';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  nick_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(RolesEnum),
    allowNull: false,
    defaultValue: RolesEnum.USER,
  })
  role: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  position: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @HasMany(() => Company, { onDelete: 'CASCADE' })
  companies: Company[];
}
