import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsString } from 'class-validator';

export class LogResponseDto {
  @IsString()
  @ApiProperty({
    description: 'JWT gerado pelo login',
    example: 'rfirufgbiurbgfiurbgfiuriufgbriugfhiurgiurhigubrikgbiurt',
  })
  token: string;

  @ApiProperty({
    description: 'Dados fornecidos pelo usuário!',
  })
  user: User;
}
