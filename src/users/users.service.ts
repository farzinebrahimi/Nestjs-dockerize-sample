import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";

@Injectable ()
export class UsersService {

	constructor (@InjectRepository (User) private readonly userRepository: Repository<User>) {
	}

	createUser = async (data: CreateUserDto) => {
		const user = await this.userRepository.create (data);

		return this.userRepository.save (user);
	}

	findAll = async () => {
		return await this.userRepository.find ();
	}

	async findUserByEmail (email: string) {
		return await this.userRepository.findOne ({
			where: {email},
			select: ['email', 'password', 'firstname', 'lastname']
		});
	}

	findOne (id: number) {
		return `This action returns a #${id} user`;
	}

	update (id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove (id: number) {
		return `This action removes a #${id} user`;
	}
}
