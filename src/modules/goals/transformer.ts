import { Injectable } from "@nestjs/common";
import { ITransformer } from "src/common/contracts/ITransformer";
import { GoalEntity } from './entities/goal.entity';

@Injectable()
export default class goalsAdminTransformer implements ITransformer<GoalEntity> {
    public transform(item: GoalEntity) {
        return {
            id: item.id,
            name: item.name,
            target_value: item.targetValue,
            status: item.status,
            createdAt: item.createdAt,
            values: item.values,
        }
    }

    public collection(items: GoalEntity[]) {
        return items.map((item: GoalEntity) => this.transform(item))
    }

}
