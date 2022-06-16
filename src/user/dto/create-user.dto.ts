import { IsString, Matches, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do usuário!',
    example: 'Thom Yorke',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'e-mail do usuário!',
    example: 'noma-sobreno@gmail.com',
  })
  email: string;

  @IsString()
  @MinLength(7)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z]).*$/, {
    message: 'Senha muito fraca!',
  })
  @ApiProperty({
    description: 'Senha do usuário para login',
    example: 'Batatinha@123',
  })
  password: string;
}
