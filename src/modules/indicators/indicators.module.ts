import { Module } from '@nestjs/common';
import { IndicatorsService } from './indicators.service';
import { IndicatorsController } from './indicators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndicatorEntity } from './entities/indicator.entity';
import IndicatorAdminTransformer from './transformer';
import { IndicatorFactoryClass } from './factories/indicator.factory';
import { DepartmentsModule } from '../departments/departments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([IndicatorEntity]),
    DepartmentsModule
  ],
  controllers: [IndicatorsController],
  providers: [IndicatorsService, IndicatorFactoryClass, IndicatorAdminTransformer],
  exports: [IndicatorsService, IndicatorsModule]
})
export class IndicatorsModule { }
