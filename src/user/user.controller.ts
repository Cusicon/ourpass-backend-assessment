import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UtilityHelper } from '../helpers/utility.helper';
import { UserService } from './user.service';

@Controller('api/v1/users')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    const allUsers = await this.userService.getAllUsers();
    return UtilityHelper.response('all users', allUsers);
  }
}
