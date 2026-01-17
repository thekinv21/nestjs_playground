import { TPaginatedResponse } from '@/shared/types'
import {
	CallHandler,
	ExecutionContext,
	HttpException,
	Injectable,
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
		const request = context.switchToHttp().getRequest<Request>()
		const response = context.switchToHttp().getResponse<Response>()

		/**
		 * @description: If request query has offset and limit, then it's a
		 * paginated response and we return PaginatedResponseDto
		 */

		if (
			request?.query !== undefined &&
			request?.query?.offset !== undefined &&
			request?.query?.limit !== undefined
		) {
			const offset: number = +request.query.offset
			const limit: number = +request.query.limit

			const paginatedData = res as TPaginatedResponse<unknown>
			const content = paginatedData && paginatedData?.data
			const total: number = paginatedData && paginatedData?.total
			const message: string = paginatedData && paginatedData?.message

			const totalPage: number = Math.ceil(total / limit)
			const currentPage: number = Math.floor(offset / limit) + 1

			const isLastPage: boolean = offset + limit >= total

			const isFirstPage: boolean = offset === 0

			const isEmpty: boolean =
				content && Array.isArray(content) && content?.length === 0

			return {
				error: false,
				message,
				data: {
					meta: {
						offset,
						limit,
						total,
						totalPage,
						currentPage,
						isFirstPage,
						isLastPage,
						isEmpty
					},
					content: content as T[]
				}
			}
		}

		/**
		 * @description: If request query does not have offset and limit, then it's
		 * normal response and we return ResponseDto
		 */

		return {
			error: false,
			message: 'Request successful',
			data: res
		}
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
