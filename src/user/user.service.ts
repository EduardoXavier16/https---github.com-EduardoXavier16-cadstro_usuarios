import { BadRequestException,
  Injectable,
  NotFoundException, } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { handleError } from '../utils/handle-error.util';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    name: true,
    email: true,
    password: false,
    createdAt: true,
    updatedAt: true,
  };
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.password) {
      throw new BadRequestException('As senhas informadas não conferem!');
    }
    delete createUserDto.password;
    const data: User = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    return this.prisma.user
      .create({
        data,
        select: this.delete,
      })
      .catch(handleError);
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: this.userSelect,
    });
  }

  async findOne(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });
    if (!record) {
      throw new NotFoundException(`Registro com o id '${id}' não encontrado`);
    }
    return record;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findOne(id);
    if (dto.password) {
      if (dto.password != dto.password) {
        throw new BadRequestException('As senhas informadas não conferem!');
      }
    }
    delete dto.password;
    const data: Partial<User> = { ...dto };
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.prisma.user.update({
      where: { id },
      data,
      select: this.userSelect,
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
