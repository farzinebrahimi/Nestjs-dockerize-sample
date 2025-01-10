import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./entities/product.entity";
import {Repository} from "typeorm";

@Injectable()
export class ProductsService {

  constructor (@InjectRepository (Product) private readonly productRepo: Repository<Product>) {
  }
  create = async (data: CreateProductDto) => {
    const product = await this.productRepo.create(data);
    return this.productRepo.save(product);
  }

  findAll = async() =>  {
    return await this.productRepo.find(); 
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
