export class ErrorConstraint {
	constraint: string
}
export class ErrorDetail {
	field?: string | null
	message: string
	constraints?: string[]
}
