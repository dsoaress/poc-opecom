import { Controller, Delete, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SectionMapper } from '../mappers/section.mapper';
import { Section, SectionDocument } from '../schemas/section.schema';

@Controller('section')
export class SectionController {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
  ) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const data = await this.sectionModel.findById(id).exec();
    if (!data) return;
    const section = SectionMapper.toEntity(data);
    section.delete({
      email: 'user',
      ldap: 12345678,
      name: 'example@example.com',
    });

    await this.sectionModel.findByIdAndUpdate(id, section.info);
  }
}
