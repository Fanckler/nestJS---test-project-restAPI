import {
  Body,
  Controller, Delete, Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateVideoDTO } from './dto/create-video.dto';
import { VideosService } from './videos.service';
import { Lesson } from '../lessons/entities/lesson.entity';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@ApiTags('Videos')
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
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "Получить все презентации", description: "Эндпоинт используется получения всех презентаций." })
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.videosService.findAll(paginationQuery);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Получить презентацию по id", description: "Эндпоинт используется получения презентации по id." })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Создать презентацию", description: "Эндпоинт используется для создания презентации." })
  @ApiResponse({ status: HttpStatus.CREATED, type: Lesson, description: 'Успешное создание видеоролика' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createVideoDTO: CreateVideoDTO) {
    return this.videosService.create(createVideoDTO)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Обновить презентацию", description: "Эндпоинт используется для обновдения презентации." })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Удалить презентацию", description: "Эндпоинт используется для удаления презентации." })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}
