import {
	CallHandler,
	ExecutionContext,
	HttpException,
	Injectable,
	Logger,
	NestInterceptor
} from '@nestjs/common'
import { Request, Response } from 'express'
import { catchError, map, Observable, throwError } from 'rxjs'
import { ErrorResponseDto, PaginatedResponseDto, ResponseDto } from '../../dto'

type TTransformIntercept<T> =
	| ResponseDto<T>
	| PaginatedResponseDto<T>
	| ErrorResponseDto<T>

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
	T,
	TTransformIntercept<T>
> {
	intercept(
		context: ExecutionContext,
		next: CallHandler
	): Observable<TTransformIntercept<T>> {
		return next.handle().pipe(
			map((res: T) => this.responseHandler(res, context)),
			catchError((exception: HttpException) => {
				return this.errorHandler(exception, context)
			})
		)
	}

	/**
	 * Handles the response before sending it to the client.
	 */

	private responseHandler(
		res: T,
		context: ExecutionContext
	): TTransformIntercept<T> {
		const logger = new Logger(TransformInterceptor.name)

		const response = context.switchToHttp().getResponse<Response>()
		const request = context.switchToHttp().getRequest<Request>()

		/**
		 * @description: If request query has offset and limit, then it's a
		 * paginated response and we return PaginatedResponseDto
		 */

		if (
			request?.query !== undefined &&
			request?.query?.offset !== undefined &&
			request?.query?.limit !== undefined
		) {
			logger.warn('Paginated Response', {
				offset: +request.query.offset,
				limit: +request.query.limit
			})

			return new PaginatedResponseDto<T>()
		}

		/**
		 * @description: If request query does not have offset and limit, then it's
		 * normal response and we return ResponseDto
		 */

		logger.debug('Normal Response', {
			offset: request.query.offset,
			limit: request.query.limit
		})

		return new ResponseDto<T>()
	}

	/**
	 * Error handler before sending the response to the client.
	 */

	private errorHandler(exception: HttpException, context: ExecutionContext) {
		return throwError(() => ({
			error: true,
			message: exception?.message,
			details: exception
		}))
	}
}
