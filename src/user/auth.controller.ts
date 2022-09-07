import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UtilityHelper } from 'src/helpers/utility.helper';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const newUser = await this.userService.signUp(createUserDto);
    return UtilityHelper.response('account created successfully', newUser);
  }

  @Post('signin')
  async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    const signinedIn = await this.userService.signIn(authCredentialsDto);
    return UtilityHelper.response('login successful', signinedIn);
  }
}
