interface Periods {
  initialDate: Date;
  finalDate: Date;
}

interface Props {
  opecomPeriod: Periods;
  periodForProductRegistration: Periods;
}

export function validatePeriods({
  opecomPeriod,
  periodForProductRegistration,
}: Props): void {
  const isValidOpecomPeriod = opecomPeriod.initialDate < opecomPeriod.finalDate;
  if (!isValidOpecomPeriod) {
    throw new Error(
      'Invalid opecom period: initial date must be less than final date',
    );
  }
  const isValidPeriodForProductRegistration =
    periodForProductRegistration.initialDate <
    periodForProductRegistration.finalDate;
  if (!isValidPeriodForProductRegistration) {
    throw new Error(
      'Invalid period for product registration: initial date must be less than final date',
    );
  }
  const isValidPeriods =
    periodForProductRegistration.initialDate >= opecomPeriod.initialDate &&
    periodForProductRegistration.finalDate <= opecomPeriod.finalDate;
  if (!isValidPeriods) {
    throw new Error(
      'Invalid periods: period for product registration must be inside opecom period',
    );
  }
}
