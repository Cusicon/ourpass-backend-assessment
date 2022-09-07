import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/post/schemas/post.schema';
import { CategoryCredentialsDto } from './dto/category-credentials.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,

    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
  ) {}

  async createCategory(
    postId,
    categoryCredentialsDto: CategoryCredentialsDto,
  ): Promise<any> {
    const post = await this.postModel.findById(postId);
    const assigned_post = post._id;

    let categoryObj = { ...categoryCredentialsDto, post: assigned_post };

    const newCategory = new this.categoryModel(categoryObj);
    await newCategory.save();

    return newCategory;
  }

  async getAllCategories(postId: string): Promise<any> {
    const categories = await this.categoryModel.find({ post: postId });
    return categories;
  }

  async updateSingleCategory(
    categoryId: string,
    postId: string,
    categoryUpdates: CategoryCredentialsDto,
  ): Promise<any> {
    const post = await this.postModel.findById(postId);

    if (!post) throw new NotFoundException('Post not found');

    const category = await this.categoryModel.findOneAndUpdate(
      { _id: categoryId, post: post._id },
      { ...categoryUpdates },
      { new: true },
    );

    return category;
  }

  async deleteCategory(categoryId: string): Promise<void> {
    const deleted = await this.categoryModel.deleteOne({
      _id: categoryId,
    });

    if (deleted.deletedCount < 1)
      throw new NotFoundException(
        `Category with ID: '${categoryId}' wasn't deleted`,
      );
  }
}
