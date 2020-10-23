import { HttpException, HttpStatus, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './entities/video.entity';
import { CreateVideoDTO } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable({ scope: Scope.REQUEST })
export class VideosService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<Video>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, page } = paginationQuery;

    return this.videoModel
      .find()
      .skip(page)
      .limit(limit)
      .exec();
  }

  async findOne(id: string) {
    const lessons = await this.videoModel
      .findOne({ _id: id })
      .exec();
    if (!lessons) {
      throw new HttpException(`Video #${id} not found!`, HttpStatus.NOT_FOUND)
    }
    return lessons
  }

  async create(createVideoDTO: CreateVideoDTO) {
    const video = new this.videoModel(createVideoDTO);
    const data = await video.save();
    return {hash: data['_id']}
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    const existingVideo = await this.videoModel
      .findOneAndUpdate({_id: id}, {$set: updateVideoDto}, {new: true})
      .exec();

    if (!existingVideo) {
      throw new NotFoundException(`Video #${id} not found`)
    }

    return existingVideo;
  }

  async remove(id: string) {
    const video = await this.findOne(id);
    return video.remove();
  }

}
