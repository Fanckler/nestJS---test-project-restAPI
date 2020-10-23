import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateKeynoteDTO {
  @ApiProperty({ description: 'The title of keynote'})
  @IsString()
  title: string;

  @ApiProperty({ description: 'The order of keynote'})
  @IsNumber()
  order: number;

  @ApiProperty({ description: 'The url of keynote'})
  @IsString()
  uri: string;
}
