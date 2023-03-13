import { faker } from '@faker-js/faker';

import { UserEntity } from '../entities/user.entity';

export function makeUserFactory(
  overrides: Partial<UserEntity['info']> = {},
): UserEntity {
  return new UserEntity({
    ldap: +faker.random.numeric(8),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    ...overrides,
  });
}
