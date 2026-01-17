import { AppController } from '@/presentation/controller/app.controller'
import { Module } from '@nestjs/common'
import { AppService } from '../use-cases/app/app-use-case'

@Module({
	imports: [],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
