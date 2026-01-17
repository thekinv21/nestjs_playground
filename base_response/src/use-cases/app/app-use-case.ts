import { databaseData } from '@/infrastructure/db'
import { UserDto } from '@/presentation/dto/user'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
	execute(): UserDto[] {
		return databaseData
	}

	getAll() {}
}
