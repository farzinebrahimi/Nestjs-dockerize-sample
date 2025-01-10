import {IsEmail, IsString, MinLength} from "class-validator";



export class RegisterDto{

	@IsString()
	firstname: string;

	@IsString()
	lastname: string;

	@IsEmail()
	email: string;

	@IsString()
	@MinLength(6)
	password: string;
}
