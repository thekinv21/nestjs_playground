import { VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app/app.module'
import { swaggerConfig } from './infrastructure'
import { TransformInterceptor } from './shared'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.enableVersioning({
		type: VersioningType.URI
	})

	SwaggerModule.setup(
		'docs',
		app,
		SwaggerModule.createDocument(app, swaggerConfig)
	)

	app.useGlobalInterceptors(new TransformInterceptor())

	await app.listen(process.env.PORT ?? 4200)

	console.log(
		`Swagger documentation: http://localhost:${process.env.PORT ?? 4200}/docs`
	)
}
bootstrap()
