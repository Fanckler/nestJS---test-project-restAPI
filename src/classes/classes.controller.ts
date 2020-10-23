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
  Query, Res, UseInterceptors,
} from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClassesService } from './classes.service';
import { CreateClassesDto } from './dto/create-classes.dto';
import { UpdateClassesDto } from './dto/update-classes.dto';
import { EnrollClassesDto } from './dto/enroll-classes.dto';
import { ExpelClassesDto } from './dto/expel-classes.dto';
import { ClassAndLessonDTO } from './dto/classAndLesson.dto';
import { Class } from './entities/class.entity';
import { WrapResponseInterceptor } from '../common/interceptors/wrap-response.interceptor';

@ApiTags('Classes')
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
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "Получить потоки", description: "Эндпоинт используется получения всех потоков" })
  @ApiResponse({ status: HttpStatus.OK, description: 'Получить все потоки'})
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.classesService.findAll(paginationQuery)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Получить поток по id", description: "Эндпоинт используется получения потока по его id"})
  @ApiResponse({ status: HttpStatus.OK, type: Class, description: 'Получить поток'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(id)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Создать поток", description: "Эндпоинт используется для создания потока"})
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Успешное создание потока',
    content: {
      'application/json': {
        schema: {
          properties: {
            data: {
              properties: {
                id: {
                  type: 'string',
                  example: '5f885c6603536949ef3b6a29'
                }
              }
            }
          }
        }
      }
    }
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createClassesDto: CreateClassesDto) {
    return this.classesService.create(createClassesDto)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Обновить поток", description: "Эндпоинт используется для обновления потока по его id"})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateClassesDto: UpdateClassesDto) {
    return this.classesService.update(id, updateClassesDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Удалить поток", description: "Эндпоинт используется для удаления потока по его id"})
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.classesService.remove(id);
  }


  @Post(':id/enroll')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Зачислить студента на поток", description: "Эндпоинт используется для зачисления студента на поток"})
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Успех: Отсутствует тело ответа'})
  @HttpCode(HttpStatus.NO_CONTENT)
  enroll(@Param('id') id: string, @Body() enrollClassesDto: EnrollClassesDto) {
    return this.classesService.enroll(id, enrollClassesDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Отчислить студента с поток", description: "Эндпоинт используется для отчисления студента на поток"})
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Успех: Отсутствует тело ответа'})
  @Post(':id/expel')
  @HttpCode(HttpStatus.NO_CONTENT)
  expel(@Param('id') id: string, @Body() expelClassesDto: ExpelClassesDto) {
    return this.classesService.expel(id, expelClassesDto);
  }

  @ApiBearerAuth()
  @Post(':id/lessons')
  @ApiOperation({ summary: "Добавить урок к потоку", description: "Эндпоинт используется для добавления урока к потоку."})
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Успешное добавление урока',
    content: {
      'application/json': {
        schema: {
          properties: {
            data: {
              properties: {
                id: {
                  type: 'string',
                  example: '5f8abcfa34647cca999189ec'
                }
              }
            }
          }
        }
      }
    }
  })
  @HttpCode(HttpStatus.CREATED)
  addLessonsToClasses(@Param('id') id: string, @Body() classAndLessonDTO: ClassAndLessonDTO) {
    return this.classesService.addLessonsToClasses(id, classAndLessonDTO);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Удалить урок c потока", description: "Эндпоинт используется для удаления урока с потока."})
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Успех: Отсутствует тело ответа'})
  @Delete(':id/lessons/:lessonId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeLessonsToClasses(@Param() {id, lessonId}) {
    return this.classesService.removeLessonsToClasses(id, lessonId);
  }
}
