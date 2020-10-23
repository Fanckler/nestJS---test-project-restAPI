import {
  Controller,
  HttpCode,
  HttpStatus,
  Post, Req,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { AuthService } from '../auth.service';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';

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
@Controller('login')
export class LoginController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Public()
  @ApiOperation({ summary: "Залогинить пользователя", description: "Эндпоинт используется для логина пользователя. После успешного логина необходимо в куки клиента записать идентификатор токена, который будет автоматически подкладываться во все последующие запросы."})
  @ApiImplicitParam({name:"auth", description: "base64 string concatenated email + : + password", schema: { type: "string", example: 'Base ewoJImVtYWlsIjogImpkb2VAZXhhbXBsZS5jb20iLAoJInBhc3MiOiAiYWIxMjM0NUNkIgp9'}, required: true, type: "string"})
  @ApiResponse({ status: HttpStatus.OK, description: 'Успех: Отсутствует тело ответа'})
  @HttpCode(HttpStatus.OK)
  @Post()
  async login(@Req() {headers} , @Res() res) {
    const token = await this.authService.validateUser(headers);
    res.cookie('token', token, {expires: new Date(Date.now() + 9999999), httpOnly: true})
    res.send({
      success: true,
    })
  }
}
