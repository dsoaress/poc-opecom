import { makeUserFactory } from '../../factories/make-user.factory';
import { makeOpecomFactory } from '../../factories/male-opecom.factory';

describe('OpecomEntity', () => {
  it("shouldn't be able to create an opecom without sections", () => {
    expect(() => {
      makeOpecomFactory({
        sections: undefined,
      });
    }).toThrow('Opecom must have at least one section');
  });

  it('should be able to create a deleted opecom', () => {
    const opecom = makeOpecomFactory({
      deletedAt: new Date(),
      deletedBy: makeUserFactory().info,
    });
    expect(opecom.info).toMatchObject({
      deletedAt: expect.any(Date),
      deletedBy: expect.any(Object),
    });
  });

  it('should be able to integrate an opecom', () => {
    const opecom = makeOpecomFactory({
      integration: {
        status: 'needs_update',
        count: undefined,
      },
    });
    opecom.integrate();
    expect(opecom.info.integration?.count).toBe(1);
    opecom.integrate();
    expect(opecom.info).toMatchObject({
      integration: {
        status: 'done',
        lastIntegration: expect.any(Date),
        count: 2,
        error: null,
      },
    });
    opecom.integrate();
    expect(opecom.info.integration?.count).toBe(3);
  });

  it('should be able to set an integration error', () => {
    const opecom = makeOpecomFactory();
    opecom.integrateError('Error message');
    expect(opecom.info).toMatchObject({
      integration: {
        status: 'error',
        error: 'Error message',
      },
    });
  });

  it('should be able to update an opecom', () => {
    const updatedBy = makeUserFactory({ name: 'John Doe' });
    const opecom = makeOpecomFactory();
    opecom.update({
      name: 'New name',
      description: 'New description',
      type: 'thematic',
      status: 'approved',
      opecomPeriod: {
        initialDate: new Date('2021-01-01'),
        finalDate: new Date('2021-03-01'),
      },
      periodForProductRegistration: {
        initialDate: new Date('2021-02-01'),
        finalDate: new Date('2021-02-20'),
      },
      updatedBy,
    });
    expect(opecom.info).toMatchObject({
      name: 'New name',
      description: 'New description',
      type: 'thematic',
      status: 'approved',
      opecomPeriod: {
        initialDate: new Date('2021-01-01'),
        finalDate: new Date('2021-03-01'),
      },
      periodForProductRegistration: {
        initialDate: new Date('2021-02-01'),
        finalDate: new Date('2021-02-20'),
      },
    });
  });

  it('should be able to update an opecom with partial data', () => {
    const updatedBy = makeUserFactory({ name: 'John Doe' });
    const opecom = makeOpecomFactory();
    opecom.update({ updatedBy });
    expect(opecom.info).toMatchObject({
      ...opecom.info,
      updatedAt: expect.any(Date),
      updatedBy: updatedBy.info,
    });
  });

  it('should be able to call delete method', () => {
    const deletedBy = makeUserFactory();
    const opecom = makeOpecomFactory();
    opecom.delete(deletedBy);
    expect(opecom.info).toMatchObject({
      deletedAt: expect.any(Date),
      deletedBy: deletedBy.info,
    });
  });
});
