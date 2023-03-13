import { faker } from '@faker-js/faker';
import { SectionEntity } from '../entities/section.entity';
import { makeTypologyFactory } from './make-typology.factory';
import { makeUserFactory } from './make-user.factory';

export function makeSectionFactory(
  overrides: Partial<SectionEntity['info']> = {},
): SectionEntity {
  return new SectionEntity({
    code: +faker.random.numeric(),
    name: faker.commerce.department(),
    typologies: [makeTypologyFactory().info],
    createdBy: makeUserFactory().info,
    ...overrides,
  });
}
