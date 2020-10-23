import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoDTO {
  @ApiProperty({ description: 'The title of video'})
  @IsString()
  title: string;

  @ApiProperty({ description: 'The order of video'})
  @IsNumber()
  order: number;

  @ApiProperty({ description: 'The url of video'})
  @IsString()
  uri: string;
}
