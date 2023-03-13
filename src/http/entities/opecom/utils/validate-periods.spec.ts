import { validatePeriods } from './validate-periods';

describe('validatePeriods', () => {
  it('should be return a error when opecom period is invalid', () => {
    expect(() => {
      validatePeriods({
        opecomPeriod: {
          initialDate: new Date('2021-01-02'),
          finalDate: new Date('2021-01-01'),
        },
        periodForProductRegistration: {
          initialDate: new Date('2021-01-01'),
          finalDate: new Date('2021-03-01'),
        },
      });
    }).toThrow(
      'Invalid opecom period: initial date must be less than final date',
    );
  });

  it('should be return a error when period for product registration is invalid', () => {
    expect(() => {
      validatePeriods({
        opecomPeriod: {
          initialDate: new Date('2021-01-01'),
          finalDate: new Date('2021-03-01'),
        },
        periodForProductRegistration: {
          initialDate: new Date('2021-01-02'),
          finalDate: new Date('2021-01-01'),
        },
      });
    }).toThrow(
      'Invalid period for product registration: initial date must be less than final date',
    );
  });

  it('should be return a error when period for product registration is outside opecom period', () => {
    const errorMessage =
      'Invalid periods: period for product registration must be inside opecom period';
    expect(() => {
      validatePeriods({
        opecomPeriod: {
          initialDate: new Date('2021-01-01'),
          finalDate: new Date('2021-03-01'),
        },
        periodForProductRegistration: {
          initialDate: new Date('2020-12-31'),
          finalDate: new Date('2021-03-01'),
        },
      });
    }).toThrow(errorMessage);
    expect(() => {
      validatePeriods({
        opecomPeriod: {
          initialDate: new Date('2021-01-01'),
          finalDate: new Date('2021-03-01'),
        },
        periodForProductRegistration: {
          initialDate: new Date('2021-01-01'),
          finalDate: new Date('2021-03-02'),
        },
      });
    }).toThrow(errorMessage);
  });
});
