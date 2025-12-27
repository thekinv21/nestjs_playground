import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	UpdateDateColumn
} from 'typeorm'

export abstract class BaseEntity {
	@Column({
		nullable: true,
		type: 'varchar'
	})
	createdBy?: string

	@Column({
		nullable: true,
		type: 'varchar'
	})
	updatedBy?: string

	@CreateDateColumn({
		type: 'timestamp'
	})
	createdAt?: Date

	@UpdateDateColumn({
		type: 'timestamp'
	})
	updatedAt?: Date

	@DeleteDateColumn({
		nullable: true,
		default: null
	})
	deletedAt?: Date | null
}
