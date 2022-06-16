import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LogResponseDto } from './dto/log-response.dto';
import { LogDto } from './dto/log.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(logDto: LogDto): Promise<LogResponseDto> {
    const { email, password } = logDto;
    const user = await this.prisma.user.findUnique({ where: { email }});

    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senhas estão incorretos!');
    }
    const correctSecret = await bcrypt.compare(password, user.password);

    if (!correctSecret) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos!');
    }
    delete user.password;

    return { token: this.jwtService.sign({ email }), user };
  }
}
