import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Integration, IntegrationSchema } from './integration.schema';
import { Section, SectionSchema } from './section.schema';
import { User, UserSchema } from './user.schema';

export type OpecomDocument = HydratedDocument<Opecom>;

@Schema()
export class Opecom extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: 'high_traffic' | 'thematic' | 'pac';

  @Prop({ required: true })
  status: 'in_filling' | 'in_analysis' | 'approved' | 'reproved';

  @Prop(raw({ initialDate: Date, finalDate: Date }))
  opecomPeriod: {
    initialDate: Date;
    finalDate: Date;
  };

  @Prop(raw({ initialDate: Date, finalDate: Date }))
  periodForProductRegistration: {
    initialDate: Date;
    finalDate: Date;
  };

  @Prop({ type: [SectionSchema] })
  sections: Section[];

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

export const OpecomSchema = SchemaFactory.createForClass(Opecom);
