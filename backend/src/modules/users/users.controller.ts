import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles/roles.guard';
import { UsersService } from './users.service';
import { User as UserEntity } from './user.entity';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { RolesEnum } from 'src/core/enums/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('all')
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req): Promise<UserEntity> {
    // TODO: admins can get user profiles by id
    if (req.user.id !== Number(id)) {
      throw new UnauthorizedException(
        'You are not authorized get this user profle',
      );
    }

    const user = await this.usersService.findOneById(id);

    if (!user) {
      throw new NotFoundException("This user doesn't exist");
    }

    return user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() user: UserUpdateDto,
    @Request() req,
  ): Promise<UserEntity> {
    const isAdmin = await this.usersService.isAdmin(req.user.id);

    if (!isAdmin && req.user.id !== Number(id)) {
      throw new UnauthorizedException('You are not authorized edit this user');
    }

    const { numberOfAffectedRows } = await this.usersService.update(user, id);

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This user doesn't exist");
    }

    const updatedUser = await this.usersService.findOneById(id);

    return updatedUser;
  }

  // only admins can delete user profiles
  @Roles(RolesEnum.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.usersService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException("This user doesn't exist");
    }

    return deleted;
  }
}
