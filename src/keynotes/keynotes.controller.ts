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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Lesson } from '../lessons/entities/lesson.entity';
import { KeynotesService } from './keynotes.service';
import { CreateKeynoteDTO } from './dto/create-keynote.dto';
import { UpdateKeynoteDto } from './dto/update-keynote.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@ApiTags('Keynotes')
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
@Controller('keynotes')
export class KeynotesController {
  constructor(private readonly keynotesService: KeynotesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "Получить все видео", description: "Эндпоинт используется получения всех видео." })
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.keynotesService.findAll(paginationQuery);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Получить видео по id", description: "Эндпоинт используется получение видео по id." })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keynotesService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Создать видео", description: "Эндпоинт используется для создание видео." })
  @ApiResponse({ status: HttpStatus.CREATED, type: Lesson, description: 'Успешное создание записи' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createKeynoteDTO: CreateKeynoteDTO) {
    return this.keynotesService.create(createKeynoteDTO)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Обновить видео", description: "Эндпоинт используется для обновления видео." })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateKeynoteDto: UpdateKeynoteDto) {
    return this.keynotesService.update(id, updateKeynoteDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Удалить видео", description: "Эндпоинт используется для удаления видео." })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keynotesService.remove(id);
  }
}
