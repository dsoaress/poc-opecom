import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false, autoCreate: false })
export class Integration extends Document {
  @Prop()
  lastIntegration: Date;

  @Prop({ required: true })
  count: number;

  @Prop()
  error: string;

  @Prop({ required: true })
  status: 'pending' | 'needs_update' | 'done' | 'error';
}

export const IntegrationSchema = SchemaFactory.createForClass(Integration);
