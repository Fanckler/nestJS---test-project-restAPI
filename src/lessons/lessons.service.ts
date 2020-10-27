import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Lesson } from './entities/lesson.entity';
import { UpdateLessonsDto } from './dto/update-lessons.dto';
import { CreateLessonsDto } from './dto/create-lessons.dto';
import { Video } from '../videos/entities/video.entity';
import { Keynote } from '../keynotes/entities/keynote.entity';

@Injectable({ scope: Scope.REQUEST })
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name) private readonly lessonsModel: Model<Lesson>,
    @InjectModel(Video.name) private readonly videosModel: Model<Video>,
    @InjectModel(Keynote.name) private readonly keynotesModel: Model<Keynote>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, page } = paginationQuery;

    return this.lessonsModel
      .find()
      .skip(page)
      .limit(limit)
      .populate('content.videos')
      .populate('content.keynotes')
      .exec();
  }

  async findOne(id: string) {
    const lessons = await this.lessonsModel
      .findOne({ _id: id })
      .populate('content.videos')
      .populate('content.keynotes')
      .exec();
    if (!lessons) {
      throw new HttpException(`Lessons #${id} not found!`, HttpStatus.NOT_FOUND)
    }
    return lessons
  }

  async findOneWithoutPopulate(id: string) {
    const lesson = await this.lessonsModel.findOne({ _id: id }).exec();
    if (!lesson) {
      throw new HttpException(`Lessons #${id} not found!`, HttpStatus.NOT_FOUND)
    }

    return lesson
  }

  async create(createLessonsDto: CreateLessonsDto) {
    const lessons = new this.lessonsModel(createLessonsDto);
    const data = await lessons.save();
    return {hash: data['_id']}
  }

  async update(id: string, updateLessonsDto: UpdateLessonsDto) {
    const existingLesson = await this.lessonsModel
      .findOneAndUpdate({_id: id}, {$set: updateLessonsDto}, {new: true})
      .exec();

    if (!existingLesson) {
      throw new NotFoundException(`Lesson #${id} not found`)
    }

    return existingLesson;
  }

  async remove(id: string) {
    const lessons = await this.findOne(id);
    return lessons.remove();
  }


  async addVideoById(id: string, videoId: string) {
    const lesson = await this.findOneWithoutPopulate(id);

    if (lesson.content.videos.includes(videoId)) {
      throw new ConflictException('Video already exist');
    } else {
      lesson.content.videos.push(videoId);
      return lesson.save();

      // TODO: Можно еще так пушить в коллекцию монги,
      //  Мне ближе через push делать

      /*this.findOneWithoutPopulate.update(
          { _id: id },
          { $push: { 'content.videos': videoId } },
          done
        );
      */

    }
  }

  async addKeynoteById(id: string, keynoteId: string) {
    const lesson = await this.findOneWithoutPopulate(id);
    if (lesson.content.keynotes.includes(keynoteId)) {
      throw new ConflictException('Keynote already exist');
    } else {
      lesson.content.keynotes.push(keynoteId);
      return lesson.save();
    }
  }

  async getVideoByLesson(id, videoID) {
    const lesson = await this.lessonsModel
      .findOne(
        { _id: id, 'content.videos': videoID },
        { 'content.keynotes': 0}
        )
      .populate('content.videos', null, {_id: videoID})
      .exec();
    if (!lesson) {
      throw new HttpException(`Lessons #${id} and VideoID #${videoID} not found!`, HttpStatus.NOT_FOUND)
    }
    return lesson;
  }

  async deleteVideoFromLesson(id, videoID) {
    const lesson = await this.lessonsModel
      .findOneAndUpdate({_id: id}, {$pull: { 'content.videos': videoID }})
    if (!lesson) {
      throw new HttpException(`Lesson #${id} not found!`, HttpStatus.NOT_FOUND)
    }
    return lesson.save();
  }


  async getKeynoteByLesson(id, videoID) {
    const lesson = await this.lessonsModel
      .findOne(
        { _id: id, 'content.keynotes': videoID },
        { 'content.videos': 0}
      )
      .populate('content.keynotes', null, {_id: videoID})
      .exec();
    if (!lesson) {
      throw new HttpException(`Lessons #${id} and KeynoteID #${videoID} not found!`, HttpStatus.NOT_FOUND)
    }
    return lesson;
  }

  async deleteKeynoteFromLesson(id, videoID) {
    const lesson = await this.lessonsModel
      .findOneAndUpdate({_id: id}, {$pull: { 'content.keynotes': videoID }})
    if (!lesson) {
      throw new HttpException(`Lesson #${id} not found!`, HttpStatus.NOT_FOUND)
    }
    return lesson.save();
  }
}
