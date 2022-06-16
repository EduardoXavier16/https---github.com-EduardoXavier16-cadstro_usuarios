import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return 'Server is run! \n Please check http://localhost:3333/api for swagger docs...';
  }
}
