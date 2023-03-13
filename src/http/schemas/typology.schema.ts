import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { User, UserSchema } from './user.schema';
import { Variant, VariantSchema } from './variant.schema';

export type TypologyDocument = HydratedDocument<Typology>;

@Schema()
export class Typology extends Document {
  @Prop({ required: true })
  order: number;

  @Prop({ type: [VariantSchema] })
  variants: Variant[];

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

export const TypologySchema = SchemaFactory.createForClass(Typology);
