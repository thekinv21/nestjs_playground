import { IUserController } from '@/presentation/interfaces'

import { Controller } from '@nestjs/common'
import { UUID } from 'crypto'
import { CreateUserDto, UpdateUserDto, UserDto } from '../dto'

@Controller('user')
export class UserController implements IUserController {
	constructor() {}
	getAll(): Promise<UserDto[]> {
		return null
	}
	getById(id: UUID): Promise<UserDto> {
		return null
	}
	getMe(userId: UUID): Promise<UserDto> {
		return null
	}
	create(dto: CreateUserDto): Promise<UserDto> {
		return null
	}
	update(dto: UpdateUserDto): Promise<UserDto> {
		return null
	}
	delete(id: UUID): Promise<void> {
		return null
	}
	toggle(id: UUID): Promise<void> {
		return null
	}
}
