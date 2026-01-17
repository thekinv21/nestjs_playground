import {
	CallHandler,
	ExecutionContext,
	Injectable,
	Logger,
	NestInterceptor
} from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { ErrorResponseDto, PaginatedResponseDto, ResponseDto } from '../dto'

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
		return next
			.handle()
			.pipe(map((res: T) => this.handleResponse(res, context)))
	}

	/**
	 * Handles the response before sending it to the client.
	 */

	private handleResponse(
		res: T,
		context: ExecutionContext
	): TTransformIntercept<T> {
		const logger = new Logger(TransformInterceptor.name)

		const response: Response = context.switchToHttp().getResponse()
		const request: Request = context.switchToHttp().getRequest()

		logger.debug(request)

		return res as TTransformIntercept<T>
	}
}
