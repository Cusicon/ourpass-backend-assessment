import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV } from './env.config';
import { User, UserSchema } from './user/schemas/user.schema';
import { UsersSeeder } from './user/seeders/user.seeder';
import { Post, PostSchema } from './post/schemas/post.schema';
import { PostsSeeder } from './post/seeders/post.seeder';

const { MONGODB_URI } = ENV;

seeder({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: MONGODB_URI,
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
}).run([UsersSeeder, PostsSeeder]);
