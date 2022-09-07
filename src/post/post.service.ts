import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';
import { PostCredentialsDto } from './dto/post-credentials.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async createPost(
    postCredentialsDto: PostCredentialsDto,
    user: UserDocument,
  ): Promise<any> {
    const author = user._id;
    const slug = `${postCredentialsDto.title
      .split(' ')
      .join('-')
      .toLowerCase()}-${Date.now()}`;

    let postObj = { ...postCredentialsDto, slug, author };

    const newPost = new this.postModel(postObj);
    await newPost.save();

    return newPost;
  }

  async getAllPosts(user: UserDocument): Promise<any> {
    const posts = await this.postModel.find(
      { author: user._id },
      { author: 0 },
    );
    return posts;
  }

  async updateSinglePost(
    postId: string,
    postUpdates: PostCredentialsDto,
    user: UserDocument,
  ): Promise<any> {
    const post = await this.postModel.findOneAndUpdate(
      { _id: postId, author: user._id },
      { ...postUpdates },
      { new: true },
    );

    return post;
  }

  async deletePost(
    postId: string,
    user: UserDocument,
    iamSure: boolean,
  ): Promise<void> {
    if (!iamSure) return;

    const deleted = await this.postModel.deleteOne({
      _id: postId,
      author: user._id,
    });

    if (deleted.deletedCount < 1)
      throw new NotFoundException(`Post with ID: '${postId}' wasn't deleted`);
  }
}
