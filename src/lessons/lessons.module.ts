import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from './entities/lesson.entity';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { Video, VideoSchema } from '../videos/entities/video.entity';
import { Keynote, KeynoteSchema } from '../keynotes/entities/keynote.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Lesson.name,
        schema: LessonSchema,
      },
      {
        name: Video.name,
        schema: VideoSchema,
      },
      {
        name: Keynote.name,
        schema: KeynoteSchema,
      }
    ])
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
