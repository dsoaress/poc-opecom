import { TypologyEntity } from '../entities/typology.entity';
import { Typology } from '../schemas/typology.schema';

export class TypologyMapper {
  static toEntity(typologySchema: Typology): TypologyEntity {
    return new TypologyEntity(typologySchema);
  }
}
