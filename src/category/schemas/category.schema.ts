import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';
import { Post } from 'src/post/schemas/post.schema';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true })
  @Factory((faker) => faker.lorem.sentence(5))
  title: string;

  @Factory((faker) => faker.lorem.paragraphs(2))
  @Prop({ required: true })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  })
  post: Post;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
