import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      const userObj = { ...createUserDto, salt, password: hashedPassword };

      const user = new this.userModel(userObj);
      await user.save();

      user.password = undefined;
      user.salt = undefined;

      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Sorry, user already exist.');
      } else throw new InternalServerErrorException();
    }
  }
}
