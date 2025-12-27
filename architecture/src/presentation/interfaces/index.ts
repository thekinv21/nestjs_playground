import { UUID } from 'crypto'

import { CreateUserDto, UpdateUserDto, UserDto } from '@/presentation/dto'

export interface IUserController {
	getAll(): Promise<UserDto[]>
	getById(id: UUID): Promise<UserDto>
	getMe(userId: UUID): Promise<UserDto>
	create(dto: CreateUserDto): Promise<UserDto>
	update(dto: UpdateUserDto): Promise<UserDto>
	delete(id: UUID): Promise<void>
	toggle(id: UUID): Promise<void>
}
