import { QueryDto } from '@/shared'
import { AppService } from '@/use-cases/app'
import { Controller, Get, Query, Version } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('Application Base Response')
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Version('1')
	@Get('/get-with-pagination')
	getWithPagination(@Query() queries: QueryDto) {
		return this.appService.getWithPagination(queries)
	}

	@Version('1')
	@Get('/get-list')
	getList() {
		return this.appService.getList()
	}

	@Version('1')
	@Get('/for-select')
	getForSelect() {
		return this.appService.getForSelect()
	}
}
