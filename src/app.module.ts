import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV } from 'src/env.config';
import { UserModule } from './user/user.module';

const { MONGODB_LOCAL_URI } = ENV;

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
