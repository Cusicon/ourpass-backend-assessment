import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { Post, PostDocument } from '../schemas/post.schema';

export class PostsSeeder implements Seeder {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async seed(): Promise<any> {
    // Generate just 10 posts.
    const posts = DataFactory.createForClass(Post).generate(5);

    // Randomly pick one user from database
    const users = await this.userModel.find();
    const user = users[Math.floor(Math.random() * users.length)];

    // ...and assign as "author" to all posts, per seed
    posts.map((p) => (p.author = user._id));

    // Insert into database.
    return this.postModel.insertMany(posts);
  }

  async drop(): Promise<any> {
    return this.postModel.deleteMany({});
  }
}
