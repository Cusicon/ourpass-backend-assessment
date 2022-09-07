import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDocument } from './schemas/user.schema';
import { GetUser } from './user.decorator';
import { UserService } from './user.service';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllUsers(@GetUser() user: UserDocument) {
    return this.userService.getAllUsers();
  }
}
