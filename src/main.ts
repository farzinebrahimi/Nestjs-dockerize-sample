import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as passport from 'passport'
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*-------------Swagger Configuration-------------*/
  const config = new DocumentBuilder()
      .setTitle('swagger-test')
      .setDescription('This is the test of swagger api')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  /*-------------API-------------*/
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  
  /*-------------express session-------------*/
  app.use(session({
    secret: 'secret', 
    resave: false, 
    saveUninitialized: true, 
    cookie: { secure: false },
  }));
  /*-------------passport init-------------*/
  app.use(passport.initialize());
  app.use(passport.session());
  
  await app.listen(3000);
}
bootstrap();
