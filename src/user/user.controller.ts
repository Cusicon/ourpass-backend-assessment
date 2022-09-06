import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
