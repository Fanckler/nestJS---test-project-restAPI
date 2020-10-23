import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClassAndLessonDTO {
  @ApiProperty({ description: 'The id of a lessons', example: '5f8abcfa34647cca999189ec'})
  @IsString()
  readonly lessonHash: string;
}
