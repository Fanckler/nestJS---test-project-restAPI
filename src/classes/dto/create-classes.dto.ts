import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class DurationDTO {
  @IsString()
  @IsNotEmpty()
  started: string;

  @IsString()
  @IsNotEmpty()
  closed: string;
}

export class CreateClassesDto {
  @ApiProperty({ description: 'The title of a classes'})
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'The description of a classes'})
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'The order of a classes'})
  @IsNumber()
  readonly order: number;

  @ApiProperty({ description: 'The duration of a classes'})
  @IsObject()
  @Type(() => DurationDTO)
  readonly duration: DurationDTO;

}
