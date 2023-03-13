import { Module } from '@nestjs/common';
import { OpecomController } from './controllers/opecom.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Opecom, OpecomSchema } from './schemas/opecom.schema';
import { Section, SectionSchema } from './schemas/section.schema';
import { Typology, TypologySchema } from './schemas/typology.schema';
import { Variant, VariantSchema } from './schemas/variant.schema';
import { Product, ProductSchema } from './schemas/product.schema';
import { SectionController } from './controllers/section.controller';
import { TypologyController } from './controllers/typology.controller';
import { VariantController } from './controllers/variant.controller';
import { ProductController } from './controllers/product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Opecom.name, schema: OpecomSchema },
      { name: Section.name, schema: SectionSchema },
      { name: Typology.name, schema: TypologySchema },
      { name: Variant.name, schema: VariantSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [
    OpecomController,
    SectionController,
    TypologyController,
    VariantController,
    ProductController,
  ],
})
export class HttpModule {}
