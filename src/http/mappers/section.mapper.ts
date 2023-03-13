import { SectionEntity } from '../entities/section.entity';
import { Section } from '../schemas/section.schema';

export class SectionMapper {
  static toEntity(sectionSchema: Section): SectionEntity {
    return new SectionEntity(sectionSchema);
  }
}
