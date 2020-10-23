import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({
  versionKey: false,
})
export class Lesson extends Document {
  @Prop({required: true})
  title: string;

  @Prop({required: true})
  description: string;

  @Prop({required: true})
  order: number;

  @Prop([[String]])
  availability: string[][];

  @Prop({
    videos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
    }],
    keynotes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Keynote',
    }]
  })
  content: {
    videos: string[];
    keynotes: string[];
  };
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
