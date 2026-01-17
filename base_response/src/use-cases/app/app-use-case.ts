import { databaseData } from '@/infrastructure/db'
import { QueryDto } from '@/shared'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
	execute(queries: QueryDto) {
		return {
			paginated: true,
			data: databaseData,
			meta: {
				totalItems: databaseData.length,
				itemCount: databaseData.length,
				itemsPerPage: queries.limit,
				totalPages: 1,
				currentPage: 1
			}
		}
	}
}
