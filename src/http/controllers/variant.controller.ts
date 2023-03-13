import { Controller, Delete, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VariantMapper } from '../mappers/variant.mapper';
import { Variant, VariantDocument } from '../schemas/variant.schema';

@Controller('variant')
export class VariantController {
  constructor(
    @InjectModel(Variant.name) private variantModel: Model<VariantDocument>,
  ) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const data = await this.variantModel.findById(id).exec();
    if (!data) return;
    const variant = VariantMapper.toEntity(data);
    variant.delete({
      email: 'user',
      ldap: 12345678,
      name: 'example@example.com',
    });

    await this.variantModel.findByIdAndUpdate(id, variant.info);
  }
}
