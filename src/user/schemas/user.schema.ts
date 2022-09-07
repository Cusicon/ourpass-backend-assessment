import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Factory } from 'nestjs-seeder';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  @Factory((faker) => faker.name.findName())
  name: string;

  @Prop({ required: true, unique: true })
  @Factory((faker) => faker.internet.email().toLowerCase())
  email: string;

  @Prop({ required: true })
  @Factory(() => {
    const password = '12345';
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
  })
  password: string;

  @Prop({ default: '' })
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
