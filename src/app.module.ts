import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { UserModule } from './user/user.module';

config();

const { MONGODB_LOCAL_URI } = process.env;

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: MONGODB_LOCAL_URI,
      }),
    }),
    UserModule,
  ],
})
export class AppModule {}
