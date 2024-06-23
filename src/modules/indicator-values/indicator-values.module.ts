import { Module } from '@nestjs/common';
import { IndicatorValuesService } from './indicator-values.service';
import { IndicatorValuesController } from './indicator-values.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndicatorValuesEntity } from './entities/indicator-value.entity';
import { IndicatorValuesFactoryClass } from './factories/indicator-factory.factory';
import { IndicatorsModule } from '../indicators/indicators.module';

@Module({
  imports: [TypeOrmModule.forFeature([IndicatorValuesEntity]),
  IndicatorsModule
  ],
  controllers: [IndicatorValuesController],
  providers: [IndicatorValuesService, IndicatorValuesFactoryClass],
})
export class IndicatorValuesModule { }
