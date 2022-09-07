import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async createPost(
    createPostDto: CreatePostDto,
    user: UserDocument,
  ): Promise<any> {
    const author = user._id;
    const slug = `${createPostDto.title
      .split(' ')
      .join('-')
      .toLowerCase()}-${Date.now()}`;

    let postObj = { ...createPostDto, slug, author };

    const newPost = new this.postModel(postObj);
    await newPost.save();

    return newPost;
  }
}
