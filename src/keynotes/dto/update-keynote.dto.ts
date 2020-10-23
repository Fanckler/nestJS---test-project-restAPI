import { PartialType } from '@nestjs/swagger';
import { CreateKeynoteDTO } from './create-keynote.dto';

export class UpdateKeynoteDto extends PartialType(CreateKeynoteDTO){}
