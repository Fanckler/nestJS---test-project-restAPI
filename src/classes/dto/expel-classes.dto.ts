import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExpelClassesDto {
  @ApiProperty({ description: 'ID user'})
  @IsString()
  readonly user: string;
}
