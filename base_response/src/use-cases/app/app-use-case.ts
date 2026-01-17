import { databaseData } from '@/infrastructure/db'
import { QueryDto } from '@/shared'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
	getWithPagination(queries: QueryDto) {
		return {
			message: 'Data fetched successfully',
			total: databaseData?.length,
			data: databaseData
		}
	}

	getList() {
		return databaseData
	}

	getForSelect() {
		return databaseData
	}
}
