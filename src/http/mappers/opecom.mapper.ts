import { OpecomEntity } from '../entities/opecom';
import { Opecom } from '../schemas/opecom.schema';

export class OpecomMapper {
  static toEntity(opecomSchema: Opecom): OpecomEntity {
    return new OpecomEntity(opecomSchema);
  }
}
