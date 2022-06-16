import { IsString } from "class-validator";
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
    @ApiProperty({
        description: 'Senha do usuário!',
        example: 'Batatinha@123',
    })
    password: string;
}
