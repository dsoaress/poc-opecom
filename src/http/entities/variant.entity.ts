import { Types } from 'mongoose';

import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

interface VariantProps {
  _id?: string | null;
  order: string;
  name?: string | null;
  quartile?: number | null;
  billingAmbition?: number | null;
  products?: ProductEntity['info'][] | null;

  createdAt?: Date | null;
  createdBy: Omit<UserEntity, 'permissions'>['info'];
  updatedAt?: Date | null;
  updatedBy?: Omit<UserEntity, 'permissions'>['info'] | null;
  deletedAt?: Date | null;
  deletedBy?: Omit<UserEntity, 'permissions'>['info'] | null;
}

export class VariantEntity {
  private props: VariantProps;

  constructor(props: VariantProps) {
    const products = props.products?.map((product) => {
      const productEntity = new ProductEntity(product);
      return productEntity.info;
    });
    const createdBy = new UserEntity(props.createdBy);
    const updatedBy = new UserEntity(props.updatedBy || props.createdBy);
    let deletedBy: UserEntity | null = null;
    if (props.deletedBy) deletedBy = new UserEntity(props.deletedBy);

    this.props = {
      _id: props._id || new Types.ObjectId().toString(),
      order: props.order,
      name: props.name || null,
      quartile: props.quartile || null,
      billingAmbition: props.billingAmbition || null,
      products: products || null,

      createdAt: props.createdAt || new Date(),
      createdBy: createdBy.info,
      updatedAt: props.updatedAt || new Date(),
      updatedBy: updatedBy.info,
      deletedAt: props.deletedAt || null,
      deletedBy: deletedBy?.info || null,
    };
  }

  get info(): VariantEntity['props'] {
    return this.props;
  }

  update({
    order,
    name,
    quartile,
    billingAmbition,
    user,
  }: {
    order?: string;
    name?: string | null;
    quartile?: number | null;
    billingAmbition?: number | null;
    user: Omit<UserEntity, 'permissions'>['info'];
  }): void {
    const updatedBy = new UserEntity(user);
    this.props = {
      ...this.props,
      order: typeof order !== 'undefined' ? order : this.props.order,
      name: typeof name !== 'undefined' ? name : this.props.name,
      quartile:
        typeof quartile !== 'undefined' ? quartile : this.props.quartile,
      billingAmbition:
        typeof billingAmbition !== 'undefined'
          ? billingAmbition
          : this.props.billingAmbition,
      updatedAt: new Date(),
      updatedBy: updatedBy.info,
    };
  }

  delete(user: Omit<UserEntity, 'permissions'>['info']): void {
    const deletedBy = new UserEntity(user);
    let products: ProductEntity['info'][] = [];
    if (this.props.products) {
      products = this.props.products.map((product) => {
        const productEntity = new ProductEntity(product);
        productEntity.delete(user);
        return productEntity.info;
      });
    }
    this.props.products = products.length ? products : this.props.products;
    this.props.deletedAt = new Date();
    this.props.deletedBy = deletedBy.info;
  }
}
