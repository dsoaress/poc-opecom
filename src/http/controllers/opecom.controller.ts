import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../entities/user.entity';
import { OpecomMapper } from '../mappers/opecom.mapper';
import { Opecom, OpecomDocument } from '../schemas/opecom.schema';

@Controller('opecom')
export class OpecomController {
  constructor(
    @InjectModel(Opecom.name) private opecomModel: Model<OpecomDocument>,
  ) {}

  @Get()
  async findAll() {
    return await this.opecomModel.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.opecomModel.findById(id);
  }

  @Post()
  async create(@Body() data: any) {
    return await this.opecomModel.create(OpecomMapper.toEntity(data).info);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const data = await this.opecomModel.findById(id).exec();
    if (!data) return;
    const opecom = OpecomMapper.toEntity(data.toObject());
    opecom.delete(
      new UserEntity({
        email: 'user',
        ldap: 12345678,
        name: 'example@example.com',
      }),
    );

    await this.opecomModel.findByIdAndUpdate(id, opecom.info);
  }
}
