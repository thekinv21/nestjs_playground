import { UserController } from '@/presentation/controllers/user.controller'
import { Module } from '@nestjs/common'

@Module({
	imports: [],
	controllers: [UserController],
	providers: []
})
export class UserModule {}
