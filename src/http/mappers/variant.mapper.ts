import { VariantEntity } from '../entities/variant.entity';
import { Variant } from '../schemas/variant.schema';

export class VariantMapper {
  static toEntity(variantSchema: Variant): VariantEntity {
    return new VariantEntity(variantSchema);
  }
}
