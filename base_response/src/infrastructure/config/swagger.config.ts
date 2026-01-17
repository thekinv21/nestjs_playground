import { DocumentBuilder } from '@nestjs/swagger'

export const swaggerConfig = new DocumentBuilder()
	.setTitle('Base Response API')
	.setDescription('NestJS Api the base response standardization')
	.setVersion('1.0')
	.addTag('base-response')
	.build()
