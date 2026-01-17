import { AppService } from '@/use-cases/app'
import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('Application Base Response')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/hello-world')
	execute(): string {
		return this.appService.execute()
	}
}
