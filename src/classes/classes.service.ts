import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateClassesDto } from './dto/create-classes.dto';
import { UpdateClassesDto } from './dto/update-classes.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from './entities/class.entity';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { EnrollClassesDto } from './dto/enroll-classes.dto';
import { ExpelClassesDto } from './dto/expel-classes.dto';
import { ClassAndLessonDTO } from './dto/classAndLesson.dto';

@Injectable({ scope: Scope.REQUEST })
export class ClassesService {
  constructor(
    @InjectModel(Class.name) private readonly classesModel: Model<Class>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, page } = paginationQuery;

    return this.classesModel
      .find()
      .skip(page)
      .limit(limit)
      .populate('students.user')
      .populate('lessons.lesson', {'content': 0})
      .exec();
  }

  async findOne(id: string) {
    const classesById = await this.classesModel
      .findOne({ _id: id })
      .populate('students.user')
      .populate('lessons.lesson', {'content': 0})
      .exec();
    if (!classesById) {
      throw new HttpException(`Class #${id} not found!`, HttpStatus.NOT_FOUND)
    }
    return classesById
  }

  async create(createClassesDto: CreateClassesDto) {
    const classes = new this.classesModel(createClassesDto);
    const data = await classes.save();
    return {hash: data['_id']}
  }

  async update(id: string, updateClassesDto: UpdateClassesDto) {
    const classesUpdated = {
      ...updateClassesDto,
      modified: new Date()
    }
    const existingClass = await this.classesModel
      .findOneAndUpdate({_id: id}, {$set: classesUpdated}, {new: true, timestamps: true})
      .exec();

    if (!existingClass) {
      throw new NotFoundException(`Class #${id} not found`)
    }

    return existingClass;

  }

  async remove(id: string) {
    const classes = await this.findOne(id);
    return classes.remove();
  }

  async enroll(id: string, enrollClassesDto : EnrollClassesDto) {
    const classesById = await this.classesModel.findOne({ _id: id }).exec();
    if (!classesById) {
      throw new HttpException(`Class #${id} not found!`, HttpStatus.NOT_FOUND)
    }
    const hasStudent = classesById.students.find(i => String(i.user) === enrollClassesDto.user);

    if (hasStudent) {
      throw new ConflictException('Student already exist');
    } else {
      classesById.students.push(enrollClassesDto);
      return classesById.save();
    }
  }

  async expel(id: string, { user: studentID } : ExpelClassesDto) {
    const classesById = await this.classesModel
      .findOneAndUpdate({_id: id}, {$pull: {'students': {'user': studentID} }})
    if (!classesById) {
      throw new HttpException(`Class #${id} not found!`, HttpStatus.NOT_FOUND)
    }
    return classesById.save();
  }

  async addLessonsToClasses(id: string, { lessonHash }: ClassAndLessonDTO) {
    const classesById = await this.classesModel.findOne({ _id: id }).exec();
    if (!classesById) {
      throw new HttpException(`Class #${id} not found!`, HttpStatus.NOT_FOUND)
    }
    const hasLessons = classesById.lessons.find(i => String(i.lesson) === lessonHash);

    if (hasLessons) {
      throw new ConflictException('Lessons already exist');
    } else {
      classesById.lessons.push({ lesson: lessonHash })
      const data = await classesById.save();
      return {hash: data['_id']}
    }
  }

  async removeLessonsToClasses(id: string, lessonId: string) {
    const classesById = await this.classesModel
      .findOneAndUpdate({_id: id}, {$pull: {'lessons': {'lesson': lessonId} }})
    if (!classesById) {
      throw new HttpException(`Class #${id} not found!`, HttpStatus.NOT_FOUND)
    }
    return await classesById.save();
  }
}
