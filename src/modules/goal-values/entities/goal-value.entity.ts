import { BaseEntity } from "src/common/abstract/base.entity";
import { EntityNames } from "src/common/enums/entity.enum";
import { GoalEntity } from "src/modules/goals/entities/goal.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity(EntityNames.GoalValues)
export class GoalValuesEntity extends BaseEntity {

    @Column()
    value: number;


    @Column({type: "date", default: "2024-06-22"})
    startDate: Date;

    @Column({type: "date", default: "2024-07-22"})
    endDate: Date;

    @ManyToOne(() => GoalEntity, goal => goal.values, { onDelete: 'CASCADE' })
    goal: GoalEntity
}
