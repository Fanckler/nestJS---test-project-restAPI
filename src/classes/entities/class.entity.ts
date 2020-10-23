import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created', updatedAt: 'modified'
  }
})
export class Class extends Document {
  @Prop({required: true})
  title: string;

  @Prop({required: true})
  description: string;

  @Prop({required: true})
  order: number;

  @Prop([{
    _id: false,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: String,
    notes: String,
  }])
  students: {
    user: string;
    status: string;
    notes: string;
  }[]

  @Prop([{
    _id: false,
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
    },
  }])
  lessons: {
    lesson: string;
  }[]

  @Prop(raw({
    started: { type: Date, default: Date },
    closed: { type: Date, default: Date }
  }))
  duration: Record<string, any>

  @Prop({type: Date, default: Date})
  created: Date;

  @Prop({type: Date})
  modified: Date;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
