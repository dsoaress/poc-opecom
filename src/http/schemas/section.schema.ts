import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Typology, TypologySchema } from './typology.schema';
import { User, UserSchema } from './user.schema';

export type SectionDocument = HydratedDocument<Section>;

@Schema()
export class Section extends Document {
  @Prop({ required: true })
  code: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  status: 'in_filling' | 'in_analysis' | 'approved' | 'reproved';

  @Prop({ type: [TypologySchema] })
  typologies: Typology[];

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

export const SectionSchema = SchemaFactory.createForClass(Section);
