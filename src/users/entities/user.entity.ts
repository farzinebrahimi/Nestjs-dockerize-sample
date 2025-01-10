import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import * as bcrypt from"bcrypt";
@Entity("users")
export class User {
	@PrimaryGeneratedColumn()
	id: number;
	

	@Column({type: 'varchar', length: 50, nullable: false})
	firstname: string;
	
	@Column({type: 'varchar', length: 50, nullable: false})
	lastname: string;
	
	@Column({type: 'varchar', length: 50, nullable: false, unique:true})
	email: string;
	
	
	@Column({select: false, nullable: false, })
	password: string;
	
	// @BeforeInsert()
	// async hashPassword(){
	// 	this.password = await bcrypt.hashSync(this.password, 10);
	// }
	
}
