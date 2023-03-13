import { makeUserFactory } from '../../../factories/make-user.factory';
import { makeOpecomFactory } from '../../../factories/male-opecom.factory';
import { deleteRecursively } from './delete-recursively';

describe('deleteRecursively', () => {
  it('should be able to delete an opecom', () => {
    const deletedBy = makeUserFactory({ name: 'John Doe' });
    const currentOpecom = makeOpecomFactory();
    const opecomDeleted = deleteRecursively({ deletedBy, currentOpecom });
    expect(opecomDeleted).toMatchObject({
      deletedAt: expect.any(Date),
      deletedBy: {
        name: 'John Doe',
      },
      integration: {
        status: 'needs_update',
      },
    });
  });
});
