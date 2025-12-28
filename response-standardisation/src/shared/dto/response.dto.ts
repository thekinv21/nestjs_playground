import { ApiProperty } from '@nestjs/swagger'

/**
 * Base api response
 */

export class TResponse<T> {
	@ApiProperty({
		example: '2025-11-14T09:30:00.000Z',
		type: 'string',
		format: 'date-time'
	})
	timeStamp: string

	@ApiProperty({
		example: 'Method',
		type: 'string'
	})
	method: string

	@ApiProperty({
		example: 'endpoint URI',
		type: 'string'
	})
	endPoint: string

	@ApiProperty({
		example: 200,
		type: 'number'
	})
	statusCode: number

	@ApiProperty({
		example: 'Message for API response',
		type: 'string'
	})
	message?: string

	@ApiProperty({
		required: false
	})
	content?: T
}

/**
 * Paginated api response
 */
export class TPaginatedResponse<T> {
	@ApiProperty({
		example: '2025-11-14T09:30:00.000Z',
		type: 'string',
		format: 'date-time'
	})
	timeStamp: string

	@ApiProperty({
		example: 'Method',
		type: 'string'
	})
	method: string

	@ApiProperty({
		example: 'endpoint URI',
		type: 'string'
	})
	endPoint: string

	@ApiProperty({
		example: 200,
		type: 'number'
	})
	statusCode: number

	@ApiProperty({
		example: 'API message',
		type: 'string'
	})
	message?: string

	@ApiProperty({
		example: 1,
		type: 'number'
	})
	offset: number

	@ApiProperty({
		example: 10,
		type: 'number'
	})
	limit: number

	@ApiProperty({
		example: 5,
		type: 'number'
	})
	totalPages: number

	@ApiProperty({
		example: 48,
		type: 'number'
	})
	totalItems: number

	@ApiProperty({
		type: 'array',
		required: false
	})
	content?: T[]
}

/**
 * Pagination Dto
 */

export class PaginationDto<T> {
	total: number
	content: T[]
}
