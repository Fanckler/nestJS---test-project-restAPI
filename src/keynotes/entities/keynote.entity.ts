import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  versionKey: false,
})
export class Keynote extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  order: number;

  @Prop({ required: true })
  uri: string;
}

export const KeynoteSchema = SchemaFactory.createForClass(Keynote);
