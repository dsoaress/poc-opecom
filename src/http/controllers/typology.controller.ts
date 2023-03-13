import { Controller, Delete, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TypologyMapper } from '../mappers/typology.mapper';
import { Typology, TypologyDocument } from '../schemas/typology.schema';

@Controller('typology')
export class TypologyController {
  constructor(
    @InjectModel(Typology.name) private typologyModel: Model<TypologyDocument>,
  ) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const data = await this.typologyModel.findById(id).exec();
    if (!data) return;
    const typology = TypologyMapper.toEntity(data);
    typology.delete({
      email: 'user',
      ldap: 12345678,
      name: 'example@example.com',
    });

    await this.typologyModel.findByIdAndUpdate(id, typology.info);
  }
}
