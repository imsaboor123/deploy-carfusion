import { NestFactory } from '@nestjs/core';
import { AppModule } from './routes/general/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as ejs from 'ejs';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(express.static('public/'));
	app.use(express.static('uploads/'));
	app.use(express.static('src/views/'));

	(app as any).set('view engine', 'ejs');
	(app as any).set('views', 'src/views');
	(app as any).engine('ejs', ejs.__express);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // remove the field that are not in Dto
			forbidNonWhitelisted: true, // throw an error is field does not exits in dto
		}),
	);

	const port = process.env.PORT || 3000;

	await app.listen(port).then(() => {
		console.log(`Application is working on port ${port}`);
	});
}

bootstrap();