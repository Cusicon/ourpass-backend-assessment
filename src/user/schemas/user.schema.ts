import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const isCorrect = await bcrypt.compare(password, this.salt);
    return isCorrect;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
