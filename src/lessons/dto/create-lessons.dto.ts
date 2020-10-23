import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class VideoDTO {
  @IsString()
  title: string;

  @IsNumber()
  order: number;

  @IsString()
  uri: string;
}

class KeynoteDTO {
  @IsString()
  title: string;

  @IsNumber()
  order: number;

  @IsString()
  uri: string;
}

class ContentDTO {
  @IsArray()
  videos: string[];

  @IsArray()
  keynotes: string[];
}


export class CreateLessonsDto {
  @ApiProperty({ description: 'The title of a lessons'})
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'The description of a lessons'})
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'The order of a lessons'})
  @IsNumber()
  readonly order: number;

  @ApiProperty({ description: 'The availability of a lessons'})
  @IsArray()
  readonly availability: string[][];

  @ApiProperty({ description: 'The content of a lessons'})
  @IsObject()
  @Type(() => ContentDTO)
  readonly content: ContentDTO
}
