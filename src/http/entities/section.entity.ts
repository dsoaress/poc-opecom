import { Types } from 'mongoose';
import { TypologyEntity } from './typology.entity';

import { UserEntity } from './user.entity';

type TypologyInput = Omit<TypologyEntity['info'], 'createdBy'> & {
  createdBy?: Omit<UserEntity, 'permissions'>['info'];
};

interface SectionProps {
  _id?: string | null;
  code: number;
  name: string;
  status?: 'in_filling' | 'in_analysis' | 'approved' | 'reproved' | null;
  typologies: TypologyInput[];

  createdAt?: Date | null;
  createdBy: Omit<UserEntity, 'permissions'>['info'];
  updatedAt?: Date | null;
  updatedBy?: Omit<UserEntity, 'permissions'>['info'] | null;
  deletedAt?: Date | null;
  deletedBy?: Omit<UserEntity, 'permissions'>['info'] | null;
}

export class SectionEntity {
  private props: SectionProps;

  constructor(props: SectionProps) {
    const typologies = props.typologies?.map((typology) => {
      const typologyEntity = new TypologyEntity({
        ...typology,
        createdBy: typology.createdBy || props.createdBy,
      });

      return typologyEntity.info;
    });
    const createdBy = new UserEntity(props.createdBy);
    const updatedBy = new UserEntity(props.updatedBy || props.createdBy);
    let deletedBy: UserEntity | null = null;
    if (props.deletedBy) deletedBy = new UserEntity(props.deletedBy);
    if (!typologies?.length)
      throw new Error('Section must have at least one typology');

    this.props = {
      _id: props._id || new Types.ObjectId().toString(),
      code: props.code,
      name: props.name,
      status: props.status || 'in_filling',
      typologies,

      createdAt: props.createdAt || new Date(),
      createdBy: createdBy.info,
      updatedAt: props.updatedAt || new Date(),
      updatedBy: updatedBy.info,
      deletedAt: props.deletedAt || null,
      deletedBy: deletedBy?.info || null,
    };
  }

  get info(): SectionProps {
    return this.props;
  }

  update({
    status,
    user,
  }: {
    status: 'in_filling' | 'in_analysis' | 'approved' | 'reproved';
    user: Omit<UserEntity, 'permissions'>['info'];
  }): void {
    this.props.status = status;
    this.props.updatedAt = new Date();
    this.props.updatedBy = user;
  }

  delete(user: Omit<UserEntity, 'permissions'>['info']): void {
    const deletedBy = new UserEntity(user);
    const typology = this.props.typologies?.map((typology) => {
      const typologyEntity = new TypologyEntity({
        ...typology,
        createdBy: typology.createdBy || user,
      });

      typologyEntity.delete(user);
      return typologyEntity.info;
    });
    this.props.typologies = typology;
    this.props.deletedAt = new Date();
    this.props.deletedBy = deletedBy.info;
  }
}
