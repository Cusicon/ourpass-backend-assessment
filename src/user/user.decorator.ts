import { createParamDecorator } from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';

export const GetUser = createParamDecorator(
  (data, req): UserDocument => req.user,
);
