import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt/jwt-payload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      const userObj = { ...createUserDto, salt, password: hashedPassword };

      const newUser = new this.userModel(userObj);
      await newUser.save();

      newUser.password = undefined;
      newUser.salt = undefined;

      return newUser;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Sorry, user already exist.');
      } else throw new InternalServerErrorException();
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; user: UserDocument }> {
    const user = await this.authenticateUser(authCredentialsDto);
    const payload: JwtPayload = { user_uuid: user._id, email: user.email };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken, user };
  }

  async getAllUsers() {
    return await this.userModel.find({}, { password: 0, salt: 0 });
  }

  async authenticateUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<UserDocument> {
    const { email, password } = authCredentialsDto;

    const user = await this.userModel.findOne({ email }, { salt: 0 });
    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) throw new UnauthorizedException('Invalid credentials');
    user.password = undefined;

    return user;
  }
}
