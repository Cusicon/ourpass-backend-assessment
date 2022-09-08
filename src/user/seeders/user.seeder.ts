import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { User } from '../schemas/user.schema';

export class UsersSeeder implements Seeder {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async seed(): Promise<any> {
    // Generate just 5 users.
    const users = DataFactory.createForClass(User).generate(5);

    // Insert into database.
    return this.userModel.insertMany(users);
  }

  async drop(): Promise<any> {
    return this.userModel.deleteMany({});
  }
}
