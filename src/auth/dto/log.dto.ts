import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { LogResponseDto } from './log-response.dto';

export class LogDto extends PartialType(LogResponseDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome de usuário acessado!',
    example: 'Thom Yorke',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email da conta acessada!',
    example: 'nome123sobrenome@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha da conta acessada!',
    example: 'Batatinha123',
  })
  password: string;
}
