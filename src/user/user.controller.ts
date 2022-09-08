import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UtilityHelper } from '../helpers/utility.helper';
import { UserDocument } from './schemas/user.schema';
import { CurrentUser } from './user.decorator';
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

  @Patch()
  async updateUserInfo(
    @Body('name') fullname: string,
    @CurrentUser() user: UserDocument,
  ) {
    const updatedUser = await this.userService.updateUserInfo(fullname, user);
    return UtilityHelper.response(
      `user's info updated successfully`,
      updatedUser,
    );
  }
}
