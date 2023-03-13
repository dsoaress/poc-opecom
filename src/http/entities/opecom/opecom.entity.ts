import { Types } from 'mongoose';
import { SectionEntity } from '../section.entity';
import { UserEntity } from '../user.entity';
import { deleteRecursively } from './utils/delete-recursively';
import {
  updateOpecomData,
  UpdateOpecomDataProps,
} from './utils/update-opecom-data';
import { validatePeriods } from './utils/validate-periods';

type SectionInput = Omit<SectionEntity['info'], 'createdBy'> & {
  createdBy?: Omit<UserEntity, 'permissions'>['info'] | null;
};

interface OpecomProps {
  _id?: string | null;
  name: string;
  description: string;
  type: 'high_traffic' | 'thematic' | 'pac';
  status?: 'in_filling' | 'in_analysis' | 'approved' | 'reproved' | null;
  opecomPeriod: {
    initialDate: Date;
    finalDate: Date;
  };
  periodForProductRegistration: {
    initialDate: Date;
    finalDate: Date;
  };
  sections: SectionInput[];

  integration?: {
    lastIntegration?: Date | null;
    count?: number;
    error?: string | null;
    status?: 'pending' | 'needs_update' | 'done' | 'error' | null;
  };

  createdAt?: Date | null;
  createdBy: Omit<UserEntity, 'permissions'>['info'];
  updatedAt?: Date | null;
  updatedBy?: Omit<UserEntity, 'permissions'>['info'] | null;
  deletedAt?: Date | null;
  deletedBy?: Omit<UserEntity, 'permissions'>['info'] | null;
}

export class OpecomEntity {
  private props: OpecomProps;

  constructor(props: OpecomProps) {
    if (!props.sections?.length)
      throw new Error('Opecom must have at least one section');
    const sections = props.sections.map((section) => {
      const sectionEntity = new SectionEntity({
        ...section,
        createdBy: section.createdBy || props.createdBy,
      });

      return sectionEntity.info;
    });
    const createdBy = new UserEntity(props.createdBy);
    const updatedBy = new UserEntity(props.updatedBy || props.createdBy);
    let deletedBy: UserEntity | null = null;
    if (props.deletedBy) deletedBy = new UserEntity(props.deletedBy);

    this.props = {
      _id: props._id || new Types.ObjectId().toString(),
      name: props.name,
      description: props.description,
      type: props.type,
      status: props.status || 'in_filling',
      opecomPeriod: props.opecomPeriod,
      periodForProductRegistration: props.periodForProductRegistration,
      sections,

      integration: {
        lastIntegration: props.integration?.lastIntegration || null,
        count: props.integration?.count || 0,
        error: props.integration?.error || null,
        status: props.integration?.status || 'pending',
      },

      createdAt: props.createdAt || new Date(),
      createdBy: createdBy.info,
      updatedAt: props.updatedAt || new Date(),
      updatedBy: updatedBy.info,
      deletedAt: props.deletedAt || null,
      deletedBy: deletedBy?.info || null,
    };

    validatePeriods({
      opecomPeriod: this.props.opecomPeriod,
      periodForProductRegistration: this.props.periodForProductRegistration,
    });
  }

  get info(): OpecomProps {
    return this.props;
  }

  integrate(): void {
    this.props = {
      ...this.props,
      integration: {
        ...this.props.integration,
        lastIntegration: new Date(),
        count: this.props.integration?.count
          ? ++this.props.integration.count
          : 1,
        error: null,
        status: 'done',
      },
    };
  }

  integrateError(error: string): void {
    this.props = {
      ...this.props,
      integration: {
        ...this.props.integration,
        error,
        status: 'error',
      },
    };
  }

  update(props: Omit<UpdateOpecomDataProps, 'currentOpecom'>): void {
    this.props = updateOpecomData({ ...props, currentOpecom: this.props });
  }

  delete(deletedBy: Omit<UserEntity, 'permissions'>): void {
    this.props = deleteRecursively({ currentOpecom: this, deletedBy });
  }
}
