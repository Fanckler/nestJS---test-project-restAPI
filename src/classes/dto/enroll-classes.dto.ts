import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EnrollClassesDto {
  @ApiProperty({ description: 'ID user'})
  @IsString()
  readonly user: string;

  @ApiProperty({ description: 'The status of user enroll'})
  @IsString()
  readonly status: string;

  @ApiProperty({ description: 'The notes of user enroll'})
  @IsString()
  readonly notes: string
}
