import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity('user')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ unique: true, type: 'varchar', nullable: false })
	username: string

	@Column({ unique: true, type: 'varchar', nullable: false })
	email: string

	@Column({ nullable: true, type: 'varchar', default: null })
	firstName?: string | null

	@Column({ nullable: true, type: 'varchar', default: null })
	lastName?: string | null

	@Column({ default: true, type: 'boolean' })
	isActive: boolean
}
