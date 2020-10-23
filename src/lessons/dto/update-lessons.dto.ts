import { CreateLessonsDto } from './create-lessons.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateLessonsDto extends PartialType(CreateLessonsDto){}
