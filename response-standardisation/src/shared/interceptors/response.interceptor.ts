import { ErrorDetail, TPaginatedResponse, TResponse } from '@/shared/dto'
import { StatusEnum } from '@/shared/enum'
import {
	CallHandler,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	NestInterceptor
} from '@nestjs/common'
import { randomUUID, UUID } from 'crypto'
import { Request, Response } from 'express'
import { catchError, map, Observable, throwError } from 'rxjs'

type TResponseInterceptor<T> = TPaginatedResponse<T> | TResponse<T>

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
	T,
	TResponseInterceptor<T>
> {
	intercept(
		context: ExecutionContext,
		next: CallHandler
	): Observable<TResponseInterceptor<T>> {
		return next.handle().pipe(
			map((res: T | T[] | TPaginatedResponse<T>) =>
				this.handleResponse(res, context)
			),
			catchError((error: HttpException) =>
				throwError(() => this.handleError(error, context))
			)
		)
	}

	/**
	 * Error handler
	 */

	private handleError(exception: HttpException, context: ExecutionContext) {
		const response: Response = context.switchToHttp().getResponse()
		const request: Request = context.switchToHttp().getRequest()

		const statusCode: number =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR

		const traceId: UUID = randomUUID()
		let errorMessage: string = exception?.message
		let errorDetails: ErrorDetail[] | null = null

		if (exception?.name === 'BadRequestException') {
			const errorResponse = exception.getResponse()
			if (typeof errorResponse === 'object' && errorResponse !== null) {
				if ('message' in errorResponse) {
					const messages: string = (errorResponse as unknown as ErrorDetail)
						?.message

					errorDetails = parseValidationError(messages)
				}
				if (
					'error' in errorResponse &&
					typeof errorResponse['error'] === 'string'
				) {
					errorMessage = errorResponse['error']
				}
			}
		}

		const errorBody = {
			timeStamp: new Date().toISOString(),
			traceId,
			statusCode,
			method: request.method,
			endPoint: request.url,
			error: {
				errorType: exception.name,
				errorMessage,
				errorDetails,
				path: request.url,
				method: request.method
			}
		}

		response.status(statusCode).json(errorBody)
	}

	/**
	 * Response handler
	 */

	private handleResponse(
		res: T | T[] | TPaginatedResponse<T>,
		context: ExecutionContext
	): TResponseInterceptor<T> {
		const response: Response = context.switchToHttp().getResponse()
		const request: Request = context.switchToHttp().getRequest()

		const traceId: UUID = randomUUID()
		const page: number = parseInt(request.query?.offset as string) || 0
		const size: number = parseInt(request.query?.limit as string) || 10

		if (res && typeof res === 'object' && 'total' in res && 'content' in res) {
			const totalItems: number = res['total'] as number
			const totalPages: number = Math.ceil(totalItems / size)

			return {
				timeStamp: new Date().toISOString(),
				traceId,
				method: request?.method,
				endPoint: request?.url,
				statusCode: response.statusCode,
				message: StatusEnum.SUCCESS,
				offset: page,
				limit: size,
				totalPages,
				totalItems,
				content: res['content'] as T[]
			} as TPaginatedResponse<T>
		}

		return {
			timeStamp: new Date().toISOString(),
			traceId,
			method: request?.method,
			endPoint: request?.url,
			statusCode: response.statusCode,
			message: StatusEnum.SUCCESS,
			content: res as T
		} as TResponse<T>
	}
}

function parseValidationError(messages: string[] | string): ErrorDetail[] {
	if (!messages) return []
	if (typeof messages === 'string') messages = [messages]

	return messages?.map((msg: string) => {
		const fieldMatch: RegExpMatchArray | null = msg.match(/^(\w+)\s/)
		const constraintMatch: string = msg.split(/\s(.+)/)[1]

		return {
			field: fieldMatch ? fieldMatch[1] : null,
			message: msg,
			constraints: constraintMatch ? [constraintMatch.trim()] : []
		}
	})
}
