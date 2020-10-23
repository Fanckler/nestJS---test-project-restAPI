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
  Query, Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Users')
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
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "Получить польтзователей", description: "Эндпоинт используется для получения всех пользователей" })
  @ApiResponse({ status: HttpStatus.OK, description: 'Получить всех пользователей',
    content: {
      'application/json': {
        schema: {
          properties: {
            data: {
              properties: {
                name: {
                  type: 'string',
                  example: 'John Doe'
                },
                email: {
                  type: 'string',
                  example: 'jdoe@example.com'
                },
                phone: {
                  type: 'string',
                  example: '380662332377'
                },
                sex: {
                  type: 'string',
                  example: 'm'
                },
                role: {
                  type: 'string',
                  example: 'newbie'
                },
              }
            }
          }
        }
      }
    }
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return await this.usersService.findAll(paginationQuery);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Получить пользователя по id", description: "Эндпоинт используется для получения конкретного пользователя по его hash"})
  @ApiResponse({ status: HttpStatus.OK, description: 'Получить всех пользователей',
    content: {
      'application/json': {
        schema: {
          properties: {
            data: {
              properties: {
                name: {
                  type: 'string',
                  example: 'John Doe'
                },
                email: {
                  type: 'string',
                  example: 'jdoe@example.com'
                },
                phone: {
                  type: 'string',
                  example: '380662332377'
                },
                sex: {
                  type: 'string',
                  example: 'm'
                },
                role: {
                  type: 'string',
                  example: 'newbie'
                },
              }
            }
          }
        }
      }
    }
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: "Создать пользователя", description: "Эндпоинт используется для создания пользователя. Необязательное условие состоит в том чтобы добавить проверку на уникальность email."})
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Успешное создание пользователя', content: {
      'application/json': {
        schema: {
          properties: {
            id: {
              type: 'string',
              example: '5f8ff91a58fcd54de0291b05',
            }
          }
        }
      }
    }})
  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Обновить пользователя", description: "Эндпоинт используется для обновления пользователя по его ID"})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUsersDto: UpdateUsersDto) {
    return this.usersService.update(id, updateUsersDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Удалить пользователя", description: "Эндпоинт используется для удаления пользователя по его ID"})
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Успешное создание пользователя' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
