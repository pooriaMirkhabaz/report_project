import { Injectable } from "@nestjs/common";
import { IndicatorEntity } from "src/modules/indicators/entities/indicator.entity";
import { IndicatorsService } from "src/modules/indicators/indicators.service";

@Injectable()
export class GoalFactoryClass {
    constructor(
        private readonly indicatorsService: IndicatorsService
    ) { }

    public async findOneIndicatorById(indicatorId: number): Promise<IndicatorEntity | Error> {
        return await this.indicatorsService.findOneById(indicatorId)
    }

}
