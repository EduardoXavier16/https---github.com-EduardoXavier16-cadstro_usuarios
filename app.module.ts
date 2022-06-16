import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './src/prisma/prisma.module';
import { UserModule } from './src/user/user.module';
import { AuthModule } from './src/auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
