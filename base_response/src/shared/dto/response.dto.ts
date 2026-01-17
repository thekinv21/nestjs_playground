import { z } from 'zod'

/**
 * Type definition for ResponseDtoType
 */

export const ResponseDtoSchema = <T extends z.ZodType>(dataSchema: T) =>
	z.object({
		error: z.boolean(),
		message: z.string().min(1, 'Response Message cannot be empty.'),
		data: dataSchema
	})

export class ResponseDto<T> {
	error: boolean
	message: string
	data: T
}

export type ResponseDtoType<T> = z.infer<
	ReturnType<typeof ResponseDtoSchema<z.ZodType<T>>>
>

/**
 * Type definition for PaginatedMetaDtoType and PaginatedResponseDtoType
 */

export const PaginatedMetaDtoSchema = z.object({
	offset: z.number().int().nonnegative(),
	limit: z.number().int().positive(),
	total: z.number().int().nonnegative(),
	totalPage: z.number().int().nonnegative(),
	isLast: z.boolean(),
	isFirst: z.boolean(),
	isEmpty: z.boolean()
})

export const PaginatedResponseDtoSchema = <T extends z.ZodType>(
	contentSchema: T
) =>
	z.object({
		error: z.boolean(),
		message: z.string().min(1, 'Response Message cannot be empty.'),
		data: z.object({
			content: contentSchema,
			meta: PaginatedMetaDtoSchema
		})
	})

export class PaginatedMetaDto {
	offset: number
	limit: number
	total: number
	totalPage: number
	isLast: boolean
	isFirst: boolean
	isEmpty: boolean
}

export class PaginatedResponseDto<T> {
	error: boolean
	message: string
	data: {
		content: T
		meta: PaginatedMetaDto
	}
}

export type PaginatedMetaDtoType = z.infer<typeof PaginatedMetaDtoSchema>

export type PaginatedResponseDtoType<T> = z.infer<
	ReturnType<typeof PaginatedResponseDtoSchema<z.ZodType<T>>>
>

/**
 * Type definition for ErrorResponseDtoType
 */

export const ErrorResponseDtoSchema = <T extends z.ZodType>(detailsSchema: T) =>
	z.object({
		error: z.boolean(),
		message: z.string().min(1, 'Response Message cannot be empty.'),
		details: detailsSchema
	})

export class ErrorResponseDto<T> {
	error: boolean
	message: string
	details: T
}

export type ErrorResponseDtoType<T> = z.infer<
	ReturnType<typeof ErrorResponseDtoSchema<z.ZodType<T>>>
>
