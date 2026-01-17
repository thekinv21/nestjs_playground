import { AppService } from '@/use-cases/app'
import { Controller, Get } from '@nestjs/common'


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
execute(): string {
    return this.appService.execute();
  }
}
