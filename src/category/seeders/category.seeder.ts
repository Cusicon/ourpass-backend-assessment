import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { Category, CategoryDocument } from '../schemas/category.schema';

export class CategoriesSeeder implements Seeder {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async seed(): Promise<any> {
    // Generate just 10 categories.
    const categories = DataFactory.createForClass(Category).generate(5);

    // Randomly pick one user from database
    const users = await this.userModel.find();
    const user = users[Math.floor(Math.random() * users.length)];

    // ...and assign as "author" to all categories, per seed
    categories.map((p) => (p.author = user._id));

    // Insert into database.
    return this.categoryModel.insertMany(categories);
  }

  async drop(): Promise<any> {
    return this.categoryModel.deleteMany({});
  }
}
