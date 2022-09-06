import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const found_user = this.userModel.findOne({ email });

    if (!found_user) {
      const user = new this.userModel(createUserDto);
      return await user.save();
    } else throw new BadRequestException('Sorry, user already exist.');
  }
}
