import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { Class, ClassSchema } from './entities/class.entity';
import { User, UserSchema } from '../users/entities/user.entity';
import { Lesson, LessonSchema } from '../lessons/entities/lesson.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Class.name,
        schema: ClassSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Lesson.name,
        schema: LessonSchema,
      }
    ])
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
