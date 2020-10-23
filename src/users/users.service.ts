import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<User>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, page } = paginationQuery;

    return this.usersModel
      .find({}, {'password': 0})
      .skip(page)
      .limit(limit)
      .exec();
  }

  async findOne(id: string) {
    const user = await this.usersModel
      .findOne({ _id: id }, {'password': 0})
      .exec();
    if (!user) {
      throw new HttpException(`User #${id} not found!`, HttpStatus.NOT_FOUND)
    }
    return user
  }

  async create(createUsersDto: CreateUsersDto) {
    const user = new this.usersModel(createUsersDto);
    const existingUser =  await this.usersModel
      .findOne({ email: createUsersDto.email })
      .exec();

    if (existingUser) {
      throw new ConflictException('User already exist');
    }
    const data = await user.save();
    return {hash: data['_id']}
  }

  async update(id: string, updateUsersDto: UpdateUsersDto) {
    const existingUser = await this.usersModel
      .findOneAndUpdate({_id: id}, {$set: updateUsersDto}, {new: true})
      .exec();

    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`)
    }

    return existingUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return user.remove();
  }
}
