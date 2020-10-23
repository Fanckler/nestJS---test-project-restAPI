import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Keynote, KeynoteSchema } from './entities/keynote.entity';
import { KeynotesController } from './keynotes.controller';
import { KeynotesService } from './keynotes.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Keynote.name,
        schema: KeynoteSchema,
      }
    ])
  ],
  controllers: [KeynotesController],
  providers: [KeynotesService],
})
export class KeynotesModule {}
