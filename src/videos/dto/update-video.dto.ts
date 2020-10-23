import { PartialType } from '@nestjs/swagger';
import { CreateVideoDTO } from './create-video.dto';

export class UpdateVideoDto extends PartialType(CreateVideoDTO){}
