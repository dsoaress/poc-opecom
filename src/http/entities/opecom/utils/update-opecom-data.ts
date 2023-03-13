import { SectionEntity } from '../../section.entity';
import { UserEntity } from '../../user.entity';
import { OpecomEntity } from '../opecom.entity';

export interface UpdateOpecomDataProps {
  name?: string;
  description?: string;
  type?: 'high_traffic' | 'thematic' | 'pac';
  status?: 'in_filling' | 'in_analysis' | 'approved' | 'reproved';
  opecomPeriod?: {
    initialDate: Date;
    finalDate: Date;
  };
  periodForProductRegistration?: {
    initialDate: Date;
    finalDate: Date;
  };
  sections?: SectionEntity['info'][];

  currentOpecom: OpecomEntity['info'];
  updatedBy: Omit<UserEntity, 'permissions'>;
}

export function updateOpecomData({
  currentOpecom,
  updatedBy,
  ...props
}: UpdateOpecomDataProps): OpecomEntity['info'] {
  return {
    ...currentOpecom,
    name: props.name || currentOpecom.name,
    description: props.description || currentOpecom.description,
    type: props.type || currentOpecom.type,
    status: props.status || currentOpecom.status,
    opecomPeriod: props.opecomPeriod || currentOpecom.opecomPeriod,
    periodForProductRegistration:
      props.periodForProductRegistration ||
      currentOpecom.periodForProductRegistration,
    integration: {
      ...currentOpecom.integration,
      status: 'needs_update',
    },
    updatedAt: new Date(),
    updatedBy: updatedBy.info,
  };
}
