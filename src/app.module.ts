import { MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {join} from 'path'
import {UsersModule} from './users/users.module';
import {LoggerMiddleware} from "./logger/logger.middleware";
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module ({
	imports: [
		TypeOrmModule.forRoot ({
			type: 'postgres',
			host: 'db',
			port: 5432,
			username: 'postgres',
			password: 'postgres',
			database: 'postgres',
			entities: [join (__dirname, '**', '*.entity.{ts,js}')],
			synchronize: true,
			autoLoadEntities: true
		}),
		UsersModule,
		AuthModule,
		ProductsModule,],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure (consumer: MiddlewareConsumer) {
		consumer.apply (LoggerMiddleware).forRoutes ('*');
	}
}
