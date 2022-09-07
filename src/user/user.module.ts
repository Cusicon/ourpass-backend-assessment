import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ENV } from 'src/env.config';
import { JWTStrategy } from './jwt/jwt.strategy';

const { JWT_SECRET, APP_URL } = ENV;

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: 10800, issuer: APP_URL }, // expiresIn 3hrs
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController, UserController],
  providers: [UserService, JWTStrategy],
  exports: [JWTStrategy, PassportModule],
})
export class UserModule {}
