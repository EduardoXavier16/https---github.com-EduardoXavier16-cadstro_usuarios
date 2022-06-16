import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { LogResponseDto } from './dto/log-response.dto';
import { LogDto } from './dto/log.dto';
import { LoggedUser } from './logged-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Realiza o login através de token de AUTH!',
  })
  login(@Body() logDto: LogDto): Promise<LogResponseDto> {
    return this.authService.login({ logDto });
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiProperty({
    description: 'Retorna a autenticação do usuário!',
  })
  profile(@LoggedUser() user: User) {
    return user;
  }
}
