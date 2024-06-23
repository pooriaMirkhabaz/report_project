import { Injectable } from "@nestjs/common";
import { IndicatorEntity } from "./entities/indicator.entity";
import { ITransformer } from "src/common/contracts/ITransformer";

@Injectable()
export default class IndicatorAdminTransformer implements ITransformer<IndicatorEntity> {
    public transform(item: IndicatorEntity) {
        return {
            id: item.id,
            name: item.name,
            type: item.type,
            department: item.department,
            createdAt: item.createdAt,
            goals: item.goals,
            values: item.values,
        }
    }

    public collection(items: IndicatorEntity[]) {
        return items.map((item: IndicatorEntity) => this.transform(item))
    }

}
