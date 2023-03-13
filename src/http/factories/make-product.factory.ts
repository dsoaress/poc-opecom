import { faker } from '@faker-js/faker';

import { ProductEntity } from '../entities/product.entity';
import { makeUserFactory } from './make-user.factory';

export function makeProductFactory(
  overrides: Partial<ProductEntity['info']> = {},
): ProductEntity {
  return new ProductEntity({
    lm: +faker.random.numeric(8),
    name: faker.commerce.productName(),
    createdBy: makeUserFactory().info,
    ...overrides,
  });
}
