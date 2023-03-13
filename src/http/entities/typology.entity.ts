import { Types } from 'mongoose';

import { UserEntity } from './user.entity';
import { VariantEntity } from './variant.entity';

type VariantInput = Omit<VariantEntity['info'], 'createdBy'> & {
  createdBy?: Omit<UserEntity, 'permissions'>['info'] | null;
};

interface TypologyProps {
  _id?: string | null;
  order: number;
  variants: VariantInput[];

  createdAt?: Date | null;
  createdBy: Omit<UserEntity, 'permissions'>['info'];
  updatedAt?: Date | null;
  updatedBy?: Omit<UserEntity, 'permissions'>['info'] | null;
  deletedAt?: Date | null;
  deletedBy?: Omit<UserEntity, 'permissions'>['info'] | null;
}

export class TypologyEntity {
  private props: TypologyProps;

  constructor(props: TypologyProps) {
    const variants = props.variants?.map((variant) => {
      const variantEntity = new VariantEntity({
        ...variant,
        createdBy: variant.createdBy || props.createdBy,
      });
      return variantEntity.info;
    });
    const createdBy = new UserEntity(props.createdBy);
    const updatedBy = new UserEntity(props.updatedBy || props.createdBy);
    let deletedBy: UserEntity | null = null;
    if (props.deletedBy) deletedBy = new UserEntity(props.deletedBy);
    if (!variants?.length)
      throw new Error('Typology must have at least one variant');

    this.props = {
      _id: props._id || new Types.ObjectId().toString(),
      order: props.order,
      variants: variants,

      createdAt: props.createdAt || new Date(),
      createdBy: createdBy.info,
      updatedAt: props.updatedAt || new Date(),
      updatedBy: updatedBy.info,
      deletedAt: props.deletedAt || null,
      deletedBy: deletedBy?.info || null,
    };
  }

  get info(): TypologyProps {
    return this.props;
  }

  update({
    order,
    user,
  }: {
    order?: number;
    user: Omit<UserEntity, 'permissions'>['info'];
  }): void {
    const updatedBy = new UserEntity(user);
    this.props = {
      ...this.props,
      order: typeof order !== 'undefined' ? order : this.props.order,
      updatedAt: new Date(),
      updatedBy: updatedBy.info,
    };
  }

  delete(user: Omit<UserEntity, 'permissions'>['info']): void {
    const deletedBy = new UserEntity(user);
    const variant = this.props.variants.map((variant) => {
      const variantEntity = new VariantEntity({
        ...variant,
        createdBy: variant.createdBy || user,
      });

      variantEntity.delete(user);
      return variantEntity.info;
    });
    this.props.variants = variant;
    this.props.deletedAt = new Date();
    this.props.deletedBy = deletedBy.info;
  }
}
