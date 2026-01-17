import { ApiProperty } from '@nestjs/swagger'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

/**
 * Type definition for QueryDtoType
 */

export const QueryDtoSchema = z.object({
	offset: z.coerce
		.number()
		.int()
		.nonnegative()
		.default(0)
		.describe('Offset for pagination'),
	limit: z.coerce
		.number()
		.int()
		.positive()
		.default(10)
		.describe('Limit for pagination'),
	searchTerm: z.string().optional().default('').describe('Search term'),
	sortBy: z.string().optional().default('').describe('Sort by field')
})

export class QueryDto extends createZodDto(QueryDtoSchema) {
	@ApiProperty({
		description: 'Offset for pagination',
		example: 0,
		required: false,
		default: 0
	})
	offset: number

	@ApiProperty({
		description: 'Limit for pagination',
		example: 10,
		required: false,
		default: 10
	})
	limit: number

	@ApiProperty({
		description: 'Search term',
		required: false
	})
	searchTerm: string

	@ApiProperty({
		description: 'Sort by field',
		required: false
	})
	sortBy: string
}
