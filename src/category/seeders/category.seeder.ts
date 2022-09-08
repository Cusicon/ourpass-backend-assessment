import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Post, PostDocument } from 'src/post/schemas/post.schema';
import { Category, CategoryDocument } from '../schemas/category.schema';

export class CategoriesSeeder implements Seeder {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async seed(): Promise<any> {
    const posts = await this.postModel.find();
    let returningCategories = [];

    // Assign 3 post per user
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];

      // Generate just 2 categories
      // ...and assign a post to them.
      let categories = DataFactory.createForClass(Category).generate(2);

      // Each post has 3 categories each
      let modifiedCatgories = categories.map((cat) => {
        cat.post = post._id;
        return cat;
      });

      // Push to array
      returningCategories.push(...modifiedCatgories);
    }

    // Insert into database.
    return this.categoryModel.insertMany(returningCategories);
  }

  async drop(): Promise<any> {
    return this.categoryModel.deleteMany({});
  }
}
