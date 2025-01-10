import {Column, ManyToOne, Entity, PrimaryGeneratedColumn, JoinColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity ('products')
export class Product {
	@PrimaryGeneratedColumn ()
	id: number;
	
	@Column({ length: 50, nullable: true})
	title: string;
	
	@Column({ nullable: true})
	description: string;
	
	@Column({nullable: true})
	price: number;
	
	@Column('int', {nullable: true})
	@ManyToOne(() => User, (user: User) => user.id) 
	@JoinColumn({name: 'user'})
	user: User;
}
