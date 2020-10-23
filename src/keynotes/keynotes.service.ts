import { HttpException, HttpStatus, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Keynote } from './entities/keynote.entity';
import { CreateKeynoteDTO } from './dto/create-keynote.dto';
import { UpdateKeynoteDto } from './dto/update-keynote.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable({ scope: Scope.REQUEST })
export class KeynotesService {
  constructor(
    @InjectModel(Keynote.name) private readonly keynoteModel: Model<Keynote>,
  ) {}


  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, page } = paginationQuery;

    return this.keynoteModel
      .find({})
      .limit(limit)
      .skip(page)
      .exec();
  }

  async findOne(id: string) {
    const lessons = await this.keynoteModel
      .findOne({ _id: id }, )
      .exec();
    if (!lessons) {
      throw new HttpException(`Keynote #${id} not found!`, HttpStatus.NOT_FOUND)
    }
    return lessons
  }


  async create(createKeynoteDTO: CreateKeynoteDTO) {
    const keynote = new this.keynoteModel(createKeynoteDTO);
    const data = await keynote.save();
    return {hash: data['_id']}
  }

  async update(id: string, updateKeynoteDto: UpdateKeynoteDto) {
    const existingKeynote = await this.keynoteModel
      .findOneAndUpdate({_id: id}, {$set: updateKeynoteDto}, {new: true})
      .exec();

    if (!existingKeynote) {
      throw new NotFoundException(`Keynote #${id} not found`)
    }

    return existingKeynote;
  }

  async remove(id: string) {
    const keynote = await this.findOne(id);
    return keynote.remove();
  }

}
