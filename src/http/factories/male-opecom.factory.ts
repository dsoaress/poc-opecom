import { faker } from '@faker-js/faker';
import { OpecomEntity } from '../entities/opecom';
import { makeSectionFactory } from './make-section.factory';
import { makeUserFactory } from './make-user.factory';

export function makeOpecomFactory(
  overrides: Partial<OpecomEntity['info']> = {},
): OpecomEntity {
  console.log('makeOpecomFactory', overrides);
  return new OpecomEntity({
    name: faker.random.words(4),
    description: faker.random.words(10),
    type: 'high_traffic',
    opecomPeriod: {
      initialDate: new Date('2021-01-01'),
      finalDate: new Date('2021-03-01'),
    },
    periodForProductRegistration: {
      initialDate: new Date('2021-02-01'),
      finalDate: new Date('2021-02-20'),
    },
    sections: [makeSectionFactory().info],
    createdBy: makeUserFactory().info,
    ...overrides,
  });
}
