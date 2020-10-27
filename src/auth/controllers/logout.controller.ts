import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
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
@Controller('logout')
export class LogoutController {

  @ApiBearerAuth()
  @ApiOperation({ summary: "Разлогинить пользователя", description: "Эндпоинт используется для разлогина пользователя. В случае успешной операции необходимо удалить идентификатор токена из кук клиента, а также очистить токен из хранилища." })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post()
  async logout(@Res() res) {
    res.cookie('token', null);
    res.send({
      success: true,
    })
  }
}
