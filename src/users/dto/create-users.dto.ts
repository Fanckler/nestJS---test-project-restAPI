import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersDto {
  @ApiProperty({ description: 'The name of a users', example: 'John Doe'})
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The email of a users', example: 'jdoe@example.com'})
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'The phone of a users', example: '380662332377'})
  @IsString()
  readonly phone: string;

  @ApiProperty({ description: 'The pass of a users', example: 'ab12345Cd'})
  @IsString()
  readonly password: string;

  @ApiProperty({ description: 'The gender of a users', example: 'm'})
  @IsString()
  readonly sex: string;

  @ApiProperty({ description: 'The role of a users', example: ["newbie"]})
  @IsString({each: true})
  readonly role: string[];
}
