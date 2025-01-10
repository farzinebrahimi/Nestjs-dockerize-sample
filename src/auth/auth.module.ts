import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {UsersService} from "../users/users.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {PassportModule} from "@nestjs/passport";

@Module ({
	imports: [
		PassportModule,
		JwtModule.register ({
			secret: 'secret',
			signOptions: {
				expiresIn: '1d'
			},
		}),
		TypeOrmModule.forFeature ([User])],
	controllers: [AuthController],
	providers: [AuthService, UsersService,JwtStrategy],
})
export class AuthModule {
}
