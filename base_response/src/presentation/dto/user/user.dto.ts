import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
	@ApiProperty({
		example: 'u-001',
		description: 'Unique identifier for the user'
	})
	id: string

	@ApiProperty({
		example: 'John',
		description: 'First name of the user'
	})
	firstName: string

	@ApiProperty({
		example: 'Doe',
		description: 'Last name of the user'
	})
	lastName: string

	@ApiProperty({
		example: 'john.doe@example.com',
		description: 'Email address of the user'
	})
	email: string

	@ApiProperty({
		example: 'ADMIN',
		description: 'Role assigned to the user'
	})
	role: string

	@ApiProperty({
		example: true,
		description: 'Indicates if the user is active'
	})
	isActive: boolean

	@ApiProperty({
		example: '2024-01-05T10:15:30Z',
		description: 'Timestamp when the user was created'
	})
	createdAt: string
}
