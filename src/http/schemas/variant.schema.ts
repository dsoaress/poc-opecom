import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Product, ProductSchema } from './product.schema';
import { User, UserSchema } from './user.schema';

export type VariantDocument = HydratedDocument<Variant>;

@Schema()
export class Variant extends Document {
  @Prop({ required: true })
  order: string;

  @Prop()
  name: string;

  @Prop()
  quartile: number;

  @Prop()
  billingAmbition: number;

  @Prop({ type: [ProductSchema] })
  products: Product[];

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

export const VariantSchema = SchemaFactory.createForClass(Variant);
