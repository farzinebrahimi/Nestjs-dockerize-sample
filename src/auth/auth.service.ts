import {HttpException, Injectable} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from "./dto/register.dto";
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';
import {User} from "../users/entities/user.entity";
import {JwtService} from "@nestjs/jwt";


@Injectable ()
export class AuthService {
	constructor (private readonly userService: UsersService,
	private readonly jwtService: JwtService,
	) {
	}
	

	async register (registerDto: RegisterDto) {
		const user = await this.userService.findUserByEmail (registerDto.email);
		if (user) {
			throw new HttpException ('User already exists', 400);
		}


		registerDto.password = await bcrypt.hash (registerDto.password, 10);
		

		return await this.userService.createUser (registerDto);
	}

	async login (loginDto: LoginDto) {
		const user: User = await this.userService.findUserByEmail (loginDto.email);
		if (!user) {
			throw new HttpException ('User not found', 400);
		}
		 const isPasswordMatching = await bcrypt.compare (
			loginDto.password,
			user.password
		);
		if (!isPasswordMatching) {
			throw new HttpException ('Password wrong', 400);
		}
		
		const accessToken = this.jwtService.sign({
			sub: user.id,
			email: user.email,
		});
		return {accessToken: accessToken}; 
	}


	//forget password
	//reset password
}
