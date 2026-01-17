import { VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app/app.module'
import { swaggerConfig } from './infrastructure/config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.enableVersioning({
		type: VersioningType.URI
	})

	SwaggerModule.setup(
		'api',
		app,
		SwaggerModule.createDocument(app, swaggerConfig)
	)

	await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
