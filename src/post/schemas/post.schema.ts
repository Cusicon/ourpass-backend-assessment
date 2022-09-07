import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';
import { User } from 'src/user/schemas/user.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ required: true })
  @Factory((faker) => faker.lorem.sentence(5))
  title: string;

  @Factory((faker) => faker.lorem.slug(5))
  @Prop({ required: true })
  slug: string;

  @Factory((faker) => faker.lorem.paragraphs(2))
  @Prop({ required: true })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
