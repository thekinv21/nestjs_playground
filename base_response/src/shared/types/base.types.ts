export type TPaginatedResponse<T> = {
	message: string
	data: T[]
	total: number
}
