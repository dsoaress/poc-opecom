import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Integration, IntegrationSchema } from './integration.schema';
import { User, UserSchema } from './user.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  lm: number;

  @Prop({ required: true })
  name: string;

  @Prop()
  ambition: number;

  @Prop({ type: IntegrationSchema, required: true })
  integration: Integration;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ type: UserSchema })
  createdBy: User;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ type: UserSchema })
  updatedBy: User;

  @Prop()
  deletedAt: Date;

  @Prop({ type: UserSchema })
  deletedBy: User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
