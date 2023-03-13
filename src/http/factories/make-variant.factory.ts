import { faker } from '@faker-js/faker';
import { VariantEntity } from '../entities/variant.entity';
import { makeProductFactory } from './make-product.factory';
import { makeUserFactory } from './make-user.factory';

export function makeVariantFactory(
  overrides: Partial<VariantEntity['info']> = {},
): VariantEntity {
  return new VariantEntity({
    order: faker.random.alphaNumeric(),
    name: faker.commerce.productName(),
    quartile: +faker.random.numeric(),
    billingAmbition: +faker.random.numeric(),
    products: [makeProductFactory().info],
    createdBy: makeUserFactory().info,
    ...overrides,
  });
}
