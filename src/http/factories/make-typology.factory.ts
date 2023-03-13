import { faker } from '@faker-js/faker';
import { TypologyEntity } from '../entities/typology.entity';
import { makeUserFactory } from './make-user.factory';
import { makeVariantFactory } from './make-variant.factory';

export function makeTypologyFactory(
  overrides: Partial<TypologyEntity['info']> = {},
): TypologyEntity {
  return new TypologyEntity({
    order: +faker.random.numeric,
    variants: [makeVariantFactory().info],
    createdBy: makeUserFactory().info,
    ...overrides,
  });
}
