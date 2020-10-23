import { CreateClassesDto } from './create-classes.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateClassesDto extends PartialType(CreateClassesDto){}
