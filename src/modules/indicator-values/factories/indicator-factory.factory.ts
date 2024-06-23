import { Injectable } from '@nestjs/common';
import { IndicatorEntity } from 'src/modules/indicators/entities/indicator.entity';
import { IndicatorsService } from '../../indicators/indicators.service';


@Injectable()
export class IndicatorValuesFactoryClass {
  constructor(
    private readonly indicatorsService: IndicatorsService,
  ) {
  }

  public async findOneIndicatorById(goalId: number): Promise<IndicatorEntity | Error> {
    return await this.indicatorsService.findOneById(goalId);
  }

}
