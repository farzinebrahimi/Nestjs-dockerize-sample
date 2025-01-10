import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity ('products')
export class Product {
	@PrimaryGeneratedColumn ()
	id: number;
	
	@Column({type: 'varchar', length: 50, nullable: false})
	title: string;
	
	@Column({type: 'varchar', length: 255, nullable: false})
	description: string;
	
	@Column('float')
	price: number;
}
