import { ProductEntity } from '../entities/product.entity';
import { Product } from '../schemas/product.schema';

export class ProductMapper {
  static toEntity(productSchema: Product): ProductEntity {
    return new ProductEntity(productSchema);
  }
}
