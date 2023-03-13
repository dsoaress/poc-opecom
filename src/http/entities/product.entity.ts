import { Types } from 'mongoose';

import { UserEntity } from './user.entity';

interface ProductProps {
  _id?: string | null;
  lm: number;
  name: string;
  ambition?: number | null;
  articles?: Omit<ProductEntity['info'], 'articles'>[] | null;
  linelists?: Omit<ProductEntity['info'], 'articles | linelists'>[] | null;

  integration?: {
    lastIntegration?: Date | null;
    count?: number;
    error?: string | null;
    status?: 'pending' | 'needs_update' | 'done' | 'error' | null;
  } | null;

  createdAt?: Date | null;
  createdBy: Omit<UserEntity, 'permissions'>['info'];
  updatedAt?: Date | null;
  updatedBy?: Omit<UserEntity, 'permissions'>['info'] | null;
  deletedAt?: Date | null;
  deletedBy?: Omit<UserEntity, 'permissions'>['info'] | null;
}

export class ProductEntity {
  private props: ProductProps;

  constructor(props: ProductProps) {
    const articles = props.articles?.map((article) => {
      const articleEntity = new ProductEntity(article);
      return articleEntity.info;
    });
    const linelists = props.linelists?.map((linelist) => {
      const linelistEntity = new ProductEntity(linelist);
      return linelistEntity.info;
    });
    const createdBy = new UserEntity(props.createdBy);
    const updatedBy = new UserEntity(props.updatedBy || props.createdBy);
    let deletedBy: UserEntity | null = null;
    if (props.deletedBy) deletedBy = new UserEntity(props.deletedBy);

    this.props = {
      _id: props._id || new Types.ObjectId().toString(),
      lm: props.lm,
      name: props.name,
      ambition: props.ambition || null,
      articles,
      linelists,

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
  }

  get info(): ProductEntity['props'] {
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
        status: 'error',
        error,
      },
    };
  }

  update({
    ambition,
    user,
  }: {
    ambition?: number | null;
    user: Omit<UserEntity, 'permissions'>['info'];
  }): void {
    const updatedBy = new UserEntity(user);
    this.props = {
      ...this.props,
      ambition:
        typeof ambition !== 'undefined' ? ambition : this.props.ambition,
      integration: {
        ...this.props.integration,
        status: 'needs_update',
      },
      updatedAt: new Date(),
      updatedBy: updatedBy.info,
    };
  }

  delete(user: Omit<UserEntity, 'permissions'>['info']): void {
    const deletedBy = new UserEntity(user);
    this.deleteArticles(user);
    this.deleteLinelists(user);
    this.props = {
      ...this.props,
      integration: {
        ...this.props.integration,
        status: 'needs_update',
      },
      deletedAt: new Date(),
      deletedBy: deletedBy.info,
    };
  }

  private deleteArticles(user: Omit<UserEntity, 'permissions'>['info']): void {
    const updatedArticles = this.props.articles?.map((article) => {
      const articleEntity = new ProductEntity(article);
      articleEntity.delete(user);
      return articleEntity.info;
    });
    this.props.articles = updatedArticles;
  }

  private deleteLinelists(user: Omit<UserEntity, 'permissions'>['info']): void {
    const updatedLinelists = this.props.linelists?.map((linelist) => {
      const linelistEntity = new ProductEntity(linelist);
      linelistEntity.delete(user);
      return linelistEntity.info;
    });
    this.props.linelists = updatedLinelists;
  }
}
