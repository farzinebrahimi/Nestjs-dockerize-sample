import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../jwt-auth/jwt-auth.guard";

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard) // Apply guard here
  @Post()
  create(@Request() req, @Body() createProductDto) {
    console.log(req.user); // Log the attached user
    return this.productsService.create({
      ...createProductDto,
      user: req.user.userId, // Use user ID from JWT
    });
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
