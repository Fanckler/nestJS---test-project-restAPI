import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassesModule } from './classes/classes.module';
import { LessonsModule } from './lessons/lessons.module';
import { AuthModule } from './auth/auth.module';
import { VideosModule } from './videos/videos.module';
import { KeynotesModule } from './keynotes/keynotes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-education', {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
    }),
    AuthModule,
    UsersModule,
    ClassesModule,
    LessonsModule,
    VideosModule,
    KeynotesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
