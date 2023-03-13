import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      authMechanism: 'DEFAULT',
      autoCreate: true,
      auth: {
        username: 'mongo',
        password: 'mongo',
      },
      dbName: 'test',
    }),
    HttpModule,
  ],
})
export class AppModule {}
