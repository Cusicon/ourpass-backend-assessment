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
    const users = await this.userModel.find();
    let returningPosts = [];

    // Assign 3 post per user
    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      // Generate just 3 posts
      // ...and assign authors them.
      let posts = DataFactory.createForClass(Post).generate(3);

      // Each author has 3 post each
      let modifiedPost = posts.map((p) => {
        p.author = user._id;
        return p;
      });

      // Push to array
      returningPosts.push(...modifiedPost);
    }

    // Insert into database.
    return this.postModel.insertMany(returningPosts);
  }

  async drop(): Promise<any> {
    return this.postModel.deleteMany({});
  }
}
