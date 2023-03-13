import { Controller, Delete, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductMapper } from '../mappers/product.mapper';
import { Product, ProductDocument } from '../schemas/product.schema';

@Controller('product')
export class ProductController {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const data = await this.productModel.findById(id).exec();
    if (!data) return;
    const product = ProductMapper.toEntity(data);
    product.delete({
      email: 'user',
      ldap: 12345678,
      name: 'example@example.com',
    });

    await this.productModel.findByIdAndUpdate(id, product.info);
  }
}
