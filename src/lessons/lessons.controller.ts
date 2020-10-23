import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LessonsService } from './lessons.service';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonsDto } from './dto/create-lessons.dto';
import { UpdateLessonsDto } from './dto/update-lessons.dto';

@ApiTags('Lessons')
@ApiResponse({ status: 400, description: 'Не верный пейлоад',
  content: {
    'application/json': {
      schema: {
        properties: {
          message: {
            type: 'string',
            example: 'incorrect payload'
          }
        }
      }
    }
  }
})
@ApiResponse({ status: 401, description: 'Пользователь не авторизирован',
  content: {
    'application/json': {
      schema: {
        properties: {
          message: {
            type: 'string',
            example: 'Unauthorized'
          }
        }
      }
    }
  }
})
@ApiResponse({ status: 500, description: 'Серверная ошибка',
  content: {
    'application/json': {
      schema: {
        properties: {
          message: {
            type: 'string',
            example: 'some server error'
          }
        }
      }
    }
  }
})
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "Получить уроки", description: "Эндпоинт используется получения всех уроков"})
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.lessonsService.findAll(paginationQuery);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Получить урок по id", description: "Эндпоинт используется получения урока по его hash"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Создать урок", description: "Эндпоинт используется для создания урока"})
  @ApiResponse({ status: HttpStatus.CREATED, type: Lesson, description: 'Успешное создание потока' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLessonsDto: CreateLessonsDto) {
    return this.lessonsService.create(createLessonsDto)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Обновить урок", description: "Эндпоинт используется для обновления урока по его hash"})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateLessonsDto: UpdateLessonsDto) {
    return this.lessonsService.update(id, updateLessonsDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Удалить урок", description: "Эндпоинт используется для удаления урока по его hash"})
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Добавить видео к уроку по id", description: "Эндпоинт используется для добавления видео к уроку"})
  @Post(':id/videos')
  @HttpCode(HttpStatus.NO_CONTENT)
  addVideoById(@Param('id') id, @Body() {videoHash}) {
    return this.lessonsService.addVideoById(id, videoHash)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Добавить презентацию к уроку по id", description: "Эндпоинт используется для добавления презентации к уроку"})
  @Post(':id/keynotes')
  @HttpCode(HttpStatus.NO_CONTENT)
  addKeynotesById(@Param('id') id: string, @Body() {keynoteHash}) {
    return this.lessonsService.addKeynoteById(id, keynoteHash)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Получить видео по уроку", description: "Эндпоинт используется для получения видео по уроку"})
  @Get(':id/videos/:videoId')
  @HttpCode(HttpStatus.OK)
  getVideoByLesson(@Param() { id, videoId }) {
    return this.lessonsService.getVideoByLesson(id, videoId)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Удалить видео из уроку", description: "Эндпоинт используется для удаления видео из урока"})
  @Delete(':id/videos/:videoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteVideoFromLesson(@Param() { id, videoId }) {
    return this.lessonsService.deleteVideoFromLesson(id, videoId)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Получить презентацию по уроку", description: "Эндпоинт используется для получения презентации по уроку"})
  @Get(':id/keynotes/:keynoteId')
  @HttpCode(HttpStatus.OK)
  getKeynoteByLesson(@Param() { id, keynoteId }) {
    return this.lessonsService.getKeynoteByLesson(id, keynoteId)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Удалить презентацию из урока", description: "Эндпоинт используется для удаления презентации из урока"})
  @Delete(':id/keynotes/:keynoteId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteKeynoteFromLesson(@Param() { id, keynoteId }) {
    return this.lessonsService.deleteKeynoteFromLesson(id, keynoteId)
  }

}
