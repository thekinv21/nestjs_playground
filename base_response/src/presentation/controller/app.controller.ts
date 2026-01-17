import { QueryDto } from '@/shared'
import { AppService } from '@/use-cases/app'
import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('Application Base Response')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/hello-world')
	execute(@Query() queries: QueryDto) {
		return this.appService.execute(queries)
	}
}
